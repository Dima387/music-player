import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <a href="/"><img src="public/images/echo_navbar_logo_bigger.svg" alt="Echo" /></a>

      <div className="links">

        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/favourites">Favourites</Link>
      </div>
    </nav>
  );
}

export default Navbar;