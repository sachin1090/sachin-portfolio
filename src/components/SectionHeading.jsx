import Reveal from './Reveal';

export default function SectionHeading({ index, eyebrow, title, description }) {
  return (
    <Reveal className="mb-14 md:mb-20">
      <div className="flex items-center gap-3">
        {index && <span className="eyebrow text-brand tabular-nums">{index}</span>}
        <span className="eyebrow text-faint">{eyebrow}</span>
        <span className="rule-fade h-px flex-1" />
      </div>

      <h2 className="mt-6 text-3xl font-semibold tracking-tight text-title sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
        {title}
      </h2>

      {description && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-body md:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
