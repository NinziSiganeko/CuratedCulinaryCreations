export default function Button({ children, href = "#reservations", variant = "primary" }) {
  return (
    <a className={`button button-${variant}`} href={href}>
      {children}
    </a>
  );
}
