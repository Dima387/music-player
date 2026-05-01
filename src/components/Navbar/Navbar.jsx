import { Link } from "react-router-dom";
import { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import "./Navbar.css";

function Navbar() {
  const { theme, toggleTheme } = useContext(PlayerContext);

  return (
    <nav className="navbar">
      <a href="/"><img src="public/images/echo_navbar_logo_bigger.svg" alt="Echo" /></a>

      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/favourites">Favourites</Link>
      </div>

      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </nav>
  );
}

export default Navbar;