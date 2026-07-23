import Button from "../components/Button";
import SectionHeader from "../components/SectionHeader";

export default function OnlineOrders() {
  return (
    <section className="content-section split-section" id="online-orders">
      <SectionHeader eyebrow="Online Orders" title="Prepared dishes for collection and delivery">
        Choose curated meals, boards, and desserts for weeknight hosting or planned gatherings.
      </SectionHeader>
      <div className="order-panel">
        <h3>Ordering Flow</h3>
        <p>Select your package, confirm dietary notes, and choose your preferred date.</p>
        <Button href="#reservations">Start an Enquiry</Button>
      </div>
    </section>
  );
}
