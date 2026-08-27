// components/sections/ServiceFlowDiagram.tsx
//
// Generic, data-driven hero-side flow illustration: a top row of chips
// flows into a connected core row, which flows into a bottom row of chips,
// inside the shared DiagramFrame wrapper. Originally built one-off for the
// AI Agent Development service (as AgentFlowDiagram) and generalized here
// so any service can supply its own labels/icons via SERVICES[].flowDiagram.
//
// FIXED (not configurable): the 3-row structure, the DiagramFrame wrapper,
// and the color roles (top row = blue tint, core row = dark navy, bottom
// row = green tint) - these are the shared visual system across services.
// DATA (configurable per service): row labels, chip labels/icons/count
// (2-4), and core node labels/icons/count (2-4).
//
// Approved, one-off exception to DESIGN.md's flat coral/cream/ink palette:
// this diagram's blue/navy/green colors are scoped locally (arbitrary
// Tailwind/inline values) and must not become new @theme tokens - Rizwan is
// being looped in on the palette separately.

import { Icon, type IconName } from "@/components/Icons";
import { DiagramFrame } from "@/components/ui/DiagramFrame";

type Chip = { label: string; icon: IconName };
type ChipRowData = { label: string; items: Chip[] };
type CoreData = { label: string; nodes: Chip[] };

export type ServiceFlowDiagramData = {
  topRow: ChipRowData;
  core: CoreData;
  bottomRow: ChipRowData;
};

const MIN_ITEMS = 2;
const MAX_ITEMS = 4;

// Clamp a row/node list to the supported 2-4 range instead of letting a bad
// data entry silently render a broken layout (empty grid, one giant chip).
function clampItems<T>(items: T[], context: string): T[] {
  if (items.length < MIN_ITEMS || items.length > MAX_ITEMS) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `ServiceFlowDiagram: ${context} has ${items.length} items, expected ${MIN_ITEMS}-${MAX_ITEMS}. Clamping.`
      );
    }
  }
  if (items.length < MIN_ITEMS) return items;
  return items.slice(0, MAX_ITEMS);
}

function ChipRow({ chips, bg, fg }: { chips: Chip[]; bg: string; fg: string }) {
  return (
    <div
      className="grid gap-2 sm:gap-3"
      style={{ gridTemplateColumns: `repeat(${chips.length}, minmax(0, 1fr))` }}
    >
      {chips.map((chip) => (
        <div
          key={chip.label}
          className="flex flex-col items-center gap-1.5 rounded-xl px-2 py-3 text-center sm:gap-2 sm:px-3 sm:py-4"
          style={{ backgroundColor: bg, color: fg }}
        >
          <Icon name={chip.icon} className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" aria-hidden="true" />
          <span className="text-[0.7rem] font-semibold leading-tight sm:text-xs">{chip.label}</span>
        </div>
      ))}
    </div>
  );
}

function DownArrows({ count }: { count: number }) {
  return (
    <div
      className="grid place-items-center py-1"
      style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <Icon key={i} name="arrow" className="h-4 w-4 rotate-90 text-[#8a97a8]" />
      ))}
    </div>
  );
}

// Evenly spaces N core nodes around the center of the core panel, starting
// at the top and proceeding counterclockwise (screen y grows downward, so
// a negative angle step is what reads as "left, then right" - e.g. for 3
// nodes: top, bottom-left, bottom-right) - generalizes the old hardcoded
// 3-point triangle (top / bottom-left / bottom-right) to 2-4 points.
function corePosition(index: number, total: number) {
  const angle = -90 - (360 / total) * index;
  const radians = (angle * Math.PI) / 180;
  const radiusX = total <= 2 ? 30 : 38;
  const radiusY = 32;
  const left = 50 + radiusX * Math.cos(radians);
  const top = 50 + radiusY * Math.sin(radians);
  return { left: `${left}%`, top: `${top}%` };
}

function CoreNode({ icon, label, style }: { icon: IconName; label: string; style: React.CSSProperties }) {
  return (
    <div
      className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 text-white"
      style={style}
      aria-hidden="true"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 sm:h-10 sm:w-10">
        <Icon name={icon} className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
      </span>
      <span className="text-[0.65rem] font-semibold tracking-wide sm:text-xs">{label}</span>
    </div>
  );
}

function buildAriaLabel(data: ServiceFlowDiagramData): string {
  const inputs = data.topRow.items.map((i) => i.label).join(", ");
  const coreSteps = data.core.nodes.map((n) => n.label).join(", ");
  const outputs = data.bottomRow.items.map((i) => i.label).join(", ");
  return `Diagram: ${data.topRow.label} from ${inputs} flow into a central ${data.core.label} that handles ${coreSteps}, which produces ${data.bottomRow.label.toLowerCase()} of ${outputs}.`;
}

export function ServiceFlowDiagram({ data }: { data: ServiceFlowDiagramData }) {
  const topItems = clampItems(data.topRow.items, "topRow.items");
  const bottomItems = clampItems(data.bottomRow.items, "bottomRow.items");
  const coreNodes = clampItems(data.core.nodes, "core.nodes");

  return (
    <div role="img" aria-label={buildAriaLabel(data)} className="h-full w-full">
      <DiagramFrame className="min-h-[420px]">
        <div className="flex w-full max-w-sm flex-col gap-1" aria-hidden="true">
          <span className="mb-1 text-left text-[0.65rem] font-bold uppercase tracking-widest text-muted">
            01 {data.topRow.label}
          </span>
          <ChipRow chips={topItems} bg="#d3e2f2" fg="#22344a" />

          <DownArrows count={topItems.length} />

          <span className="mb-1 text-left text-[0.65rem] font-bold uppercase tracking-widest text-muted">
            02 {data.core.label}
          </span>
          <div
            className="relative flex h-32 w-full items-center justify-center rounded-xl sm:h-36"
            style={{ backgroundColor: "#263852" }}
          >
            {coreNodes.map((node, i) => (
              <CoreNode key={node.label} icon={node.icon} label={node.label} style={corePosition(i, coreNodes.length)} />
            ))}
          </div>

          <DownArrows count={bottomItems.length} />

          <span className="mb-1 text-left text-[0.65rem] font-bold uppercase tracking-widest text-muted">
            03 {data.bottomRow.label}
          </span>
          <ChipRow chips={bottomItems} bg="#d3e0c4" fg="#2c3a20" />
        </div>
      </DiagramFrame>
    </div>
  );
}
