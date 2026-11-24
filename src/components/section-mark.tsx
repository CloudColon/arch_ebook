// Section mark above each landing heading: a gold roman numeral, a hairline and a label.
export function SectionMark({ n, children, className = "" }: { n: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={`mark ${className}`}>
      <span className="mark-n">{n}</span>
      <span className="mark-rule" aria-hidden />
      <span>{children}</span>
    </p>
  );
}
