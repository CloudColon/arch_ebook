import { book, business } from "@/content/book";

// The cover is a navy cloth hardback with a drawing sheet stamped in gold: the ground floor plan of a
// courtyard house, with a title block below. Scales with its container (cqw units).
// PLACEHOLDER: replace with the final cover artwork if a designer delivers one.

const INK = "#d3b673"; // gold foil, used for every stamped line
const PAPER = "#1f2a5c"; // navy cloth
const FAINT = "#a8925c";

// The courtyard floor, hatched, with a pool of light on it.
function CourtyardFloor() {
  return (
    <>
      <defs>
        <pattern id="kb-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke={INK} strokeWidth="1.2" strokeOpacity="0.35" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="#26326b" />
      <rect width="100" height="100" fill="url(#kb-hatch)" />
      <rect x="18" y="10" width="82" height="90" fill={INK} fillOpacity="0.16" />
    </>
  );
}

function Plan() {
  const wall = { fill: INK };
  const thin = { stroke: INK, strokeWidth: 0.45, fill: "none" };
  const grid = { stroke: FAINT, strokeWidth: 0.3, strokeDasharray: "3 1.6 0.6 1.6" };
  const label = { fill: INK, fontSize: 2.9, fontFamily: "var(--font-plex-mono), monospace", letterSpacing: 0.2 };

  return (
    <svg viewBox="0 0 120 124" className="block h-auto w-full" aria-hidden>
      {/* Structural grid with axis bubbles */}
      {[
        [20, "A"],
        [60, "B"],
        [100, "C"],
      ].map(([x, t]) => (
        <g key={t}>
          <line x1={x} y1="11" x2={x} y2="112" {...grid} />
          <circle cx={x} cy="6" r="3.6" fill={PAPER} stroke={INK} strokeWidth="0.4" />
          <text x={x} y="7.1" textAnchor="middle" {...label} fontSize="3.2">
            {t}
          </text>
        </g>
      ))}
      {[
        [24, "1"],
        [62, "2"],
        [100, "3"],
      ].map(([y, t]) => (
        <g key={t}>
          <line x1="11" y1={y} x2="110" y2={y} {...grid} />
          <circle cx="6" cy={y} r="3.6" fill={PAPER} stroke={INK} strokeWidth="0.4" />
          <text x="6" y={Number(y) + 1.1} textAnchor="middle" {...label} fontSize="3.2">
            {t}
          </text>
        </g>
      ))}

      {/* Courtyard floor */}
      <svg x="44" y="46" width="32" height="32" viewBox="0 0 100 100" preserveAspectRatio="none">
        <CourtyardFloor />
      </svg>
      <rect x="44" y="46" width="32" height="32" {...thin} />

      {/* Verandah: roof edge above (dashed) and columns */}
      <rect x="38" y="40" width="44" height="44" fill="none" stroke={INK} strokeWidth="0.35" strokeDasharray="1.6 1.2" />
      {[
        [43, 45],
        [58.5, 45],
        [74, 45],
        [43, 60.5],
        [74, 60.5],
        [43, 76],
        [58.5, 76],
        [74, 76],
      ].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="3" height="3" {...wall} />
      ))}

      {/* Outer walls in poché, with the entrance gap on the south side */}
      <rect x="18" y="22" width="84" height="3" {...wall} />
      <rect x="18" y="22" width="3" height="80" {...wall} />
      <rect x="99" y="22" width="3" height="80" {...wall} />
      <rect x="18" y="99" width="34" height="3" {...wall} />
      <rect x="68" y="99" width="34" height="3" {...wall} />

      {/* Windows: gaps in the wall with glazing lines */}
      {[
        [54, 22, 12, 3],
        [18, 48, 3, 10],
        [99, 64, 3, 10],
        [26, 99, 12, 3],
        [82, 99, 12, 3],
      ].map(([x, y, w, h]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width={w} height={h} fill={PAPER} />
          {w > h ? (
            <>
              <line x1={x} y1={y + 1} x2={x + w} y2={y + 1} {...thin} strokeWidth="0.3" />
              <line x1={x} y1={y + 2} x2={x + w} y2={y + 2} {...thin} strokeWidth="0.3" />
            </>
          ) : (
            <>
              <line x1={x + 1} y1={y} x2={x + 1} y2={y + h} {...thin} strokeWidth="0.3" />
              <line x1={x + 2} y1={y} x2={x + 2} y2={y + h} {...thin} strokeWidth="0.3" />
            </>
          )}
        </g>
      ))}

      {/* Internal walls */}
      <rect x="45.2" y="25" width="1.6" height="15" {...wall} />
      <rect x="73.2" y="25" width="1.6" height="15" {...wall} />
      <rect x="21" y="39.2" width="17" height="1.6" {...wall} />
      <rect x="82" y="39.2" width="17" height="1.6" {...wall} />
      <rect x="21" y="83.2" width="17" height="1.6" {...wall} />
      <rect x="82" y="83.2" width="17" height="1.6" {...wall} />
      <rect x="45.2" y="84" width="1.6" height="15" {...wall} />
      <rect x="73.2" y="84" width="1.6" height="15" {...wall} />

      {/* Door swings */}
      <g {...thin}>
        <rect x="27" y="39" width="6" height="2" fill={PAPER} stroke="none" />
        <line x1="27" y1="40" x2="27" y2="34" />
        <path d="M33 40 A6 6 0 0 0 27 34" strokeDasharray="0.8 0.8" />
        <rect x="87" y="83" width="6" height="2" fill={PAPER} stroke="none" />
        <line x1="93" y1="84" x2="93" y2="90" />
        <path d="M87 84 A6 6 0 0 0 93 90" strokeDasharray="0.8 0.8" />
        <rect x="52" y="39" width="6" height="2" fill={PAPER} stroke="none" />
        <line x1="58" y1="40" x2="58" y2="34" />
        <path d="M52 40 A6 6 0 0 1 58 34" strokeDasharray="0.8 0.8" />
      </g>

      {/* Stair with direction arrow */}
      <g {...thin} strokeWidth="0.3">
        <rect x="85" y="46" width="11" height="30" />
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={i} x1="85" y1={49 + i * 2.7} x2="96" y2={49 + i * 2.7} />
        ))}
        <line x1="90.5" y1="74" x2="90.5" y2="49" strokeWidth="0.4" />
        <path d="M89 51.5 L90.5 48.5 L92 51.5" strokeWidth="0.4" />
      </g>

      {/* Threshold: the otla steps outside the entrance */}
      <g {...thin} strokeWidth="0.35">
        <line x1="50" y1="105" x2="70" y2="105" />
        <line x1="48" y1="108.5" x2="72" y2="108.5" />
        <line x1="50" y1="102" x2="50" y2="105" />
        <line x1="70" y1="102" x2="70" y2="105" />
      </g>

      {/* Section line A-A */}
      <line x1="13" y1="68" x2="107" y2="68" stroke={INK} strokeWidth="0.35" strokeDasharray="5 1.4 1 1.4" />
      <path d="M13 68 L13 64 L16 66 Z" fill={INK} />
      <path d="M107 68 L107 64 L104 66 Z" fill={INK} />
      <text x="13" y="62.5" textAnchor="middle" {...label}>
        A
      </text>
      <text x="107" y="62.5" textAnchor="middle" {...label}>
        A
      </text>

      {/* Room names */}
      <text x="29.5" y="62" textAnchor="middle" {...label}>
        LIVING
      </text>
      <text x="32" y="32.5" textAnchor="middle" {...label}>
        BED
      </text>
      <text x="88" y="32.5" textAnchor="middle" {...label}>
        BED
      </text>
      <text x="60" y="32.5" textAnchor="middle" {...label}>
        STUDY
      </text>
      <text x="30" y="93" textAnchor="middle" {...label}>
        KITCHEN
      </text>
      <text x="60" y="93" textAnchor="middle" {...label}>
        ENTRY
      </text>
      <text x="60" y="115.5" textAnchor="middle" {...label}>
        OTLA
      </text>

      {/* North point and scale bar */}
      <g transform="translate(112 117)">
        <circle r="4" fill="none" stroke={INK} strokeWidth="0.35" />
        <path d="M0 -4 L2 2 L0 0.8 L-2 2 Z" fill={INK} />
        <text x="0" y="-5.4" textAnchor="middle" {...label} fontSize="2.6">
          N
        </text>
      </g>
      <g transform="translate(14 117)">
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={i * 5} y="0" width="5" height="1.4" fill={i % 2 ? PAPER : INK} stroke={INK} strokeWidth="0.25" />
        ))}
        <text x="0" y="5" {...label} fontSize="2.4">
          0
        </text>
        <text x="20" y="5" textAnchor="middle" {...label} fontSize="2.4">
          4m
        </text>
      </g>
    </svg>
  );
}

export function BookCover({ className = "" }: { className?: string }) {
  return (
    <div
      className={`@container relative aspect-[2/3] overflow-hidden text-[#e6d29c] ${className}`}
      style={{
        backgroundColor: PAPER,
        backgroundImage: `radial-gradient(120% 90% at 30% 20%, rgba(255,255,255,0.07), transparent 60%), linear-gradient(rgba(211,182,115,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(211,182,115,0.05) 1px, transparent 1px)`,
        backgroundSize: "100% 100%, 4cqw 4cqw, 4cqw 4cqw",
      }}
      aria-label={`${book.title} by ${book.authorTitle}, cover`}
      role="img"
    >
      {/* Sheet border */}
      <div className="absolute inset-[3.5cqw] flex flex-col border-[0.5cqw] border-[#d3b673] p-[3cqw] outline outline-[0.25cqw] outline-offset-[1.2cqw] outline-[#d3b673]/60">
        <Plan />

        {/* Title block */}
        <div className="mt-auto grid grid-cols-3 border-[0.35cqw] border-[#d3b673]">
          <div className="col-span-3 border-b-[0.35cqw] border-[#d3b673] px-[2.6cqw] pb-[2.4cqw] pt-[2cqw]">
            <p className="font-display text-[15cqw] font-semibold leading-[0.9] tracking-[-0.01em] text-[#ead7a0]">{book.title}</p>
            <p className="mt-[1.4cqw] font-display text-[4.6cqw] font-medium italic leading-[1.15] text-[#cdb27a]">{book.subtitle}</p>
          </div>
          <Cell k="Drawn by" v={book.authorTitle} span />
          <Cell k="Sheet" v="A-01" last />
          <Cell k="Published by" v={business.brand} span bottom />
          <Cell k="Scale" v="1:100" last bottom />
        </div>
      </div>
    </div>
  );
}

function Cell({ k, v, span, last, bottom }: { k: string; v: string; span?: boolean; last?: boolean; bottom?: boolean }) {
  return (
    <div
      className={`px-[2.6cqw] py-[1.4cqw] ${span ? "col-span-2" : ""} ${last ? "" : "border-r-[0.35cqw] border-[#d3b673]"} ${
        bottom ? "" : "border-b-[0.35cqw] border-[#d3b673]"
      }`}
    >
      <p className="font-mono text-[2.3cqw] uppercase tracking-[0.06em] text-[#a8925c]">{k}</p>
      <p className="mt-[0.4cqw] truncate text-[3.6cqw] font-semibold leading-tight">{v}</p>
    </div>
  );
}
