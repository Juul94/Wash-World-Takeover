import { Link } from "react-router-dom";

export default function NoFoundPage() {
  return (
    <div className="container text-center">
      <h2 className="mb-4">OBS: Siden blev desværre ikke fundet</h2>
      <Link to="/" className="link_style_error">
        Vælg en lokation
      </Link>
    </div>
  );
}
