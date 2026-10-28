import React, { useState } from "react";

const timeSlots = ["8:00 AM", "8:15 AM", "8:30 AM", "8:45 AM", "9:00 AM", "9:15 AM", "9:30 AM", "9:45 AM"];
const eveningSlots = ["5:30 PM", "5:45 PM", "6:00 PM", "6:15 PM", "6:30 PM", "6:45 PM", "7:00 PM", "7:15 PM"];
const today = new Date().toISOString().slice(0, 10);

function ReservationsScreen() {
  const [partySize, setPartySize] = useState("2 guests");
  const [date, setDate] = useState(today);
  const [time, setTime] = useState("8:00 AM");
  const [submitted, setSubmitted] = useState(false);
  const slots = [...timeSlots, ...eveningSlots];
  return <div className="reservation-page page-container">
    <div className="breadcrumbs">
      <a href="/">Home</a>
      <span>›</span>
      <span>Reservations</span>
    </div>
    <header className="reservation-heading">
      <p className="eyebrow">We look forward to welcoming you</p>
      <h1>Request a reservation</h1>
      <p>Select your details and we'll try to get the best seats for you.</p>
    </header>
    <form className="reservation-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
      <div className="reservation-fields">
        <label>
          Party size
          <select value={partySize} onChange={(event) => setPartySize(event.target.value)}>
            {Array.from({ length: 8 }, (_, index) => `${index + 1} ${index === 0 ? "guest" : "guests"}`).map((size) => (
              <option key={size}>{size}</option>
            ))}
          </select>
        </label>
        <label>
          Date
          <input type="date" min={today} value={date} onChange={(event) => { setDate(event.target.value); setSubmitted(false); }} required />
        </label>
        <label>
          Time
          <select value={time} onChange={(event) => setTime(event.target.value)}>
            {slots.map((slot) => (
              <option key={slot}>{slot}</option>
            ))}
          </select>
        </label>
      </div>
      {[timeSlots, eveningSlots].map((group, groupIndex) => (
        <section className="reservation-slots" key={groupIndex}>
          <h2>{groupIndex === 0 ? "Choose an available time slot" : "Additional seating"}</h2>
          <div className="slot-grid">
            {group.map((slot, index) => (
              <button
                type="button"
                key={slot}
                className={`${time === slot ? "chosen" : ""} ${index === 2 || index === 5 ? "popular" : ""}`}
                onClick={() => { setTime(slot); setSubmitted(false); }}
              >
                {slot}
              </button>
            ))}
          </div>
        </section>
      ))}
      <button className="button button-primary reservation-submit" type="submit">
        Request Now
      </button>
      {submitted && (
        <p className="reservation-confirmation" role="status">
          Thanks! Your request for {partySize} on {date} at {time} has been received. We'll be in touch to confirm.
        </p>
      )}
    </form>
    <div className="reservation-contact">
      <p>Serving Cape Town, Johannesburg, Durban &amp; beyond.</p>
      <p>Questions? <a href="mailto:hello@curatedculinarycreations.com">Get in touch</a></p>
    </div>
  </div>;
}

export default ReservationsScreen;
