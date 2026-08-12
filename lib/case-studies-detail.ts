// lib/case-studies-detail.ts
//
// Full real narrative content for each case study detail page — Overview,
// Problem (+ pull quote, already in CASE_STUDIES but repeated here for
// page-local convenience), 3-step Framework, and detailed Results.
// Audited directly from the live withsoch.com detail pages on 2026-07-31.
// Keyed by the same `slug` used in lib/content.ts's CASE_STUDIES array.

export type CaseStudyDetail = {
  heroImage: string; // hotlinked from the live withsoch.com Webflow CDN
  overviewImage: string; // hotlinked from the live withsoch.com Webflow CDN
  overview: string[]; // 2 paragraphs
  problem: string; // 1 paragraph (the quote itself lives in CASE_STUDIES)
  framework: { title: string; description: string }[]; // exactly 3 steps
  results: { value: string; description: string }[]; // exactly 3 results
};

export const CASE_STUDY_DETAILS: Record<string, CaseStudyDetail> = {
  "clearwater-intelligence": {
    heroImage:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a3250fa7ceaf9d84ab735e7_6a0fecd81ce7ab064be023fa_Clearwater%20%20Hero%20PortraitEditorial%20photograph%20in%20the%20s_row71.webp",
    overviewImage:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a3253dd377fd3b1435794e1_Compress-6.webp",
    overview: [
      "Clearwater Intelligence tracks competitor activity, compliance updates, and lead signals across dozens of sources. Their analysts were spending the majority of each week doing this manually — visiting websites, reading documents, pulling data, and classifying findings into internal systems. The process worked when the source count was manageable. It stopped working when the business grew.",
      "They came to Soch with a clear hypothesis: most of what the analysts were doing was pattern-based, and pattern-based work belongs to a system. We agreed, but we started with a process audit before touching any tools. We needed to understand where the research logic actually lived before we could automate any of it.",
    ],
    problem:
      "Analysts were spending 20+ hours a week on research that produced inconsistent outputs. Several key sources had no API, making standard automation unworkable. Classification depended on whoever had time that day, which meant the same information got labelled differently depending on the week. The CRM was always behind.",
    framework: [
      {
        title: "Map the research process",
        description:
          "We shadowed two analysts for a week to document every source, every classification rule, and every edge case in the process. We identified which decisions required genuine judgment and which were rule-based enough to give to a machine. This became the architecture blueprint.",
      },
      {
        title: "Build the intelligence pipeline",
        description:
          "We built a scheduled n8n workflow using Puppeteer and Browser Use to scrape sources with no available API, including ERP and CRM platforms that required RPA-style navigation. An OpenAI-powered classification agent reads each result, applies the correct category, and routes it to the right table in Airtable. PDF documents are detected, extracted, and processed in a dedicated parallel branch.",
      },
      {
        title: "Ship the daily bulletin",
        description:
          "We connected the classification output to an automated daily digest that compiles, deduplicates, and distributes findings each morning. Error logging runs in parallel and flags any failures without silently breaking the pipeline. Documentation covers every decision point in the system. It has run without intervention since launch.",
      },
    ],
    results: [
      { value: "100%", description: "Manual research hours eliminated. The system runs on a schedule with zero human input per cycle." },
      { value: "80%+", description: "Reduction in information processing time. Multi-hour sessions now complete in minutes." },
      { value: "6×", description: "More sources monitored simultaneously than the previous manual process could cover." },
    ],
  },

  "northfield-media": {
    heroImage:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a3251ee44be990d9b679d41_Compressd-4.jpg",
    overviewImage:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a3254d7d3b0df26fd466485_Cutting%202.webp",
    overview: [
      "Northfield Media produces blogs, reports, ebooks, and social content across multiple channels. Their content team was spending most of each week on production — researching, writing, formatting, and distributing — with almost no time left for strategy or distribution. The volume the business needed had outgrown what the team could sustainably produce by hand.",
      "The challenge was not just speed. It was quality and brand consistency. Generic AI output was not good enough. Every piece needed to sound like Northfield, pass editorial standards, and be SEO-ready before a human reviewed it. They also needed flexibility — routine content could run fully automatically, but high-stakes pieces still needed a human checkpoint before publishing. Both had to run from the same system.",
    ],
    problem:
      "The team was spending full days producing content that still needed significant editing before it could go out. Brand voice was inconsistent across formats and writers. SEO was being applied after the fact rather than baked in from the start. And there was no way to increase output volume without hiring more people.",
    framework: [
      {
        title: "Audit the content operation",
        description:
          "We mapped the full production process across every content type, documented where quality broke down, and codified the brand voice and editorial standards that made Northfield's content recognisable. This became the foundation for the AI architecture — not just the workflow design, but the memory layer the agents would draw from.",
      },
      {
        title: "Build the multi-agent engine",
        description:
          "We built a pipeline in n8n orchestrating three AI agents: an SEO Writer pulling real-time search data from SerpAPI, a Humaniser running on Claude to rewrite AI output in natural language, and an Editor for final review. Brand voice is stored in a Pinecone vector database, so every agent retrieves the same style reference every time — regardless of content type or format.",
      },
      {
        title: "Add the human checkpoint",
        description:
          "We built a conditional review layer that routes content to a human before publishing based on type, length, and sensitivity. Routine content runs fully autonomously on a schedule. Strategic pieces go through review. Both modes run from the same workflow. The team no longer manages two separate systems.",
      },
    ],
    results: [
      { value: "75%", description: "Reduction in production time. The system runs on a schedule with zero human input per cycle." },
      { value: "4", description: "Formats — web, Slack, Google Docs, and social assets published simultaneously from a single content request." },
      { value: "0", description: "Manual publishing steps. Routine content ships without a human touching it end to end." },
    ],
  },

  "stockwell-commerce": {
    heroImage:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a12148314e1a7f4f5fdad31_Stockwell%20%20Hero%20PortraitEditorial%20photograph%20in%20the%20st_row79.png",
    overviewImage:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a12178523840c5710459329_Stockwell%20%20Intext%20LandscapeEditorial%20photograph%20in%20th_row80.png",
    overview: [
      "Stockwell Commerce runs a large and continuously expanding product catalogue. For every new product, their Customer Service team was manually duplicating a master Typeform template, personalising it for the product, generating the link, and logging it in their tracking sheet. With new products being added constantly, this had become a significant and recurring drain on a team that should have been focused on customers.",
      "The work was entirely mechanical. There were no judgment calls in the process — just template duplication, field replacement, and link logging. Work that should have been owned by a system from the start. They came to Soch to fix it, and we built a pipeline that removed every manual step in the chain.",
    ],
    problem:
      "Every new product required four to six manual actions from the CS team. There was no error handling — if a step was missed, no one knew until a customer hit a broken link. The team had no reliable way to see which products had forms and which did not without manually checking the sheet.",
    framework: [
      {
        title: "Map and document the current process",
        description:
          "We worked with the CS team to trace every step in the Typeform creation process, documented the personalisation logic for each product type, and identified which fields needed dynamic replacement versus which could remain templated. This gave us a precise spec before we wrote a single line of workflow logic.",
      },
      {
        title: "Build the automated pipeline",
        description:
          "We built an n8n workflow triggered by a Google Sheets row update. The pipeline retrieves the master template via Typeform's GET endpoint, runs product-specific personalisation through a custom JavaScript node, creates the new form via the Typeform API, and writes the finalised link back to the correct row in the tracking sheet. The workflow processes 204 items per cycle with clean conditional routing and no manual involvement.",
      },
      {
        title: "Add logging and error handling",
        description:
          "We built execution logging with timestamps, per-run success and failure status, and error flagging for any products that could not be processed. The CS team now has a full audit trail and clear visibility into the pipeline's health — without managing any of it manually.",
      },
    ],
    results: [
      { value: "4 sec", description: "Per product form created. The entire pipeline runs faster than the old first step alone." },
      { value: "204", description: "Items processed per execution cycle. The catalogue can scale without the team scaling with it." },
      { value: "100%", description: "Consistent form configuration. Every form is built from the same template with the correct product data applied automatically." },
    ],
  },

  "frontline-advisory": {
    heroImage:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a3251ee9f24618c2e890f09_Compressed%20Image-2.jpg",
    overviewImage:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a325a1878c820d461319071_6a140cc7de3ba236f695f36d_Stockwell%20%20Intext%20LandscapeEditorial%20photograph%20in%20th_row83.webp",
    overview: [
      "Frontline Advisory manages inbound leads across multiple lead owners, with new contacts captured in Google Sheets. When a lead arrived, the team handled every step manually — adding the contact to their email platform, composing and sending the first SMS, following up across multiple days, and notifying the right team member. Leads that didn't get immediate attention went cold. Most didn't get immediate attention.",
      "The team was not dropping leads intentionally. The system just wasn't built for the volume or the consistency the process required. There was no automation, no sequence logic, and no mechanism to stop outreach when a lead had already replied. They came to Soch to fix the mechanics so the sales team could focus on conversations that were actually going somewhere.",
    ],
    problem:
      "First-contact time was measured in hours. Follow-up sequences were inconsistent — some leads received all five touchpoints, others received one. There was no deduplication check, so contacts were sometimes being added to the email platform more than once. And leads who had already responded were still receiving automated follow-up messages.",
    framework: [
      {
        title: "Audit the lead flow",
        description:
          "We mapped every manual touchpoint from the moment a lead landed in the sheet to the final follow-up attempt. We documented the lead owner structure, the sheet architecture, and the decision points where automation would need to handle edge cases — including what to do when a lead had already replied before the sequence completed.",
      },
      {
        title: "Build the intake and outreach workflow",
        description:
          "We built an n8n workflow triggered by Google Apps Script the moment a new lead is added to the sheet. The pipeline deduplicates against Mailchimp, creates the contact with the correct campaign tag, fires a personalised SMS within seconds of capture, and sends an internal notification to the right lead owner. It handles multiple sheets and multiple lead owners in a single pipeline with no manual routing.",
      },
      {
        title: "Build the nurture sequence",
        description:
          "A separate scheduled workflow runs daily, calculates how many days have elapsed since first contact for each lead, and routes only those within the active window into the send pipeline. Before each message goes out, the workflow checks whether the lead has replied and halts the sequence immediately if they have. Status updates are written back to the tracking sheet after every action.",
      },
    ],
    results: [
      { value: "6 sec", description: "Average time to first contact. Every new lead receives an SMS before the team has seen the notification." },
      { value: "100%", description: "Sequence completion rate. Every lead in the active window receives every touchpoint — unless they reply first." },
      { value: "Real-time", description: "Lead status visibility. The team sees exactly where every lead sits in the sequence without opening a single sheet manually." },
    ],
  },

  "harmon-advisory": {
    heroImage:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a141cbf8f34ca7e124767f8_Harmon%20%20Hero%20PortraitEditorial%20photograph%20in%20the%20style_row75.png",
    overviewImage:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a140cc79e8bf0a849aa6e06_Harmon%20%20Intext%20LandscapeEditorial%20photograph%20in%20the%20s_row85.png",
    overview: [
      "Harmon Advisory handles a high volume of inbound support queries through Gmail. Their support team was spending most of the day reading, classifying, and drafting responses manually — the majority of which were variations of questions their internal documentation already answered. The answers existed. Finding them quickly enough was the problem.",
      "The team needed a system that could read incoming emails, understand what was being asked, retrieve the relevant answer from existing documentation, and prepare a draft — without a human doing the first three steps. They also needed the knowledge base to stay current automatically whenever a document was updated. Both problems required different builds. We built both.",
    ],
    problem:
      "Triage was manual and inconsistent — different team members categorised the same type of query differently. Response time varied based on who was available, not how urgent the email was. Internal documentation was spread across Google Docs that no one had time to search during a busy support shift. And whenever a document was updated, someone had to manually re-brief whoever was handling support that day.",
    framework: [
      {
        title: "Map the support operation",
        description:
          "We documented the full flow from email arrival to response — every triage decision, every knowledge source, and every case where genuine judgment was required versus cases where the answer was clearly in the documentation. This gave us a precise picture of where automation could own the process and where humans needed to stay involved.",
      },
      {
        title: "Build the response pipeline",
        description:
          "We built an n8n workflow triggered by Gmail that extracts clean text from incoming emails and runs it through an OpenAI classifier. Support queries go to a LangChain agent that performs semantic search across a Supabase vector database built from the company's full documentation set. The agent composes a draft response grounded in verified internal knowledge and creates it directly in Gmail — ready for one-click send or a quick edit before it goes out.",
      },
      {
        title: "Build the knowledge ingestion pipeline",
        description:
          "A separate workflow monitors Google Drive for file creation and update events. When a document changes, the pipeline re-ingests it — deletes outdated rows, reads the updated content, chunks it, generates embeddings via OpenAI, and inserts them into Supabase. New knowledge is available to the response agent the moment a document is saved in Drive. No manual re-ingestion, no re-briefing.",
      },
    ],
    results: [
      { value: "0", description: "Manual triage steps. Every email is read, classified, and routed within seconds of arrival." },
      { value: "3×", description: "Increase in support volume handled per team member without adding headcount or extending response times." },
      { value: "Automatic", description: "Knowledge base maintenance. Document updates are reflected in the support system instantly with no manual process required." },
    ],
  },

  "physical-therapy-first": {
    heroImage:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a5f9500ee9300399fbe8938_Physical%20Therapy%20First%20Hero%20Image-CST.avif",
    overviewImage:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a5f95001635bdb3e9eb140b_Physical%20Therapy%20First%20Overview-CST.jpg",
    overview: [
      "Physical Therapy First runs three clinics across Baltimore (Roland Park, Clarksville, and Hunt Valley), all staffed by one shared front desk team working by phone, one patient at a time. Every new patient meant twenty minutes of manual insurance verification and chart setup before they'd even walked through the door. No-shows sat at 18% across all three locations, with no shared waitlist to fill an empty slot when someone cancelled. Intake forms were still paper, filled out in the waiting room after check-in, so nothing was in the system until the visit had already started.",
      "They came to Soch needing intake, scheduling, and reputation handled as one connected system instead of three separate manual habits, built on top of PromptEMR, the scheduling system the front desk already used, so there was nothing new for anyone to learn.",
    ],
    problem:
      "Every new patient meant twenty-plus minutes of manual insurance verification and chart setup, done by hand before they walked in. No-shows were running at 18% across all three clinics, with no shared waitlist to fill an empty slot when someone cancelled. And intake was still happening on paper in the waiting room, so nothing entered the system until the visit had already begun.",
    framework: [
      {
        title: "Automate intake before the visit",
        description:
          "The first workflow checks insurance eligibility and pre-builds the patient's chart the moment they request an appointment, then texts them their intake forms before they even leave the house.",
      },
      {
        title: "Connect scheduling across all three clinics",
        description:
          "The second workflow ties scheduling across Roland Park, Clarksville, and Hunt Valley together, so a cancellation at one location instantly offers that slot to someone on the waitlist.",
      },
      {
        title: "Time review requests to real outcomes",
        description:
          "The third workflow sends a review request only to patients who reported a genuinely good outcome, timed to their last visit, all built on PromptEMR, the system the front desk already used.",
      },
    ],
    results: [
      { value: "80%", description: "Reduction in admin time per new patient, twelve months in." },
      { value: "7%", description: "No-show rate across all three clinics, down from 18%." },
      { value: "13×", description: "Increase in monthly Google reviews, from 3 a month to 40, alongside a 23% rise in new-patient bookings within two quarters." },
    ],
  },

  "be-london": {
    heroImage:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a5f950156a459fb7cac92cf_Be%20London%20Hero%20-CST.jpg",
    overviewImage:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a5f94fe03107154a17a2bec_Be%20London%20Overview%20-CST.avif",
    overview: [
      "Be London manages serviced apartments across fifteen London neighbourhoods, all run out of one small central office. Every guest enquiry, every landlord onboarding, and every pricing update went through that same small team, by hand. Enquiries were taking an average of five hours to answer outside office hours, plenty of time for a guest to book somewhere else, because every request had to be checked manually against dozens of listings, matching dates, group size, and budget one message at a time.",
      "They came to Soch needing guest enquiries, landlord onboarding, and pricing run as one connected system, without losing the five-star feel that set them apart.",
    ],
    problem:
      "Enquiries were taking an average of five hours to answer outside office hours. Every request had to be checked by hand against dozens of listings spread across fifteen neighbourhoods, matching dates, group size, and budget one message at a time. And bringing a new landlord's property live across every booking channel took two full weeks of manual setup.",
    framework: [
      {
        title: "Answer enquiries the moment they land",
        description:
          "The first workflow reads every enquiry (web form, email, or WhatsApp) for dates, group size, and budget, matches it against live availability, and replies with tailored options in minutes, any hour of the day.",
      },
      {
        title: "Automate landlord onboarding end to end",
        description:
          "The second workflow takes a new listing from copy to channel sync to booking the styling visit, cutting two weeks of manual setup down to three days.",
      },
      {
        title: "Reprice automatically for length of stay",
        description:
          "The third workflow recalculates length-of-stay pricing automatically, so nobody is manually repricing a six-week corporate booking in a spreadsheet. The office team steps in only for judgment calls: corporate contracts, long stays, anything outside a standard template.",
      },
    ],
    results: [
      { value: "8 min", description: "Average first response time, down from 5 hours, any hour of the day." },
      { value: "3 days", description: "Landlord onboarding, down from two weeks." },
      { value: "31%", description: "More enquiries converting into booked stays, with zero double-bookings across the portfolio since go-live." },
    ],
  },

  "aesthetics-lab": {
    heroImage:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a5f94ff66b97e7cc2b6419c_Aesthetics%20Lab%20Hero%20Image%20-CST.jpg",
    overviewImage:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a5f95031635bdb3e9eb18de_Aesthetics%20Lab%20Overview%20-CST.jpg",
    overview: [
      "Aesthetics Lab runs six branches across Lahore, Islamabad, and Faisalabad, and nearly every booking starts on WhatsApp. Each branch ran its own number, answered manually, which meant six separate inboxes doing the same job by hand. During peak hours, replies were taking 25 minutes on average, long enough for a client to book somewhere else, and with more than 15,000 clients on file, there was no consistent way to remind anyone their next session in a package was due.",
      "They came to Soch needing booking, follow-up, and offers run as one connected system, live across all six branch numbers, without changing the numbers clients already had saved.",
    ],
    problem:
      "Each branch ran its own WhatsApp number, answered manually, with replies during peak hours taking 25 minutes on average. If someone asked which branch had an opening today, staff had to check six separate chats one at a time. And with more than 15,000 clients on file, there was no consistent way to remind anyone their next session in a package was due.",
    framework: [
      {
        title: "Answer and book instantly, on the numbers clients already use",
        description:
          "The first workflow answers pricing and availability questions instantly and books directly into the schedule, handing off to a person only when something falls outside routine.",
      },
      {
        title: "Automate multi-session follow-ups",
        description:
          "The second workflow sends automatic follow-ups for multi-session packages, like a laser hair removal series, with one-tap rebooking instead of a phone call from the front desk.",
      },
      {
        title: "Match offers to real treatment history",
        description:
          "The third workflow matches offers to what a client has actually had before, instead of blasting the same broadcast to everyone on the list, live across the same six numbers clients already message.",
      },
    ],
    results: [
      { value: "50 sec", description: "Average WhatsApp response time, down from 25 minutes." },
      { value: "86%", description: "Package completion rate, up from 62%." },
      { value: "3.4×", description: "Redemption rate on treatment-matched offers versus a generic broadcast, with WhatsApp-captured bookings up 47% month over month." },
    ],
  },

  "fifth-avenue-hotel": {
    heroImage:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a5f95019c2371ecb7be9d67_The%20Fifth%20Avenue%20Hotel%20Hero%20-CST.jpg",
    overviewImage:
      "https://cdn.prod.website-files.com/68e7ded517d0693d2c345250/6a5f9502aed60d6249e2651b_The%20Fifth%20Avenue%20Hotel%20Overview-CST.avif",
    overview: [
      "The Fifth Avenue Hotel is a Michelin Two-Key property in NoMad, and its private events business books weddings, corporate dinners, and celebrations worth tens of thousands of dollars each. Every inquiry took an average of four days to turn into a custom proposal, built by hand in a shared document and checked against a floor plan and a spreadsheet of vendor rates. Thirty-eight percent of inquiries went cold before a proposal ever reached the client's inbox, with no systematic follow-up for undecided leads while other NoMad venues replied faster.",
      "They came to Soch needing event inquiries, proposals, and follow-up run as one connected system, without losing the level of personalization a Michelin Two-Key property is expected to deliver.",
    ],
    problem:
      "Every private event inquiry (a wedding, a corporate dinner, a celebration) took an average of four days to turn into a custom proposal, built by hand and checked against a floor plan and a spreadsheet of vendor rates. Thirty-eight percent of inquiries went cold before a proposal ever reached the client's inbox, and there was no systematic follow-up for undecided leads, so warm inquiries quietly disappeared while other NoMad venues replied faster.",
    framework: [
      {
        title: "Draft branded proposals within the hour",
        description:
          "The first workflow takes an inquiry (phone, email, or website), matches it to real room and date availability, and drafts a branded proposal with room options, menu packages, and pricing within the hour, ready for the events team to personalize and send.",
      },
      {
        title: "Put undecided leads on a timed follow-up sequence",
        description:
          "The second workflow puts every inquiry that doesn't book immediately into a timed follow-up sequence, so the sales team's attention goes to the leads actually ready to close.",
      },
      {
        title: "Give the team one live pipeline view",
        description:
          "The third workflow gives the events team one live dashboard showing exactly what's booked, what's pending, and what's still in play. The team still designs every detail; they're just never starting from a blank document.",
      },
    ],
    results: [
      { value: "3 hrs", description: "Proposal turnaround, down from four days." },
      { value: "6%", description: "Inquiries going cold, down from 38%." },
      { value: "22%", description: "More inquiries converting into signed contracts, with the new pipeline booking over $80,000 in event revenue in year one." },
    ],
  },
};
