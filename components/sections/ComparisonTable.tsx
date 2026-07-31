// components/sections/ComparisonTable.tsx
//
// Real <table>, dashed row dividers — dividers-not-boxes, not nested cards.

import { ENGAGEMENT_TIERS } from "@/lib/content";
import { Section, SectionHeading } from "@/components/ui/Section";

const ROWS: { label: string; key: keyof (typeof ENGAGEMENT_TIERS)[number] }[] = [
  { label: "Best For", key: "bestFor" },
  { label: "Deliverable", key: "deliverable" },
  { label: "Timeline", key: "timeline" },
  { label: "Investment", key: "investment" },
  { label: "Typical ROI", key: "typicalRoi" },
  { label: "You Get", key: "youGet" },
];

export function ComparisonTable() {
  return (
    <Section className="bg-mist">
      <SectionHeading
        title="AI Consulting vs. Implementation vs. Transformation"
        intro="Not sure which engagement you need? Here's how they differ and which one fits where you are right now."
      />
      <div className="mt-14 overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="rule-dashed">
              <th className="py-4 pr-6 text-sm font-semibold text-muted"></th>
              {ENGAGEMENT_TIERS.map((tier) => (
                <th key={tier.name} className="py-4 px-6 text-h3">
                  {tier.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.label} className="rule-dashed">
                <th className="py-5 pr-6 text-sm font-semibold text-muted align-top whitespace-nowrap">
                  {row.label}
                </th>
                {ENGAGEMENT_TIERS.map((tier) => (
                  <td key={tier.name} className="py-5 px-6 text-slate align-top">
                    {tier[row.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
