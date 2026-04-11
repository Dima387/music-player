import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Music Player</h2>

      <div className="links">
        <Link to="src/pages/Home/Home.jsx">Home</Link>
        <Link to="src/pages/Search/Search.jsx">Search</Link>
        <Link to="src/pages/Favourites/Favourites.jsx">Favourites</Link>
      </div>
    </nav>
  );
}

export default Navbar;