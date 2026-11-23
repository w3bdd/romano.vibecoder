// Consistent section header: small mono eyebrow, big serif title,
// optional lead paragraph. Keeps every page visually related.
export default function SectionHead({ eyebrow, title, lead, center = false }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p className="mono text-[11px] tracking-[0.25em] text-accent uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display mt-3 text-3xl sm:text-4xl font-medium tracking-tight">
        {title}
      </h2>
      {lead && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{lead}</p>
      )}
    </div>
  );
}
