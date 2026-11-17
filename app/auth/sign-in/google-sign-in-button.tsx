"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth/client";

export function GoogleSignInButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signIn() {
    setLoading(true);
    setError(null);
    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard"
      });
      if (result.error) setError(result.error.message || "Google sign-in could not be started.");
    } catch {
      setError("Google sign-in is temporarily unavailable. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="google-auth-wrap">
      <button className="google-auth-button" type="button" onClick={signIn} disabled={loading}>
        <span className="google-g" aria-hidden="true">G</span>
        {loading ? "Connecting to Google…" : "Continue with Google"}
      </button>
      {error && <p className="auth-error" role="alert">{error}</p>}
    </div>
  );
}
