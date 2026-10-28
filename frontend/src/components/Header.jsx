import React from "react";
import logoImage from "../../images/culinarycreationslogo.png";

const navigation = [
  ["/", "Home"], ["/online-orders", "Online Orders"], ["/menus", "Menus"],
  ["/reservations", "Reservations"], ["/experiences", "Experiences"], ["/subscriptions", "My Subscriptions"],
];

function Header() {
  const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
  return <header className="site-header">
    <div className="header-inner">
    <a className="wordmark" href="/" aria-label="Curated Culinary Creations home">
      <img src={logoImage} alt="" />
      <span>Curated<br />Culinary<br />Creations</span></a>
    <nav className="site-nav" aria-label="Main navigation">{navigation.map(([href, label]) =>
        <a key={href} href={href} className={`nav-link${(href === "/" ? currentPath === "/" || currentPath === "/home" : currentPath === href) ? " active" : ""}`} aria-current={(href === "/" ? currentPath === "/" || currentPath === "/home" : currentPath === href) ? "page" : undefined}>{label}</a>)}</nav>
    <div className="header-actions">
      <a className="login-link" href="/subscriptions">
        <span aria-hidden="true">♙</span> Log In</a>
      <a className="button button-primary header-book" href="/reservations">Book Now</a>
    </div>
  </div>
  </header>;
}

export default Header;
