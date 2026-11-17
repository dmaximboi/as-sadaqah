"use client";
import { authClient } from "@/lib/auth/client";
export function SignOutButton() {
  return <button className="text-link signout-button" onClick={() => authClient.signOut()}>Sign out →</button>;
}
