import { navigationItems } from "../data/siteContent";
import Button from "./Button";

export default function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Curated Culinary Creations home">
        <span className="brand-mark">CCC</span>
        <span>Curated Culinary Creations</span>
      </a>

      <nav className="site-nav" aria-label="Site navigation">
        {navigationItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <Button href="#reservations">Book Now</Button>
    </header>
  );
}
