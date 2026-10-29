export type Project = {
  title: string;
  summary: string;
  tags: string[];
  repo: string;
  url?: string; // live site / demo, optional
  video?: string; // e.g. "/projects/alien-probe/demo.mp4" (file in public/)
  images?: string[]; // screenshots or GIFs, e.g. "/projects/alien-probe/1.png"
  details?: string[]; // paragraphs for the project page; placeholder shown if omitted
};

// URL slug comes from the repo name: /projects/<slug>
export const slugOf = (p: Project) => p.repo.split("/").pop()!.toLowerCase();

// Tags should match names in skills.ts: that is what the skill filter matches on.
// Add a project by adding an object here. Newest first.
export const projects: Project[] = [
  {
    title: "WKU SMR Lab Middleware",
    summary: "Middleware for moving data around the Smart Manufacturing Research Laboratory at WKU.",
    tags: ["Python", "Docker", "MQTT", "FastAPI", "PostgreSQL"],
    repo: "https://github.com/cylissama/wku-smr-lab-middleware",
    video: "/projects/wku-smr-lab-middleware/demo.mp4",
    images: [
      "/projects/wku-smr-lab-middleware/lab-landscape.png", // system landscape
      "/projects/wku-smr-lab-middleware/edge-nodes.png", // edge node detail
    ],
  },
  {
    title: "Alien Probe",
    summary: "Android app interface for an Alien RFID reader.",
    tags: ["Java", "Android", "RFID / IoT"],
    repo: "https://github.com/cylissama/Alien-Probe",
    url: "https://cylissama.github.io/Alien-Probe/",
  },
];
