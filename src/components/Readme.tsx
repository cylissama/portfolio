import { useEffect, useState } from "react";
import Markdown from "react-markdown";

// Fetches the repo's README from GitHub at view time and renders it. Hidden on narrow screens (CSS).
// ponytail: unauthenticated GitHub API is 60 req/hour/IP; fetch at build time if that ever bites.
// Raw HTML inside READMEs is not rendered (react-markdown skips it), only markdown.
export function Readme({ repo }: { repo: string }) {
  const path = new URL(repo).pathname; // "/owner/name"
  const [md, setMd] = useState<string | null>(null); // null = loading, "" = none/failed

  useEffect(() => {
    setMd(null);
    fetch(`https://api.github.com/repos${path}/readme`, {
      headers: { Accept: "application/vnd.github.raw+json" },
    })
      .then((r) => (r.ok ? r.text() : ""))
      .then(setMd)
      .catch(() => setMd(""));
  }, [path]);

  if (md === "") return null;

  // Make relative links/images in the README point at the repo.
  const base = `https://github.com${path}/blob/HEAD/`;
  const rawBase = `https://raw.githubusercontent.com${path}/HEAD/`;
  const abs = (url: string, b: string) => (/^(https?:|mailto:|#)/.test(url) ? url : b + url.replace(/^\.?\//, ""));

  return (
    <aside className="readme">
      <div className="readme-bar">
        <span>README.md</span>
        <a href={repo}>GitHub ↗</a>
      </div>
      <div className="readme-body">
        {md === null ? (
          <p className="hint">Loading README…</p>
        ) : (
          <Markdown
            urlTransform={(url, key) => abs(url, key === "src" ? rawBase : base)}
            components={{
              a: ({ node: _node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
            }}
          >
            {md}
          </Markdown>
        )}
      </div>
    </aside>
  );
}
