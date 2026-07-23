import Button from "../components/Button";
import SectionHeader from "../components/SectionHeader";

export default function Subscriptions() {
  return (
    <section className="content-section subscription-section" id="subscriptions">
      <SectionHeader eyebrow="My Subscriptions" title="Recurring curated food moments">
        Keep a regular rhythm of seasonal boxes, supper-club seats, or hosted tasting menus.
      </SectionHeader>
      <Button href="#reservations">Discuss a Subscription</Button>
    </section>
  );
}
