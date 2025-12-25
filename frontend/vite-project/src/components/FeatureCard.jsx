export default function FeatureCard({ title, desc }) {
  return (
    <div className="feature-card">
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
}
