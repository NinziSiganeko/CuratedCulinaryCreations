import SectionHeader from "../components/SectionHeader";
import { experiences } from "../data/siteContent";

export default function Experiences() {
  return (
    <section className="content-section" id="experiences">
      <SectionHeader eyebrow="Experiences" title="Food-led events with a personal point of view">
        Curated formats for guests who want the meal to feel considered from arrival to dessert.
      </SectionHeader>
      <div className="experience-list">
        {experiences.map((experience) => (
          <article key={experience}>
            <span />
            <h3>{experience}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
