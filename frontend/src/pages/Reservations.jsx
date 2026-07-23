import Button from "../components/Button";
import SectionHeader from "../components/SectionHeader";

export default function Reservations() {
  return (
    <section className="content-section reservation-section" id="reservations">
      <SectionHeader eyebrow="Reservations" title="Plan a table, tasting, or private event">
        Share your preferred date, guest count, and the kind of experience you have in mind.
      </SectionHeader>
      <form className="reservation-form">
        <label>
          Name
          <input type="text" name="name" placeholder="Your name" />
        </label>
        <label>
          Email
          <input type="email" name="email" placeholder="you@example.com" />
        </label>
        <label>
          Occasion
          <select name="occasion" defaultValue="">
            <option value="" disabled>
              Select an option
            </option>
            <option>Private dinner</option>
            <option>Celebration</option>
            <option>Corporate event</option>
            <option>Cooking experience</option>
          </select>
        </label>
        <Button href="mailto:hello@curatedculinarycreations.example">Send Request</Button>
      </form>
    </section>
  );
}
