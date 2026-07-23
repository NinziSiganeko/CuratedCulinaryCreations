import MenuCard from "../components/MenuCard";
import SectionHeader from "../components/SectionHeader";
import { menuHighlights } from "../data/siteContent";

export default function Menus() {
  return (
    <section className="content-section" id="menus">
      <SectionHeader eyebrow="Menus" title="Menus built around the occasion">
        Each menu can be adapted for dietary needs, group size, and service style.
      </SectionHeader>
      <div className="menu-grid">
        {menuHighlights.map((item) => (
          <MenuCard key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}
