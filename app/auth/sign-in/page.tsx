import { GoogleSignInButton } from "./google-sign-in-button";

export default function SignInPage() {
  return (
    <main className="auth-shell">
      <div className="auth-card custom-auth-card">
        <div className="brand"><span className="brand-mark">ص</span><span>as sadaqah<small>GIVING WITH CONFIDENCE</small></span></div>
        <div className="eyebrow auth-eyebrow">Welcome to As Sadaqah</div>
        <h1 className="auth-title">One account.<br/><em>More good ahead.</em></h1>
        <p className="auth-description">Continue securely with your Google account. Mosque registration and donor features will be available from your account.</p>
        <GoogleSignInButton />
        <p className="auth-legal">By continuing, you agree to use As Sadaqah responsibly and provide accurate information.</p>
        <a className="auth-back" href="/">← Back to home</a>
      </div>
    </main>
  );
}
