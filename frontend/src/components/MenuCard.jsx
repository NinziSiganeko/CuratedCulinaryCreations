export default function MenuCard({ title, description, price }) {
  return (
    <article className="menu-card">
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <strong>{price}</strong>
    </article>
  );
}
