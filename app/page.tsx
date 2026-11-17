import Link from "next/link";
import { ArrowUpRight, ShieldCheck, HeartHandshake, Landmark, BookOpen, CircleCheck, MapPin, Sparkles } from "lucide-react";

const highlights = [
  { title: "Verified mosques", text: "Know the organisation and leadership behind the appeal.", icon: Landmark },
  { title: "Reviewed projects", text: "A mosque profile does not automatically verify every project.", icon: ShieldCheck },
  { title: "Visible progress", text: "Follow milestones, evidence and project updates.", icon: CircleCheck }
];

const projects = [
  { category: "Education", title: "Equip a community Qur’an learning centre", location: "Kwara State, Nigeria", raised: "₦2,450,000", target: "₦4,000,000", progress: 61, tag: "Project review in progress" },
  { category: "Infrastructure", title: "Provide clean water for a mosque community", location: "Oyo State, Nigeria", raised: "₦1,180,000", target: "₦3,500,000", progress: 34, tag: "Identity verified" },
  { category: "Community", title: "Support essential facilities for worshippers", location: "Lagos State, Nigeria", raised: "₦860,000", target: "₦2,000,000", progress: 43, tag: "Project review in progress" }
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <Link href="/" className="brand"><span className="brand-mark">ص</span><span>as sadaqah<small>GIVING WITH CONFIDENCE</small></span></Link>
        <nav className="desktop-nav"><a href="#how-it-works">How it works</a><a href="#projects">Explore projects</a><a href="#trust">Our trust model</a></nav>
        <div className="header-actions"><Link className="login-link" href="/auth/sign-in">Sign in</Link><Link className="button button-dark" href="/auth/sign-up">Get started <ArrowUpRight size={16}/></Link></div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span/> A more accountable way to give</div>
          <h1>Let your sadaqah<br/><em>reach further.</em></h1>
          <p className="hero-text">Discover mosque-led projects, give with confidence and follow the real-world impact of your generosity — from the first contribution to the final milestone.</p>
          <div className="hero-actions"><Link href="/auth/sign-up" className="button button-primary">Start giving <ArrowUpRight size={17}/></Link><a href="#how-it-works" className="text-link">Understand how it works <span>→</span></a></div>
          <div className="hero-note"><ShieldCheck size={17}/> Verification at organisation and project level</div>
        </div>
        <div className="hero-art" aria-label="Decorative geometric illustration">
          <div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/>
          <div className="art-sun"><span>صَدَقَة</span><b>Give sincerely.<br/>See the difference.</b></div>
          <div className="art-chip chip-top"><ShieldCheck size={15}/> Verified with care</div>
          <div className="art-chip chip-bottom"><HeartHandshake size={16}/> Impact you can follow</div>
          <div className="art-star star-a">✳</div><div className="art-star star-b">✧</div>
        </div>
      </section>

      <section className="trust-strip" id="trust"><div><strong>Built around trust</strong><span>Giving should be clear, accountable and rooted in community.</span></div><div className="trust-items"><span><ShieldCheck/> Layered verification</span><span><HeartHandshake/> Transparent giving</span><span><BookOpen/> Evidence-led updates</span></div></section>

      <section className="section intro" id="how-it-works"><div className="section-heading"><div className="eyebrow">A clear path from giving to impact</div><h2>Good intentions deserve<br/><em>good accountability.</em></h2><p>As Sadaqah connects donors with mosque communities through a process designed to make every step easier to understand.</p></div><div className="feature-grid">{highlights.map((item, i) => { const Icon = item.icon; return <article className="feature-card" key={item.title}><div className="feature-icon"><Icon size={21}/></div><span className="step">0{i + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>; })}</div></section>

      <section className="section projects-section" id="projects"><div className="projects-head"><div><div className="eyebrow">Discover meaningful work</div><h2>Projects worth<br/><em>being part of.</em></h2></div><Link href="/projects" className="text-link">Explore all projects <ArrowUpRight size={16}/></Link></div><div className="project-grid">{projects.map((project) => <article className="project-card" key={project.title}><div className="project-visual"><span className="project-category">{project.category}</span><div className="visual-pattern">✳</div><span className="project-status"><span/> {project.tag}</span></div><div className="project-body"><div className="location"><MapPin size={13}/>{project.location}</div><h3>{project.title}</h3><div className="progress-track"><span style={{ width: project.progress + "%" }}/></div><div className="progress-label"><strong>{project.raised}</strong><span>{project.progress}%</span></div><div className="target-label">of {project.target} target</div><Link href="/auth/sign-in" className="project-link">View project <ArrowUpRight size={15}/></Link></div></article>)}</div><p className="demo-note">Illustrative project cards for the design preview. Live fundraising listings will only appear after review and approval.</p></section>

      <section className="cta-band"><div className="cta-icon"><Sparkles size={24}/></div><div><div className="eyebrow">For mosque leaders and community organisers</div><h2>Bring your community’s<br/>good work into view.</h2><p>Create a mosque profile and build trust through clear project information and regular updates.</p></div><Link href="/auth/sign-up" className="button button-light">Register a mosque <ArrowUpRight size={17}/></Link></section>

      <footer className="footer"><Link href="/" className="brand"><span className="brand-mark">ص</span><span>as sadaqah<small>GIVING WITH CONFIDENCE</small></span></Link><p>May every sincere contribution become lasting good.</p><span>© {new Date().getFullYear()} As Sadaqah</span></footer>
    </main>
  );
}
