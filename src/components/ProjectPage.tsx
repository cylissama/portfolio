import { Link, useParams } from "react-router";
import { Readme } from "./Readme";
import { projects, slugOf } from "../data/projects";

export function ProjectPage() {
  const { slug } = useParams();
  const p = projects.find((x) => slugOf(x) === slug?.toLowerCase());
  if (!p) {
    return (
      <section>
        <h1>Project not found</h1>
        <p><Link to="/#work">← Back to work</Link></p>
      </section>
    );
  }
  return (
    <div className="project-layout">
    <section className="project">
      <p><Link to="/#work">← All projects</Link></p>
      <h1>{p.title}</h1>
      <p className="lead">{p.summary}</p>
      <ul className="tags">
        {p.tags.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      {(p.details ?? ["Placeholder: add a write-up for this project (what it does, how it's built, what you learned)."]).map(
        (line) => <p key={line}>{line}</p>,
      )}
      <p className="card-links">
        <a href={p.repo}>View code</a>
        {p.url && <a href={p.url}>Live site</a>}
      </p>
    </section>
    <Readme repo={p.repo} />
    <div className="project-media">
      {p.video ? (
        <video className="media" src={p.video} controls />
      ) : (
        <div className="media placeholder"><span>Demo video placeholder (set <code>video</code>)</span></div>
      )}
      <div className="shots">
        {p.images?.length
          ? p.images.map((src) => (
              <a key={src} href={src} target="_blank" rel="noopener noreferrer">
                <img className="media" src={src} alt={`${p.title} screenshot`} />
              </a>
            ))
          : [1, 2].map((n) => (
              <div key={n} className="media placeholder"><span>Screenshot / GIF placeholder (set <code>images</code>)</span></div>
            ))}
      </div>
    </div>
    </div>
  );
}
