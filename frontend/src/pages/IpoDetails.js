import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import Loading from "../components/Loading";
import { fetchGmpHistory, fetchIpo } from "../services/api";

function money(value) {
  if (value === null || value === undefined) return "—";
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

function date(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-IN");
}

function IpoDetails() {
  const { id } = useParams();

  const [ipo, setIpo] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [ipoData, gmpData] = await Promise.all([
          fetchIpo(id),
          fetchGmpHistory(id)
        ]);

        setIpo(ipoData);
        setHistory(gmpData);
      } catch (err) {
        setError("Could not load this IPO.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return (
      <main className="container">
        <Loading />
      </main>
    );
  }

  if (error || !ipo) {
    return (
      <main className="container">
        <div className="error">{error || "IPO not found."}</div>
      </main>
    );
  }

  return (
    <main className="container details-page">
      <Link to="/" className="back-link">
        ← Back to dashboard
      </Link>

      <section className="details-header">
        <div>
          <p className="eyebrow">IPO DETAILS</p>
          <h1>{ipo.companyName}</h1>
          <p className="muted">{ipo.ipoName}</p>
        </div>
        <StatusBadge status={ipo.status} />
      </section>

      <section className="highlight-grid">
        <div className="highlight">
          <span>Issue Price</span>
          <strong>{money(ipo.issuePrice)}</strong>
        </div>
        <div className="highlight">
          <span>Current GMP</span>
          <strong className="gmp">{money(ipo.gmp)}</strong>
        </div>
        <div className="highlight">
          <span>Estimated Listing</span>
          <strong>{money(ipo.estimatedListingPrice)}</strong>
        </div>
        <div className="highlight">
          <span>Estimated Gain</span>
          <strong className="gain">
            {ipo.estimatedGainPercent !== null
              ? `${ipo.estimatedGainPercent}%`
              : "—"}
          </strong>
        </div>
      </section>

      <section className="content-grid">
        <div className="panel">
          <h2>IPO Information</h2>
          <div className="info-grid">
            <div><span>Open Date</span><strong>{date(ipo.openDate)}</strong></div>
            <div><span>Close Date</span><strong>{date(ipo.closeDate)}</strong></div>
            <div><span>Listing Date</span><strong>{date(ipo.listingDate)}</strong></div>
            <div><span>Lot Size</span><strong>{ipo.lotSize || "—"}</strong></div>
            <div><span>Issue Size</span><strong>{ipo.issueSizeCrore ? `₹${ipo.issueSizeCrore} Cr` : "—"}</strong></div>
            <div><span>Fresh Issue</span><strong>{ipo.freshIssueCrore ? `₹${ipo.freshIssueCrore} Cr` : "—"}</strong></div>
            <div><span>OFS</span><strong>{ipo.ofsCrore ? `₹${ipo.ofsCrore} Cr` : "—"}</strong></div>
          </div>
        </div>

        <div className="panel">
          <h2>Subscription</h2>
          {ipo.subscription ? (
            <div className="subscription-grid">
              <div><span>Retail</span><strong>{ipo.subscription.retail}x</strong></div>
              <div><span>NII</span><strong>{ipo.subscription.nii}x</strong></div>
              <div><span>QIB</span><strong>{ipo.subscription.qib}x</strong></div>
              <div><span>Employee</span><strong>{ipo.subscription.employee}x</strong></div>
            </div>
          ) : (
            <p className="muted">Subscription data unavailable.</p>
          )}
        </div>
      </section>

      <section className="panel">
        <h2>GMP History</h2>

        {history.length === 0 ? (
          <p className="muted">No GMP history available.</p>
        ) : (
          <div className="gmp-history">
            {history.map((item) => (
              <div className="history-row" key={item.id}>
                <span>{date(item.recordedAt)}</span>
                <div className="history-bar">
                  <div
                    className="history-fill"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(5, (item.gmp / Math.max(...history.map((h) => h.gmp))) * 100)
                      )}%`
                    }}
                  />
                </div>
                <strong>{money(item.gmp)}</strong>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default IpoDetails;
