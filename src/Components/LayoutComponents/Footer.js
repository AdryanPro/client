import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import '../../CSS/NavBar.css';
import logo from '../../Images/Logo.png';
import Biglogo from '../../Images/BigLogo.png';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      setIsScrolled(true); // Always display the navbar on non-home pages
      return;
    }

    const handleScroll = () => {
      const homeHeader = document.querySelector('.Home-header');
      if (homeHeader) {
        const homeHeaderBottom = homeHeader.getBoundingClientRect().bottom;
        setIsScrolled(homeHeaderBottom <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'visible' : 'hidden'}`}>
        <div className="navbar-container">
          <div className="navbar-content">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hamburger-button"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="logo">
              <Link to="/" className="no-underline">
                <img src={logo} alt="Logo" className="navbar-logo" />
              </Link>
            </div>

            <div className="spacer"></div>
          </div>
        </div>

        {isOpen && (
          <div className="mobile-menu">
            <div className="menu-logo">
              <img src={Biglogo} alt="Logo" className="dropdown-logo" />
            </div>
            <div className="menu-items">
              <Link to="/" className="menu-item" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/Reservation" className="menu-item" onClick={() => setIsOpen(false)}>Reservation</Link>
              <Link to="/Galerie" className="menu-item" onClick={() => setIsOpen(false)}>La Galerie</Link>
              <Link to="/Contact" className="menu-item" onClick={() => setIsOpen(false)}>Contact</Link>
            </div>
          </div>
        )}
      </nav>
      {isScrolled && <div className="navbar-spacer"></div>}
    </>
  );
}