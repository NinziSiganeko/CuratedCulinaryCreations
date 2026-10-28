import React, { useMemo, useState } from "react";
import onlineOrderingImage from "../../images/onlineorderingscreenimg1.png";
import { getMenuImage, menuSections, zar } from "../data/menuItems.js";

function OnlineOrdersScreen() {
  const [mode, setMode] = useState("Pickup");
  const [cart, setCart] = useState({});
  const [notice, setNotice] = useState("");
  const items = useMemo(() => menuSections.flatMap((section) => section.items), []);
  const count = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  const total = items.reduce((sum, item) => sum + Number(item.price) * (cart[item.name] || 0), 0);
  const changeItem = (name, delta) => setCart((current) => ({ ...current, [name]: Math.max(0, (current[name] || 0) + delta) }));

  return <div className="order-page page-container">
    <div className="order-banner">
      <img src={onlineOrderingImage} alt="Freshly prepared food ready to enjoy" />
    </div>
    <header className="order-heading">
      <p className="eyebrow">The good stuff, wherever you are</p>
      <h1>Online Ordering</h1>
      <p>You can order online! Browse our menu items and choose what you'd like to order from us.</p>
      <span className="accepting"><i /> Accepting Orders</span>
    </header>
    <section className="order-options">
      <div className="order-mode-tabs" aria-label="Order type">
        {["Pickup", "Delivery"].map((option) => (
          <button
            key={option}
            className={mode === option ? "selected" : ""}
            onClick={() => setMode(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="order-option-details">
        <strong>
          {mode === "Pickup" ? "Pickup time: Up to 30 minutes" : "Delivery time: 45–60 minutes"}
        </strong>
        <span>Address: 500 Terry Francine Street, San Francisco, CA 94158</span>
        <button className="text-button" onClick={() => setNotice("Confirm your address when placing your order.")}>
          Change
        </button>
      </div>
    </section>
    <nav className="order-category-nav" aria-label="Menu categories">
      {menuSections.map((section) => (
        <a href={`#order-${section.title.toLowerCase()}`} key={section.title}>
          {section.title}
        </a>
      ))}
    </nav>
    <div className="order-layout">
      <div className="order-menu-list">
        {menuSections.map((section) => (
          <section className="order-section" id={`order-${section.title.toLowerCase()}`} key={section.title}>
            <header>
              <h2>{section.title}</h2>
              <p>{section.note}</p>
            </header>
            <div className="order-items">
              {section.items.map((item) => (
                <article className="order-item" key={item.name}>
                  <div className="order-item-copy">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    {item.tag && <span className="dish-tag">{item.tag}</span>}
                    <strong>{zar(item.price)}</strong>
                  </div>
                  <div className="order-item-image">
                    <img src={getMenuImage(item.image)} alt={item.name} />
                    {cart[item.name] ? (
                      <div className="quantity-control">
                        <button
                          onClick={() => changeItem(item.name, -1)}
                          aria-label={`Remove one ${item.name}`}
                        >
                          −
                        </button>
                        <span>{cart[item.name]}</span>
                        <button
                          onClick={() => changeItem(item.name, 1)}
                          aria-label={`Add one ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        className="add-item"
                        onClick={() => changeItem(item.name, 1)}
                        aria-label={`Add ${item.name}`}
                      >
                        +
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
      <aside className="order-cart">
        <h2>Your Order</h2>
        <p>{mode} · {count} {count === 1 ? "item" : "items"}</p>
        {count === 0 ? (
          <div className="cart-empty">
            Your basket is empty.<br />
            Add something delicious to get started.
          </div>
        ) : (
          <>
            <div className="cart-lines">
              {items.filter((item) => cart[item.name]).map((item) => (
                <div key={item.name}>
                  <span>{cart[item.name]} × {item.name}</span>
                  <strong>{zar((Number(item.price) * cart[item.name]).toFixed(2))}</strong>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <span>Subtotal</span>
              <strong>{zar(total.toFixed(2))}</strong>
            </div>
            <button
              className="button button-primary cart-checkout"
              onClick={() => setNotice("Your order is ready to review. Please call us to complete payment.")}
            >
              Continue · {zar(total.toFixed(2))}
            </button>
          </>
        )}
      </aside>
    </div>

    {notice && (
      <div className="inline-notice" role="status">
        {notice}
        <button onClick={() => setNotice("")} aria-label="Dismiss">×</button>
      </div>
    )}
    <div className="menu-footer-note">Built on good food and good company</div>
  </div>;
}

export default OnlineOrdersScreen;
