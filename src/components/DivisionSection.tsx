export default function DivisionSection() {
  return (
    <section
      id="studios"
      aria-labelledby="division-heading"
      className="
        w-full py-20 px-6 md:px-10
        bg-[#F3F4F6]
        border-t border-b border-[#E2E8F0]
      "
    >
      <div
        className="
          max-w-5xl mx-auto glass
          rounded-none
          grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-12
          p-8 md:p-14
          relative overflow-hidden
          reveal
        "
      >
        {/* Internal vertical divider (desktop) */}
        <div
          className="hidden md:block absolute top-0 bottom-0 bg-[#E2E8F0]"
          style={{ left: "58%", width: "0.5px" }}
          aria-hidden="true"
        />

        {/* ── Left: copy ─────────────────────────────────────────────── */}
        <div>
          <p className="font-mono text-[0.6875rem] font-medium tracking-[0.1em] uppercase text-[#0066FF] mb-4">
            Active Deployment: Division 01 — ZettaShift Studios
          </p>

          <h2
            id="division-heading"
            className="text-[clamp(1.5rem,2.5vw,2rem)] font-extrabold text-[#0A2540] tracking-[-0.03em] leading-[1.15] mb-2"
          >
            ZettaShift Studios
          </h2>

          <p className="text-[0.9375rem] font-semibold text-[#00D4B2] tracking-[-0.01em] mb-4">
            High-Performance Digital Infrastructure &amp; Cognitive Automation.
          </p>

          <p className="text-[0.9375rem] leading-[1.75] text-[#627D98] max-w-[54ch]">
            ZettaShift Studios translates advanced technology frameworks into
            client market growth. We construct production-grade web
            architecture, deploy autonomous AI worker agents, and
            programmatically engineer global search visibility.
          </p>
        </div>

        {/* ── Right: badge block ─────────────────────────────────────── */}
        <div className="flex flex-col gap-4 min-w-[160px]">
          <div className="status-pill font-mono w-fit">SYSTEM ONLINE</div>

          <dl className="font-mono text-[0.6875rem] text-[#627D98] leading-[1.9]">
            <dt className="sr-only">Division</dt>
            <dd>
              <strong className="text-[#0A2540] font-semibold">DIV/01</strong>
            </dd>
            <dt className="sr-only">Type</dt>
            <dd>Studio Operations</dd>
            <dt className="sr-only">Established</dt>
            <dd>
              <strong className="text-[#0A2540] font-semibold">EST. 2024</strong>
            </dd>
            <dt className="sr-only">Parent</dt>
            <dd>ZettaShift Corp.</dd>
          </dl>
        </div>
      </div>
    </section>
  );
}
