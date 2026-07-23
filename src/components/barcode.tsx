// Decorative barcode component — Code 128 aesthetic, not scannable data.
// Bars have irregular widths and gaps, generated deterministically from a seed.

function hashSeed(seed: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(a: number) {
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Props = {
  value?: string;
  seed?: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
  height?: number; // logical height in px along the "bar" axis
  ariaLabel?: string;
};

export function Barcode({
  value,
  seed,
  orientation = "horizontal",
  className,
  height = 40,
  ariaLabel = "Decorative barcode",
}: Props) {
  const s = seed ?? value ?? "SPOOL";
  const rand = mulberry32(hashSeed(s));

  // Build bars with varying widths (1..4) and gaps (1..3).
  // Frame with guard bars to look like Code 128 start/stop.
  const units: { w: number; bar: boolean }[] = [];
  units.push({ w: 2, bar: true }, { w: 1, bar: false }, { w: 1, bar: true }, { w: 2, bar: false });

  const targetUnits = 120;
  let total = units.reduce((a, b) => a + b.w, 0);
  let bar = true;
  while (total < targetUnits - 8) {
    const w = 1 + Math.floor(rand() * (bar ? 4 : 3));
    units.push({ w, bar });
    total += w;
    bar = !bar;
  }
  units.push({ w: 1, bar: false }, { w: 2, bar: true }, { w: 1, bar: false }, { w: 1, bar: true }, { w: 2, bar: true });
  total = units.reduce((a, b) => a + b.w, 0);

  // Draw horizontally in a viewBox where width = total units, height = 40.
  const vbW = total;
  const vbH = 40;

  let x = 0;
  const rects = units.map((u, i) => {
    const rx = x;
    x += u.w;
    if (!u.bar) return null;
    return <rect key={i} x={rx} y={0} width={u.w} height={vbH} fill="currentColor" />;
  });

  const isVertical = orientation === "vertical";
  // For vertical, swap width/height and rotate content 90deg via transform.
  const svgW = isVertical ? height : "100%";
  const svgH = isVertical ? "100%" : height;

  return (
    <svg
      className={className}
      role="img"
      aria-label={ariaLabel}
      width={svgW as number | string}
      height={svgH as number | string}
      viewBox={isVertical ? `0 0 ${vbH} ${vbW}` : `0 0 ${vbW} ${vbH}`}
      preserveAspectRatio="none"
      shapeRendering="crispEdges"
    >
      {isVertical ? (
        <g transform={`rotate(90) translate(0 ${-vbH})`}>{rects}</g>
      ) : (
        rects
      )}
    </svg>
  );
}
