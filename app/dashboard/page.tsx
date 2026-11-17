import { redirect } from "next/navigation";
import { getAuth, isAuthConfigured } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  if (!isAuthConfigured()) redirect("/auth/sign-in");
  const { session, user } = await getAuth().getSession();
  if (!session || !user) redirect("/auth/sign-in");
  return (
    <main className="dashboard-shell">
      <div className="dashboard-top"><a href="/" className="brand"><span className="brand-mark">ص</span><span>as sadaqah<small>YOUR COMMUNITY GIVING SPACE</small></span></a><a href="/auth/sign-out" className="text-link">Sign out →</a></div>
      <section className="dashboard-welcome">
        <div className="eyebrow">Your account</div>
        <h1>Assalamu alaikum, <em>{user.name || user.email}</em></h1>
        <p>Your As Sadaqah account is ready. Mosque registration, giving history and project tracking will appear here as those modules are released.</p>
        <div className="dashboard-grid"><article><span>01</span><h2>Find a mosque</h2><p>Discover mosque profiles and their verification status.</p></article><article><span>02</span><h2>Explore projects</h2><p>Support projects after the required reviews are complete.</p></article><article><span>03</span><h2>Your impact</h2><p>Follow contributions, milestones and verified updates.</p></article></div>
      </section>
    </main>
  );
}
