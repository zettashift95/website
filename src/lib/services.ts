export interface Service {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string; // SVG path data or identifier
  color: string;
  features: string[];
  stats: { label: string; value: string }[];
}

export const SERVICES: Service[] = [
  {
    slug: "website-development",
    title: "Website Development",
    tagline: "Bespoke digital experiences built for performance and conversion.",
    description:
      "Bespoke digital experiences built with cutting-edge frameworks, optimized for performance and conversion. Every pixel is engineered with purpose, every interaction crafted with intent.",
    icon: "web",
    color: "#0066FF",
    features: [
      "Next.js & React architecture",
      "Sub-second Core Web Vitals",
      "Headless CMS integration",
      "Design system engineering",
      "API-first data architecture",
      "Accessibility WCAG 2.1 AA",
    ],
    stats: [
      { label: "Avg LCP", value: "0.8s" },
      { label: "Perf Score", value: "99/100" },
      { label: "Conversion lift", value: "+34%" },
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    tagline: "Data-driven strategies that scale your brand across every channel.",
    description:
      "Data-driven strategies to scale your brand's presence across search, social, and paid channels. We engineer growth systems, not one-off campaigns.",
    icon: "marketing",
    color: "#0066FF",
    features: [
      "Paid search and display",
      "Conversion rate optimization",
      "Attribution modeling",
      "Multi-channel funnel design",
      "Performance analytics stack",
      "Competitor intelligence",
    ],
    stats: [
      { label: "Avg ROAS", value: "6.2x" },
      { label: "CAC reduction", value: "41%" },
      { label: "Pipeline growth", value: "+280%" },
    ],
  },
  {
    slug: "social-media-management",
    title: "Social Media Management",
    tagline: "Strategic content that builds loyalty and drives real engagement.",
    description:
      "Strategic content creation and community management that builds loyalty and drives engagement. We treat your audience as a system to grow, not a metric to report.",
    icon: "social",
    color: "#00D4B2",
    features: [
      "Platform-native content strategy",
      "Community growth frameworks",
      "Influencer program design",
      "Real-time trend response",
      "Brand voice architecture",
      "Monthly performance reporting",
    ],
    stats: [
      { label: "Avg follower growth", value: "+180%" },
      { label: "Engagement rate", value: "4.8%" },
      { label: "Content output", value: "60/mo" },
    ],
  },
  {
    slug: "automations",
    title: "Automations",
    tagline: "Intelligent systems that eliminate manual bottlenecks.",
    description:
      "Streamline your workflows with intelligent systems that save time and eliminate manual bottlenecks. We map, rebuild, and automate your core operational processes.",
    icon: "automations",
    color: "#0066FF",
    features: [
      "Workflow audit and mapping",
      "n8n / Make / Zapier orchestration",
      "CRM and data pipeline automation",
      "Document and reporting automation",
      "Error monitoring and alerting",
      "Human-in-the-loop design",
    ],
    stats: [
      { label: "Hours saved/mo", value: "200+" },
      { label: "Error reduction", value: "94%" },
      { label: "ROI timeline", value: "6 weeks" },
    ],
  },
  {
    slug: "ai-marketing",
    title: "AI Marketing",
    tagline: "Machine learning that personalizes and predicts at scale.",
    description:
      "Leveraging machine learning models to personalize experiences and predict customer behavior at scale. We deploy AI as a growth multiplier, not a gimmick.",
    icon: "ai-marketing",
    color: "#00D4B2",
    features: [
      "Predictive lead scoring",
      "Dynamic content personalization",
      "Behavioral segmentation models",
      "Churn prediction and retention",
      "LLM-powered email and copy",
      "Experiment and test automation",
    ],
    stats: [
      { label: "Personalization lift", value: "+67%" },
      { label: "Churn reduction", value: "38%" },
      { label: "Time to insight", value: "48h" },
    ],
  },
  {
    slug: "ai-consulting",
    title: "AI Consulting",
    tagline: "Strategic AI roadmaps that turn potential into competitive advantage.",
    description:
      "Strategic guidance for organizations navigating AI adoption. We assess your infrastructure, identify high-ROI use cases, and design an implementation roadmap your team can actually execute.",
    icon: "ai-consulting",
    color: "#0066FF",
    features: [
      "AI readiness assessment",
      "Use-case prioritization matrix",
      "Model selection and evaluation",
      "Data strategy and governance",
      "Team training and enablement",
      "Vendor and tool advisory",
    ],
    stats: [
      { label: "Avg ROI identified", value: "8.4x" },
      { label: "Time to first deploy", value: "30 days" },
      { label: "Risk score reduction", value: "71%" },
    ],
  },
];

export const SERVICE_MAP = Object.fromEntries(SERVICES.map((s) => [s.slug, s]));
