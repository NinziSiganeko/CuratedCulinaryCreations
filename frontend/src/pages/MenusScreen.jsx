import React from "react";
import { getMenuImage, menuSections, zar } from "../data/menuItems.js";

function MenusScreen() {
  return <div className="menu-page page-container">
    <header className="menu-page-heading">
      <p className="eyebrow">Fresh, seasonal, thoughtfully made</p>
      <h1>Dinner Menu</h1>
      <p>Our kitchen celebrates local ingredients and generous flavour.</p>
    </header>
    {menuSections.map((section) => <section className="menu-section" id={section.title.toLowerCase()} key={section.title}>
      <header className="menu-section-heading">
        <h2>{section.title}</h2>
        <p>{section.note}</p>
      </header>
      <div className="menu-photo-grid">
        {section.items.slice(0, 3).map((item) => (
          <article className="menu-photo-card" key={item.name}>
            <img src={getMenuImage(item.image)} alt={item.name} />
            <div className="menu-photo-caption">
              <strong>{item.name}</strong>
              <span>{zar(item.price)}</span>
            </div>
          </article>
        ))}
      </div>
      <div className="menu-detail-grid">
        {section.items.map((item) => (
          <article className="menu-detail" key={item.name}>
            <div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              {item.tag && <span className="dish-tag">{item.tag}</span>}
              <strong className="dish-price">{zar(item.price)}</strong>
            </div>
            <img src={getMenuImage(item.image)} alt="" />
          </article>
        ))}
      </div>
    </section>)}
    <div className="menu-footer-note">Built on good food and good company</div>
  </div>;
}

export default MenusScreen;
