import { useEffect, useState } from "react";
import IpoCard from "../components/IpoCard";
import Loading from "../components/Loading";
import { fetchIpos } from "../services/api";

function Dashboard() {
  const [ipos, setIpos] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        const data = await fetchIpos(status);
        setIpos(data);
      } catch (err) {
        setError("Could not load IPO data. Is the backend running?");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [status]);

  return (
    <main className="container">
      <section className="hero">
        <div>
          <p className="eyebrow">INDIAN IPO TRACKER</p>
          <h1>Latest IPOs & GMP</h1>
          <p className="hero-text">
            Track IPO issue details, indicative GMP, estimated listing price,
            subscription data and GMP history.
          </p>
        </div>

        <div className="disclaimer">
          GMP is unofficial and indicative. It is not an exchange-confirmed
          listing price.
        </div>
      </section>

      <section className="toolbar">
        <div>
          <h2>IPO Dashboard</h2>
          <p className="muted">{ipos.length} IPOs shown</p>
        </div>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          <option value="OPEN">Open</option>
          <option value="UPCOMING">Upcoming</option>
          <option value="LISTED">Listed</option>
        </select>
      </section>

      {loading && <Loading />}

      {error && <div className="error">{error}</div>}

      {!loading && !error && (
        <section className="ipo-grid">
          {ipos.map((ipo) => (
            <IpoCard key={ipo.id} ipo={ipo} />
          ))}
        </section>
      )}
    </main>
  );
}

export default Dashboard;
