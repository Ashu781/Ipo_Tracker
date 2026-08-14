import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

function money(value) {
  if (value === null || value === undefined) return "—";
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

function IpoCard({ ipo }) {
  return (
    <article className="ipo-card">
      <div className="ipo-card-top">
        <div>
          <h3>{ipo.companyName}</h3>
          <p className="muted">{ipo.ipoName}</p>
        </div>
        <StatusBadge status={ipo.status} />
      </div>

      <div className="metrics">
        <div>
          <span>Issue Price</span>
          <strong>{money(ipo.issuePrice)}</strong>
        </div>
        <div>
          <span>GMP</span>
          <strong className="gmp">{money(ipo.gmp)}</strong>
        </div>
        <div>
          <span>Est. Listing</span>
          <strong>{money(ipo.estimatedListingPrice)}</strong>
        </div>
        <div>
          <span>Est. Gain</span>
          <strong className="gain">
            {ipo.estimatedGainPercent !== null
              ? `${ipo.estimatedGainPercent}%`
              : "—"}
          </strong>
        </div>
      </div>

      <div className="ipo-card-bottom">
        <span>
          Open: {ipo.openDate ? new Date(ipo.openDate).toLocaleDateString("en-IN") : "—"}
        </span>

        <Link to={`/ipo/${ipo.id}`} className="details-link">
          View details →
        </Link>
      </div>
    </article>
  );
}

export default IpoCard;
