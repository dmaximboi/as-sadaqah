-- Financial journal integrity. Apply only after reviewing the generated base schema.
CREATE OR REPLACE FUNCTION enforce_balanced_ledger_transaction()
RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  tx_id uuid;
  debit_total numeric;
  credit_total numeric;
  entry_count integer;
  currency_count integer;
BEGIN
  tx_id := COALESCE(NEW.transaction_id, OLD.transaction_id);
  SELECT
    COALESCE(SUM(amount_minor) FILTER (WHERE side = 'debit'), 0),
    COALESCE(SUM(amount_minor) FILTER (WHERE side = 'credit'), 0),
    COUNT(*),
    COUNT(DISTINCT currency)
  INTO debit_total, credit_total, entry_count, currency_count
  FROM ledger_entries
  WHERE transaction_id = tx_id;

  IF entry_count < 2 OR currency_count <> 1 OR debit_total <> credit_total THEN
    RAISE EXCEPTION 'Unbalanced ledger transaction %', tx_id
      USING ERRCODE = '23514';
  END IF;
  RETURN NULL;
END;
$$;

CREATE CONSTRAINT TRIGGER ledger_entries_must_balance
AFTER INSERT ON ledger_entries
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION enforce_balanced_ledger_transaction();

CREATE OR REPLACE FUNCTION prevent_ledger_entry_mutation()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  RAISE EXCEPTION 'Ledger entries are immutable; post a reversing transaction instead'
    USING ERRCODE = '55000';
END;
$$;

CREATE TRIGGER ledger_entries_immutable
BEFORE UPDATE OR DELETE ON ledger_entries
FOR EACH ROW EXECUTE FUNCTION prevent_ledger_entry_mutation();

-- Provider event references are unique in the application schema. This database
-- constraint is a second line of defence against webhook replay.
CREATE UNIQUE INDEX IF NOT EXISTS donations_provider_reference_guard
ON donations(provider, provider_reference)
WHERE provider IS NOT NULL AND provider_reference IS NOT NULL;
