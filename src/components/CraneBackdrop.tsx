// Decorative home-page backdrop: a gantry crane moving containers in a yard.
// Container labels are the Docker services from the SMR project. Animation is CSS (styles.css).
const COLORS = { o: "#e8590c", s: "#4d565e", g: "#1d2125", l: "#7d8790" };
type Box = [label: string, color: keyof typeof COLORS];

const STACKS: Box[][] = [
  [["postgres", "s"], ["mosquitto", "o"], ["fastapi", "g"]],
  [["pgadmin", "l"], ["compose", "s"]],
  [["swarm", "o"], ["imu_edge", "g"], ["camera_edge", "s"], ["backup", "l"]],
  [["alpine", "g"], ["volumes", "s"]],
  [["dashboard", "s"], ["mqtt", "o"]],
  [["ntp", "g"], ["api", "s"], ["build", "l"]],
  [["registry", "o"], ["deploy", "s"]],
  [["compose", "o"], ["network", "g"], ["postgres", "l"]],
];

const W = 160, H = 56, PITCH = 175, GROUND = 700;

function Container({ x, y, label, color }: { x: number; y: number; label: string; color: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={W} height={H} fill={color} />
      <rect width={W} height={H} fill="url(#ridges)" />
      <text x={W / 2} y={H / 2 + 5} textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="15" fill="#fff">
        {label}
      </text>
    </g>
  );
}

// Zigzag lattice for a crane leg.
const lattice = (x: number) =>
  Array.from({ length: 9 }, (_, i) => `M${x + (i % 2) * 16} ${184 + i * 60}l${i % 2 ? -16 : 16} 60`).join("");

export function CraneBackdrop() {
  return (
    <svg className="backdrop" viewBox="0 0 1600 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <pattern id="ridges" width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="3" height="10" fill="#000" opacity=".25" />
        </pattern>
      </defs>

      {STACKS.map((stack, i) =>
        stack.map(([label, c], j) => (
          <Container key={`${i}-${j}`} x={90 + i * PITCH} y={GROUND - (j + 1) * (H + 4)} label={label} color={COLORS[c]} />
        )),
      )}

      <g fill="none" stroke="#1d2125" strokeWidth="4">
        <path d={lattice(30)} />
        <path d={lattice(1554)} />
        <path d="M30 184V700M46 184V700M1554 184V700M1570 184V700" />
      </g>
      <rect x="10" y="160" width="1580" height="24" fill="#1d2125" />
      <rect x="1500" y="130" width="90" height="30" fill="#1d2125" />

      <g transform="translate(150 0)">
        <g className="trolley">
          <rect x="-30" y="184" width="60" height="18" fill="#e8590c" />
          <rect className="cable" x="-1.5" y="202" width="3" height="300" fill="#1d2125" />
          <g className="load">
            <rect x="-40" y="496" width="80" height="6" fill="#1d2125" />
            <Container x={-W / 2} y={502} label="kafka" color={COLORS.o} />
          </g>
        </g>
      </g>
    </svg>
  );
}
