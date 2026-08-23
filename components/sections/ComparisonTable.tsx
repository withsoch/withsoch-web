// components/sections/ComparisonTable.tsx
//
// Real <table>, dashed row dividers - dividers-not-boxes, not nested cards.

import { ENGAGEMENT_TIERS } from "@/lib/content";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

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
    <Section className="bg-white" divider>
      <Reveal>
        <SectionHeading
          align="left"
          title="AI Consulting vs. Implementation vs. Transformation"
          intro="Not sure which engagement you need? Here's how they differ and which one fits where you are right now."
          maxWidthClassName="max-w-3xl"
          titleClassName="text-h2 lg:text-[2.1rem] lg:leading-[1.15]"
        />
      </Reveal>
      <Reveal className="comparison-table mt-14" delay={0.08}>
        <table>
          <thead>
            <tr>
              <th></th>
              {ENGAGEMENT_TIERS.map((tier) => (
                <th key={tier.name}>{tier.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.label}>
                <th>{row.label}</th>
                {ENGAGEMENT_TIERS.map((tier) => (
                  // data-tier drives the mobile label. Below 768px the table
                  // collapses to stacked blocks and the column headers stop
                  // aligning with anything, so three bare values like
                  // "$1K-$4K / $4K-$8K / $8K-$25K" appeared with no way to
                  // tell which tier each belonged to. See .comparison-table
                  // td::before in globals.css.
                  <td key={tier.name} data-tier={tier.name}>
                    {tier[row.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </Section>
  );
}
