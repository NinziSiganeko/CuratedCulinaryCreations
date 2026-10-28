import React from "react";
import homeHeroImage from "../../images/homepagescreenimg1.png";
import homeFeatureImage from "../../images/homepagescreenimg2.png";
import homeFeatureImage2 from "../../images/homepagescreenimg3.png";

function HomeScreen() {
  return <div className="home-page">
    <section className="home-hero">
      <img className="home-hero-image" src={homeHeroImage} alt="A finely plated dish from our kitchen" />
      <div className="home-hero-shade" />
      <div className="home-hero-copy">
        <p className="eyebrow">Curated Culinary Creations</p>
        <h1>Bespoke<br />Gastronomic<br />Luxury</h1>
        <p>Merging Eastern craft with European grace and local spirit, tailored for your premium gathering.</p>
        <a className="button button-primary" href="/reservations">Book Today</a>
      </div>
    </section>
    <section className="home-feature">
      <div className="feature-copy">
        <p className="eyebrow">Gather beautifully</p>
        <h2>Event Experts</h2>
        <p>We provide an upscale dining atmosphere for your special occasion. Our crew excels in luxury service for intimate parties and business affairs, making sure every element is handled with meticulous care and style.</p>
        <a className="button button-outline" href="/reservations">Secure a Date</a>
      </div>
      <img src={homeFeatureImage} alt="A tasting plate from our kitchen" />
    </section>
    <section className="home-feature tasting-feature">
      <div className="feature-copy">
        <p className="eyebrow">A little of everything</p>
        <h2>Premier Tasting Menu</h2>
        <p>A high-end aromatic culinary voyage. Savour a unique selection of exotic herbs and expertly developed garden-to-table flavour infusions.</p>
        <a className="button button-outline" href="/menus">Find Out More</a>
      </div>
      <img src={homeFeatureImage2} alt="A selection of fine dining dishes" />
    </section>
  </div>;
}

export default HomeScreen;
