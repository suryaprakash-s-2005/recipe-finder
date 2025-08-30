import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">🍔 Recipe Finder</Link>
      </div>
      <div className="menu-toggle" onClick={toggleMenu}>
        <span>☰</span>
      </div>
      <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
        <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home 🏠</Link>
        <Link to="/favorites" className="nav-link" onClick={() => setIsMenuOpen(false)}>Favorites ❤︎</Link>
      </div>
    </nav>
  );
}

export default Navbar;