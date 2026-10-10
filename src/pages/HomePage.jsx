import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown, Menu, Server, Network, Code2, Terminal, Workflow, Wrench, Bot, Lock, FolderCode } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAbout, useContactContent, useProfile, useProjects, useStack } from '../lib/content/useContent';
import { portfolioCopy } from '../locales/portfolio';

const icons = [Code2, Server, Network, Terminal, Workflow, Wrench, Bot];
const navIds = ['projects', 'stack', 'about', 'contact'];

function Tags({ items }) {
  return <ul className="tags">{items.map(item => <li key={item}>{item}</li>)}</ul>;
}

function ProjectCard({ project, index, language, t }) {
  const [imageFailed, setImageFailed] = useState(false);
  const preview = project.media?.cover && !imageFailed;
  return <article className="project">
    <div className={`project-preview ${preview ? '' : 'project-preview--empty'}`}>
      {preview ? <img src={project.media.cover} alt={project.media.alt?.[language] || project.title} loading="lazy" width="1200" height="834" onError={() => setImageFailed(true)} /> : <div className="project-placeholder"><FolderCode size={42} aria-hidden="true" /><span>{project.title}</span><small>{t.privateProject}</small></div>}
      {project.media?.kind === 'demo' && <span className="preview-badge">{t.demoData}</span>}
    </div>
    <div className="project-body">
      <div className="project-number mono"><span>{String(index + 1).padStart(2, '0')} / {project.stack[0]}</span><span>{project.access === 'private' ? <><Lock size={11} aria-hidden="true" /> {t.privateAccess}</> : t.publicProject}</span></div>
      <h3>{project.title}</h3><p>{project.summary}</p><Tags items={project.stack} />
      <details><summary>{t.details}</summary><p>{project.description}</p>{project.highlights?.length > 0 && <ul>{project.highlights.map(item => <li key={item}>{item}</li>)}</ul>}</details>
      <div className="project-links">
        {project.links.github && <a href={project.links.github} target="_blank" rel="noopener noreferrer">{t.code}<ArrowUpRight aria-hidden="true" /></a>}
        {project.links.demo && <a href={project.links.demo} target="_blank" rel="noopener noreferrer">{project.access === 'private' ? t.site : t.openProject}<ArrowUpRight aria-hidden="true" /></a>}
        {!project.links.github && !project.links.demo && <span>{t.privateProject}</span>}
      </div>
    </div>
  </article>;
}

export default function HomePage() {
  const { language, setLanguage } = useLanguage();
  const t = portfolioCopy[language];
  const about = useAbout();
  const profile = useProfile();
  const contact = useContactContent();
  const stack = useStack();
  const projects = useProjects();
  const featured = projects.filter(p => p.featured).slice(0, 3);
  const additional = projects.filter(p => !featured.some(f => f.slug === p.slug));
  const [moreOpen, setMoreOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  return <>
    <a className="skip" href="#main">{t.skip}</a>
    <header className="header" id="top" onKeyDown={event => { if (event.key === 'Escape' && menuOpen) { setMenuOpen(false); menuRef.current?.focus(); } }}>
      <div className="wrap nav-row">
        <a className="brand" href="#top" aria-label={profile.name}><span className="brand-mark" aria-hidden="true">rf.</span><span>{profile.name}<em>.</em></span></a>
        <nav className={`nav ${menuOpen ? 'open' : ''}`} id="navigation" aria-label={t.menu}>
          {navIds.map((id, i) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{t.nav[i]}</a>)}
          <a href="#infra" onClick={() => setMenuOpen(false)}>{t.infraNav}</a>
        </nav>
        <label className="sr-only" htmlFor="language">{t.language}</label>
        <select className="language" id="language" value={language} onChange={event => setLanguage(event.target.value)}><option value="es">ES</option><option value="en">EN</option><option value="pt">PT</option></select>
        <a className="nav-contact" href={`mailto:${contact.email}`}>{t.talk}<ArrowUpRight aria-hidden="true" /></a>
        <button className="menu" type="button" ref={menuRef} aria-label={t.menu} aria-controls="navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(value => !value)}><Menu aria-hidden="true" /></button>
      </div>
    </header>
    <main id="main">
      <section className="hero"><div className="wrap">
        <div className="hero-grid"><div className="hero-copy"><span className="eyebrow">{t.role}</span><h1>{t.headlineStart}<br /><span>{t.headlineEnd}</span></h1><p className="lead">{t.profileLead}</p><div className="hero-actions"><a className="button primary" href="#projects">{t.view}<ArrowUpRight aria-hidden="true" /></a><Link className="button" to="/resume">{t.cv}<ArrowUpRight aria-hidden="true" /></Link></div></div>
          <div className="portrait-panel"><div className="portrait-grid" aria-hidden="true" /><span className="portrait-label mono">RAÚL FIGUERA / @RAUCODE</span><img src="/images/raul.png" alt={profile.name} width="480" height="480" fetchPriority="high" /><div className="portrait-caption"><div><strong>{t.portraitRole}</strong><small>{t.location}</small></div><span className="dot" aria-hidden="true" /></div></div>
        </div>
        <div className="hero-strip mono"><span>{about.quote}</span><div className="skills"><span>Rust</span><span>PostgreSQL</span><span>Linux</span><span>Docker</span></div><a href="#projects">{t.scroll}<ArrowDown aria-hidden="true" /></a></div>
      </div></section>
      <section className="section" id="projects"><div className="wrap"><div className="section-top"><div><span className="section-index">01 / {t.nav[0]}</span><h2>{t.projectsTitle}</h2></div><p>{t.featuredIntro}</p></div><div className="projects-grid">{featured.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} language={language} t={t} />)}</div>
        {additional.length > 0 && <div className="more-projects"><button className="button" type="button" aria-expanded={moreOpen} aria-controls="more-projects" onClick={() => setMoreOpen(value => !value)}>{moreOpen ? t.showLess : `${t.showMore} (${additional.length})`}<ArrowDown aria-hidden="true" className={moreOpen ? 'rotated' : ''} /></button><div id="more-projects" hidden={!moreOpen}><p className="catalog-note">{t.catalogNote}</p><div className="projects-grid">{additional.map((p, i) => <ProjectCard key={p.slug} project={p} index={i + 3} language={language} t={t} />)}</div></div></div>}
      </div></section>
      <section className="section infra-section" id="infra"><div className="wrap infra-layout"><div><span className="section-index">02 / {t.infraNav}</span><h2>{t.infraTitle}</h2><p className="infra-lead">{t.infraDescription}</p><Tags items={['Proxmox', 'Linux', 'Docker', 'Nginx', 'Cloudflare', 'Zabbix', 'Grafana']} /></div><div className="infra-terminal"><div className="terminal-title"><Server size={16} aria-hidden="true" /><span>infrastructure / self-hosted</span></div><ul>{t.infraItems.map(([name, description], i) => <li key={name}><span className="terminal-check" aria-hidden="true">[0{i + 1}]</span><div><strong>{name}</strong><p>{description}</p></div></li>)}</ul><div className="terminal-footer mono">{t.infraFooter}</div></div></div></section>
      <section className="section stack-section" id="stack"><div className="wrap"><div className="section-top"><div><span className="section-index">03 / STACK</span><h2>{t.stackTitle}</h2></div><p>{t.stackIntro}</p></div><div className="stack-grid">{stack.items.map((item, i) => { const Icon = icons[i] || Code2; return <article key={item.title} className={`stack-item ${item.wide ? "stack-item--wide" : ""}`}><span className="stack-icon" aria-hidden="true"><Icon size={20} /></span><h3>{item.title}</h3><p>{item.description}</p><Tags items={item.tech} /></article>; })}</div></div></section>
      <section className="section" id="about"><div className="wrap about-grid"><div className="about-title"><span className="section-index">04 / {t.nav[2]}</span><h2>{t.about}</h2><p className="quote">“{about.quote}”</p></div><div className="about-text"><p>{about.paragraph}</p><div className="principles">{about.highlights.map(h => <span key={h}>{h}</span>)}</div></div></div></section>
      <section className="contact" id="contact"><div className="wrap contact-inner"><div><span className="section-index">05 / {t.nav[3]}</span><h2>{t.contactTitle}</h2><p>{t.contactLead}</p></div><div><a className="button" href={`mailto:${contact.email}`}>{t.email}<ArrowUpRight aria-hidden="true" /></a><a className="contact-email" href={`mailto:${contact.email}`}>{contact.email}</a></div></div></section>
    </main>
    <footer className="footer"><div className="wrap footer-inner"><span>© {new Date().getFullYear()} {profile.name} · raulabz.online</span><div className="footer-links"><a href={contact.github} target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRight aria-hidden="true" /></a><a href="#top">{t.top} ↑</a></div></div></footer>
  </>;
}
