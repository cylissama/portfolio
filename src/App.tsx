import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router";
import { profile } from "./data/profile";
import { skills } from "./data/skills";
import { projects } from "./data/projects";
import { CraneBackdrop } from "./components/CraneBackdrop";
import { Header } from "./components/Header";
import { ProjectCard } from "./components/ProjectCard";
import { ProjectPage } from "./components/ProjectPage";

function Home() {
  const { name, tagline, bio, links } = profile;
  const [active, setActive] = useState<string[]>([]);
  const toggle = (s: string) =>
    setActive((a) => (a.includes(s) ? a.filter((x) => x !== s) : [...a, s]));
  // A project matches when it has every selected skill.
  const shown = projects.filter((p) => active.every((s) => p.tags.includes(s)));
  return (
    <>
      <CraneBackdrop />
      <section className="hero">
        <h1>Hi, I'm {name}.</h1>
        <p>{tagline}</p>
      </section>

      <div className="panel">
      <section id="skills">
        <h2>Skills</h2>
        <p className="hint">Select skills to filter the projects below.</p>
        <dl className="skills">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group}>
              <dt>{group}</dt>
              <dd className="chips">
                {items.map((s) => (
                  <button
                    key={s}
                    className="chip"
                    aria-pressed={active.includes(s)}
                    disabled={!active.includes(s) && !projects.some((p) => p.tags.includes(s))}
                    onClick={() => toggle(s)}
                  >
                    {s}
                  </button>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="work">
        <h2>Work</h2>
        {active.length > 0 && (
          <p className="hint">
            Filtered by: {active.join(" + ")} ({shown.length}){" "}
            <button className="link" onClick={() => setActive([])}>Clear</button>
          </p>
        )}
        <div className="grid">
          {shown.map((p) => (
            <ProjectCard key={p.repo} {...p} />
          ))}
        </div>
        {shown.length === 0 && <p className="hint">No projects have all of those skills.</p>}
      </section>

      <section id="about">
        <h2>About</h2>
        {bio.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <p>
          <a href={links.github}>GitHub</a>
          {links.linkedin && <> · <a href={links.linkedin}>LinkedIn</a></>}
          {links.email && <> · <a href={`mailto:${links.email}`}>Email</a></>}
        </p>
      </section>
      </div>
    </>
  );
}

// Router doesn't scroll to #hash links on its own; do it here, and reset to top on page change.
function useScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
}

export default function App() {
  useScrollToHash();
  return (
    <>
      <Header name={profile.name} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="*" element={<ProjectPage />} />
        </Routes>
      </main>
      <footer>© {new Date().getFullYear()} {profile.name}</footer>
    </>
  );
}
