import Button from "../components/Button";

export default function Home() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <p className="eyebrow">Savor the Fusion of Flavors</p>
        <h1>Curated Culinary Creations</h1>
        <p>
          Bespoke dining, crafted menus, and memorable food experiences for intimate
          celebrations, private dinners, and special events.
        </p>
        <div className="hero-actions">
          <Button href="#menus">View Menus</Button>
          <Button href="#online-orders" variant="secondary">
            Order Online
          </Button>
        </div>
      </div>
    </section>
  );
}
