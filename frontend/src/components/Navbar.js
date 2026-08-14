import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand">
          IPO Pulse
        </Link>

        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
