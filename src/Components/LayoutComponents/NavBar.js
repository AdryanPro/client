import React, { useState, useEffect } from 'react';
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
              <a className='no-underline' href='/'><img src={logo} alt="Logo" className="navbar-logo" /></a> 
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
              <a href="/" className="menu-item">Home</a>
              <a href="/Reservation" className="menu-item">Reservation</a>
              <a href="/contact" className="menu-item">Contact</a>
            </div>
          </div>
        )}
      </nav>
      {isScrolled && <div className="navbar-spacer"></div>}
    </>
  );
}
