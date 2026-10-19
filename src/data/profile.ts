// All portfolio content lives here. Replace the placeholder values with your own.

export const profile = {
  name: "Soha",
  fullName: "Soha Your-Surname",
  role: "Project Manager & SQA Engineer",
  location: "Your City, Country",
  email: "hello@example.com",
  resumeUrl: "/resume.pdf",
  availability: "Open to new projects",
  socials: {
    linkedin: "https://www.linkedin.com/in/your-handle",
    github: "https://github.com/your-handle",
  },
  intro:
    "I run projects the way I test software: define what done looks like, find the risks early, and don't ship until it passes. Two disciplines, one goal — releases that land on time and stay up.",
};

export const metrics = [
  { value: 6, suffix: "+", label: "Years shipping software" },
  { value: 40, suffix: "+", label: "Releases delivered" },
  { value: 3200, suffix: "", label: "Test cases authored" },
  { value: 0.4, suffix: "%", label: "Defect leakage to prod", decimals: 1 },
];

// Lines printed by the hero's animated test runner.
export const testRun = [
  { name: "delivers milestones on schedule", ms: 12 },
  { name: "keeps stakeholders aligned", ms: 8 },
  { name: "catches regressions before users do", ms: 21 },
  { name: "automates the boring checks", ms: 15 },
  { name: "writes requirements devs can test", ms: 9 },
  { name: "runs retros that change things", ms: 11 },
];

export type Mode = "pm" | "qa";

export const modes: Record<
  Mode,
  {
    label: string;
    title: string;
    blurb: string;
    skills: { name: string; level: number }[];
    principles: string[];
  }
> = {
  pm: {
    label: "Project Manager",
    title: "Scope it. Plan it. Land it.",
    blurb:
      "I turn fuzzy goals into roadmaps with owners, dates and risks on the table. Agile when it helps, structured when it has to be — and always with a clear answer to \"are we on track?\"",
    skills: [
      { name: "Agile / Scrum delivery", level: 95 },
      { name: "Roadmapping & estimation", level: 88 },
      { name: "Stakeholder management", level: 92 },
      { name: "Risk & dependency tracking", level: 90 },
      { name: "Budget & resource planning", level: 80 },
    ],
    principles: [
      "Every task has one owner",
      "Risks are raised early, not explained late",
      "Status updates fit on one screen",
    ],
  },
  qa: {
    label: "SQA Engineer",
    title: "Break it before they do.",
    blurb:
      "I build test strategies that match the risk: exploratory sessions for new features, automated suites for regressions, and performance checks before launch traffic finds the weak spots.",
    skills: [
      { name: "Test strategy & planning", level: 94 },
      { name: "UI automation (Playwright, Cypress)", level: 86 },
      { name: "API testing (Postman, REST Assured)", level: 89 },
      { name: "Performance testing (JMeter, k6)", level: 76 },
      { name: "CI quality gates", level: 84 },
    ],
    principles: [
      "A bug report should reproduce in one try",
      "Automate what repeats, explore what's new",
      "Quality is a team habit, not a phase",
    ],
  },
};

// Experience is shown as a release changelog, newest first.
export const releases = [
  {
    version: "v4.0",
    date: "2023 — Present",
    role: "Senior Project Manager / QA Lead",
    company: "Company Name",
    tag: "latest",
    changes: [
      { type: "added", text: "Introduced release quality gates across 5 product squads" },
      { type: "improved", text: "Cut average sprint carry-over from 30% to 8%" },
      { type: "improved", text: "Grew automated regression coverage to 78%" },
      { type: "fixed", text: "Ended last-minute release crunches with a fixed code-freeze cadence" },
    ],
  },
  {
    version: "v3.0",
    date: "2021 — 2023",
    role: "Project Manager",
    company: "Company Name",
    tag: "stable",
    changes: [
      { type: "added", text: "Delivered a multi-tenant SaaS platform for 12 enterprise clients" },
      { type: "improved", text: "Reduced client escalations 45% with weekly risk reviews" },
      { type: "added", text: "Set up Jira workflows and dashboards used company-wide" },
    ],
  },
  {
    version: "v2.0",
    date: "2019 — 2021",
    role: "SQA Engineer",
    company: "Company Name",
    tag: "stable",
    changes: [
      { type: "added", text: "Built a Playwright suite of 600+ end-to-end tests from scratch" },
      { type: "improved", text: "Cut regression cycle from 3 days to 4 hours" },
      { type: "fixed", text: "Found and documented 1,100+ defects before release" },
    ],
  },
  {
    version: "v1.0",
    date: "2018 — 2019",
    role: "Junior QA Analyst",
    company: "Company Name",
    tag: "initial",
    changes: [
      { type: "added", text: "Wrote manual test plans for mobile banking features" },
      { type: "added", text: "Learned that the edge case is usually the main case" },
    ],
  },
] as const;

export type ProjectKind = "PM" | "QA" | "PM + QA";

// Projects are shown as tickets on a board.
export const projects: {
  id: string;
  title: string;
  kind: ProjectKind;
  priority: "P0" | "P1" | "P2";
  summary: string;
  outcome: { label: string; value: string }[];
  tags: string[];
  href?: string;
}[] = [
  {
    id: "PRJ-101",
    title: "Fintech app relaunch",
    kind: "PM + QA",
    priority: "P0",
    summary:
      "Led a 14-person team through a full mobile app rebuild with a hard regulatory deadline. Owned the plan and the test strategy.",
    outcome: [
      { label: "Launch", value: "On date" },
      { label: "Crash-free", value: "99.8%" },
    ],
    tags: ["Scrum", "Playwright", "Appium"],
  },
  {
    id: "PRJ-087",
    title: "E-commerce checkout automation",
    kind: "QA",
    priority: "P1",
    summary:
      "Designed a data-driven automation framework for checkout flows across 6 payment providers, wired into CI.",
    outcome: [
      { label: "Coverage", value: "92%" },
      { label: "Runtime", value: "−70%" },
    ],
    tags: ["Cypress", "GitHub Actions", "Postman"],
  },
  {
    id: "PRJ-064",
    title: "ERP rollout for logistics client",
    kind: "PM",
    priority: "P0",
    summary:
      "Ran a phased ERP rollout across 4 warehouses — vendor coordination, cutover planning and user training.",
    outcome: [
      { label: "Budget", value: "−6% under" },
      { label: "Sites live", value: "4 / 4" },
    ],
    tags: ["Waterfall", "MS Project", "UAT"],
  },
  {
    id: "PRJ-052",
    title: "API performance hardening",
    kind: "QA",
    priority: "P1",
    summary:
      "Load-tested a public API ahead of a marketing launch, found the bottlenecks and verified the fixes under 10× traffic.",
    outcome: [
      { label: "p95 latency", value: "−58%" },
      { label: "Peak RPS", value: "12k" },
    ],
    tags: ["k6", "Grafana", "JMeter"],
  },
  {
    id: "PRJ-039",
    title: "Agile transformation",
    kind: "PM",
    priority: "P2",
    summary:
      "Moved three teams from ad-hoc delivery to two-week sprints with shared definitions of ready and done.",
    outcome: [
      { label: "Velocity", value: "+35%" },
      { label: "Predictability", value: "88%" },
    ],
    tags: ["Scrum", "Jira", "Coaching"],
  },
  {
    id: "PRJ-021",
    title: "Healthcare portal compliance testing",
    kind: "PM + QA",
    priority: "P1",
    summary:
      "Planned and executed accessibility and security test cycles for a patient portal before audit.",
    outcome: [
      { label: "WCAG", value: "AA pass" },
      { label: "Audit", value: "0 findings" },
    ],
    tags: ["axe", "OWASP ZAP", "TestRail"],
  },
];

export const pipeline = [
  { step: "Discover", detail: "Goals, users, constraints, and what success is measured by." },
  { step: "Plan", detail: "Roadmap, estimates, owners, risks and the test strategy — together." },
  { step: "Build", detail: "Short sprints, visible boards, blockers cleared daily." },
  { step: "Verify", detail: "Automated regressions, exploratory sessions, performance checks." },
  { step: "Release", detail: "Go/no-go with real data, staged rollout, monitoring in place." },
  { step: "Retro", detail: "What we learned becomes a change in the next sprint." },
];

export const tools = [
  "Jira",
  "Confluence",
  "Trello",
  "Asana",
  "MS Project",
  "Notion",
  "Playwright",
  "Cypress",
  "Selenium",
  "Appium",
  "Postman",
  "TestRail",
  "JMeter",
  "k6",
  "GitHub Actions",
  "Jenkins",
  "SQL",
  "Figma",
];

export const certifications = [
  { name: "PMP", issuer: "Project Management Institute", year: "2023" },
  { name: "ISTQB Advanced Test Manager", issuer: "ISTQB", year: "2022" },
  { name: "Professional Scrum Master I", issuer: "Scrum.org", year: "2021" },
  { name: "ISTQB Foundation Level", issuer: "ISTQB", year: "2019" },
];

export const testimonials = [
  {
    quote:
      "The calmest person in the room on release day — because the hard questions had already been asked weeks earlier.",
    name: "Colleague Name",
    title: "Engineering Manager, Company",
  },
  {
    quote:
      "Bug reports so clear our devs started asking to be assigned them. Our escaped defects dropped to almost nothing.",
    name: "Colleague Name",
    title: "CTO, Company",
  },
];
