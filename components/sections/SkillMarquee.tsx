import { skills } from "@/lib/data";
import { accentStyle } from "@/lib/accents";

function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="marquee-track gap-3 pr-3" aria-hidden={hidden || undefined}>
      {skills.map((skill, index) => (
        <li
          key={skill}
          style={accentStyle(index)}
          className="chip flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap"
        >
          <span className="accent-bg size-1.5 rounded-full" />
          {skill}
        </li>
      ))}
    </ul>
  );
}

export function SkillMarquee() {
  return (
    <div className="border-y border-line bg-void/40 py-5 backdrop-blur-sm">
      <div className="marquee">
        <Track />
        <Track hidden />
      </div>
    </div>
  );
}
