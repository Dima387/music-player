import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Music Player</h2>

      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/favourites">Favourites</Link>
      </div>
    </nav>
  );
}

export default Navbar;