"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";

type ToggleOption = {
  label: string;
  value: string;
  hint?: string;
};

type Opportunity = {
  title: string;
  description: string;
  tags: string[];
};

const stageOptions: ToggleOption[] = [
  { label: "Pre-launch validation", value: "pre-launch validation" },
  { label: "Early revenue", value: "early revenue traction" },
  { label: "Scale-up", value: "scaling recurring revenue" },
  { label: "Enterprise expansion", value: "enterprise expansion" },
];

const revenueModels: ToggleOption[] = [
  { label: "Subscription tiers", value: "multi-tier subscription" },
  { label: "Usage based", value: "usage-based billing" },
  { label: "Marketplace fees", value: "marketplace commission model" },
  { label: "Licensing", value: "licensing agreements" },
  { label: "Ads & sponsors", value: "high-value sponsorship and ads" },
  { label: "Hybrid mix", value: "hybrid monetization mix" },
];

const growthLevers: ToggleOption[] = [
  { label: "Freemium to paid", value: "freemium-to-paid conversion" },
  { label: "Upsell ladders", value: "progressive upsell ladders" },
  { label: "Retention loops", value: "retention and engagement loops" },
  { label: "Ecosystem bundles", value: "ecosystem bundling opportunities" },
  { label: "Partner channels", value: "partner-driven monetization channels" },
  { label: "AI automation", value: "AI-powered monetization experiments" },
];

const toneOptions: ToggleOption[] = [
  { label: "Data-driven", value: "data-driven and analytical" },
  { label: "Visionary", value: "visionary and inspirational" },
  { label: "Practical", value: "practical and execution-focused" },
  { label: "Bold", value: "bold, challenger mindset" },
];

const insightModes: ToggleOption[] = [
  { label: "Pricing psychology", value: "pricing psychology insights" },
  { label: "Unit economics", value: "unit economics modeling" },
  { label: "Activation journey", value: "activation journey breakdown" },
  { label: "Retention cohorts", value: "retention cohort mapping" },
  { label: "Growth experiments", value: "prioritized experiment backlog" },
  { label: "Narrative arcs", value: "monetization storytelling angles" },
];

const opportunities: Opportunity[] = [
  {
    title: "Value metric clarity",
    description:
      "Align pricing with the first undeniable moment of value. Reveal metrics that prove monetization traction.",
    tags: ["Pricing", "Signals", "Analytics"],
  },
  {
    title: "Audience segmentation",
    description:
      "Split demand into monetizable personas with tailored willingness-to-pay profiles and tier logic.",
    tags: ["ICP", "Packaging", "Positioning"],
  },
  {
    title: "Lifecycle automation",
    description:
      "Trigger cross-sell and expansion plays off leading indicators, orchestrated by AI workflows.",
    tags: ["Lifecycle", "Automation"],
  },
];

const bullet = (label: string, value?: string) =>
  value ? `- ${label}: ${value}` : undefined;

const mergeParagraphs = (content: (string | undefined)[]) =>
  content.filter(Boolean).join("\n");

const combineChips = (values: string[]) => values.join(", ");

const stageDisplay = (stages: string[]) =>
  stages
    .map((entry) => {
      if (entry === "early revenue traction") {
        return "early revenue traction";
      }
      return entry;
    })
    .join(", ");

const useToggleState = (
  initial: string[]
): [string[], (next: string) => void, () => void] => {
  const [value, setValue] = useState(initial);
  const handleToggle = (next: string) => {
    setValue((current) =>
      current.includes(next)
        ? current.filter((item) => item !== next)
        : [...current, next]
    );
  };

  const clear = () => setValue([]);

  return [value, handleToggle, clear];
};

export default function Home() {
  const [productName, setProductName] = useState("LumenCast");
  const [productDescription, setProductDescription] = useState(
    "AI storytelling control center that turns founder interviews into multi-channel conversion funnels."
  );
  const [audience, setAudience] = useState(
    "Bootstrapped SaaS founders and fractional CMOs building authority-led demand engines."
  );
  const [stage, toggleStage, resetStage] = useToggleState([
    "early revenue traction",
  ]);
  const [revenueMix, toggleRevenue, resetRevenue] = useToggleState([
    "multi-tier subscription",
    "hybrid monetization mix",
  ]);
  const [northStar, setNorthStar] = useState(
    "Unlock $120k in net-new ARR within 2 quarters while maintaining cash efficiency."
  );
  const [differentiator, setDifferentiator] = useState(
    "Dynamic AI narrative engines that remix customer proof into personalized monetization sequences."
  );
  const [growthFocus, toggleGrowth, resetGrowth] = useToggleState([
    "freemium-to-paid conversion",
    "progressive upsell ladders",
    "retention and engagement loops",
  ]);
  const [tone, toggleTone, resetTone] = useToggleState([
    "data-driven and analytical",
  ]);
  const [insights, toggleInsight, resetInsights] = useToggleState([
    "pricing psychology insights",
    "prioritized experiment backlog",
  ]);
  const [guardrails, setGuardrails] = useState(
    "Respect CAC payback under 4 months, maintain >40% contribution margins."
  );
  const [successSignal, setSuccessSignal] = useState(
    "Weekly monetization command-center summary with experiment lift projections."
  );
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(() => {
    const context = mergeParagraphs([
      bullet("Product", productName),
      bullet("Narrative snapshot", productDescription),
      bullet("Stage focus", stageDisplay(stage)),
      bullet("Audience", audience),
      bullet("Monetization mix", combineChips(revenueMix)),
      bullet("Differentiator", differentiator),
      bullet("Primary objective", northStar),
      bullet("Guardrails", guardrails),
    ]);

    const analysis = mergeParagraphs([
      growthFocus.length
        ? `Prioritize these levers: ${combineChips(growthFocus)}.`
        : undefined,
      insights.length
        ? `Deliverable must include ${combineChips(insights)}.`
        : undefined,
      successSignal
        ? `Signal success by outputting: ${successSignal}.`
        : undefined,
    ]);

    const personality =
      tone.length > 0
        ? `Adopt a tone that feels ${combineChips(
            tone
          )} while staying commercially grounded.`
        : "";

    return mergeParagraphs([
      "You are an elite fractional Chief Revenue Officer and monetization architect.",
      "",
      "Context briefing:",
      context,
      "",
      "Instructions:",
      "- Map the revenue stack across acquisition, activation, expansion, and retention.",
      "- Design experiment-ready plays with measurable lift, sequencing, guardrails, and owner roles.",
      "- Surface pricing & packaging adjustments backed by behavioral signals.",
      "- Highlight strategic risks, assumptions, and the first 3 monetization bets to validate.",
      analysis ? `\n${analysis}` : undefined,
      personality,
      "",
      "Output format:",
      "- 3-part narrative: 1) Monetization thesis, 2) Experiment roadmap, 3) KPI instrumentation.",
      "- Include SMART targets, confidence levels, and expected payback windows.",
      "- End with an AI co-pilot workflow describing how the user should iterate the strategy.",
    ]);
  }, [
    audience,
    differentiator,
    guardrails,
    growthFocus,
    insights,
    productDescription,
    northStar,
    productName,
    revenueMix,
    stage,
    successSignal,
    tone,
  ]);

  const resetAll = () => {
    setProductName("");
    setProductDescription("");
    setAudience("");
    resetStage();
    resetRevenue();
    setNorthStar("");
    setDifferentiator("");
    resetGrowth();
    resetTone();
    resetInsights();
    setGuardrails("");
    setSuccessSignal("");
  };

  const handleCopy = async () => {
    try {
      if (typeof navigator === "undefined" || !navigator.clipboard) {
        return;
      }
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      console.error("Failed to copy prompt", error);
    }
  };

  return (
    <div className={styles.canvas}>
      <div className={styles.hero}>
        <div>
          <p className={styles.badge}>Monetization prompt studio</p>
          <h1 className={styles.title}>
            Spin up investor-grade revenue prompts in minutes.
          </h1>
          <p className={styles.subtitle}>
            Feed the generator with sharp context and receive a synthesized AI
            brief that keeps monetization copilots locked on revenue lift.
          </p>
        </div>
        <button type="button" className={styles.resetButton} onClick={resetAll}>
          Reset scenario
        </button>
      </div>

      <div className={styles.contentGrid}>
        <section className={styles.panel}>
          <h2>1. Core snapshot</h2>
          <div className={styles.fieldGroup}>
            <label>Product / initiative</label>
            <input
              value={productName}
              onChange={(event) => setProductName(event.target.value)}
              placeholder="Product codename"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label>How would you pitch it in one sentence?</label>
            <textarea
              rows={3}
              value={productDescription}
              onChange={(event) => setProductDescription(event.target.value)}
              placeholder="Describe what the product enables and the revenue upside."
            />
          </div>
          <div className={styles.fieldGroup}>
            <label>Ideal customer pulse</label>
            <textarea
              rows={2}
              value={audience}
              onChange={(event) => setAudience(event.target.value)}
              placeholder="Name the buyer persona and their monetizable pain."
            />
          </div>
          <div className={styles.fieldGroup}>
            <label>Growth stage</label>
            <div className={styles.toggleRow}>
              {stageOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggleStage(option.value)}
                  className={`${styles.toggleChip} ${
                    stage.includes(option.value) ? styles.toggleChipActive : ""
                  }`}
                >
                  <span>{option.label}</span>
                  {option.hint && <small>{option.hint}</small>}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <label>Primary revenue plays</label>
            <div className={styles.toggleRow}>
              {revenueModels.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggleRevenue(option.value)}
                  className={`${styles.toggleChip} ${
                    revenueMix.includes(option.value) ? styles.toggleChipActive : ""
                  }`}
                >
                  <span>{option.label}</span>
                  {option.hint && <small>{option.hint}</small>}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.panel}>
          <h2>2. Monetization edges</h2>
          <div className={styles.fieldGroup}>
            <label>North-star outcome</label>
            <textarea
              rows={2}
              value={northStar}
              onChange={(event) => setNorthStar(event.target.value)}
              placeholder="What would exceptional revenue lift look like?"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label>Why we win</label>
            <textarea
              rows={2}
              value={differentiator}
              onChange={(event) => setDifferentiator(event.target.value)}
              placeholder="Surface the monetization advantage or leverage point."
            />
          </div>
          <div className={styles.fieldGroup}>
            <label>Levers to pressure-test</label>
            <div className={styles.toggleRow}>
              {growthLevers.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggleGrowth(option.value)}
                  className={`${styles.toggleChip} ${
                    growthFocus.includes(option.value)
                      ? styles.toggleChipActive
                      : ""
                  }`}
                >
                  <span>{option.label}</span>
                  {option.hint && <small>{option.hint}</small>}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <label>Guardrails & constraints</label>
            <textarea
              rows={2}
              value={guardrails}
              onChange={(event) => setGuardrails(event.target.value)}
              placeholder="Budget limits, compliance boundaries, team capacity, etc."
            />
          </div>
          <div className={styles.fieldGroup}>
            <label>Insight instrumentation</label>
            <div className={styles.toggleRow}>
              {insightModes.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggleInsight(option.value)}
                  className={`${styles.toggleChip} ${
                    insights.includes(option.value) ? styles.toggleChipActive : ""
                  }`}
                >
                  <span>{option.label}</span>
                  {option.hint && <small>{option.hint}</small>}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <label>Preferred tone</label>
            <div className={styles.toggleRow}>
              {toneOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggleTone(option.value)}
                  className={`${styles.toggleChip} ${
                    tone.includes(option.value) ? styles.toggleChipActive : ""
                  }`}
                >
                  <span>{option.label}</span>
                  {option.hint && <small>{option.hint}</small>}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <label>Success signal</label>
            <input
              value={successSignal}
              onChange={(event) => setSuccessSignal(event.target.value)}
              placeholder="Define what a strong output looks like."
            />
          </div>
        </section>

        <section className={styles.panel}>
          <h2>3. Strategy radar</h2>
          <p className={styles.panelLead}>
            Anchor your thinking on these monetization opportunity signals.
          </p>
          <div className={styles.opportunityGrid}>
            {opportunities.map((item) => (
              <div key={item.title} className={styles.opportunityCard}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className={styles.tagRow}>
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={`${styles.panel} ${styles.promptPanel}`}>
          <div className={styles.promptHeader}>
            <div>
              <h2>4. Generated AI prompt</h2>
              <p className={styles.panelLead}>
                Drop this into your monetization copilot or GPT workspace.
              </p>
            </div>
            <button
              type="button"
              className={styles.copyButton}
              onClick={handleCopy}
            >
              {copied ? "Copied!" : "Copy prompt"}
            </button>
          </div>
          <pre className={styles.promptPreview}>{prompt}</pre>
          {productDescription && (
            <div className={styles.contextNote}>
              <h4>Product narrative</h4>
              <p>{productDescription}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
