import { Link } from "react-router";
import { slugOf, type Project } from "../data/projects";

export function ProjectCard(p: Project) {
  return (
    <article className="card">
      <h3><Link to={`/projects/${slugOf(p)}`}>{p.title}</Link></h3>
      <p>{p.summary}</p>
      <ul className="tags">
        {p.tags.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <p className="card-links">
        <Link to={`/projects/${slugOf(p)}`}>Details</Link>
        <a href={p.repo}>Code</a>
        {p.url && <a href={p.url}>Live</a>}
      </p>
    </article>
  );
}
