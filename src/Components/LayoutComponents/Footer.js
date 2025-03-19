import React from 'react';
import '../../CSS/Footer.css';
import { Link, useLocation } from 'react-router-dom';
import { Lock } from "lucide-react";

export default function Footer({ isAdmin, handleAdminSwitch }) {
  const location = useLocation();
  const isReservationPage = location.pathname === '/Reservation';

  return (
    <div className="footer">
      <div className="footer-content">
        {/* Info and Contact Side by Side */}
        <div className="footer-left">
          <div className="info">
            <h1>Localisation :</h1>
            <a className='FooterA' href='https://www.google.com/maps/place/53200+Daon/'>Google Maps</a>

            <h1>Avis Clients :</h1>
            <a className='FooterA' href='https://www.airbnb.fr/rooms/39481267/reviews'>Voir les avis</a>

            <h1>Annonce AirBnB :</h1>
            <a className='FooterA' href='https://www.airbnb.fr/rooms/39481267/reviews'>Voir l'annonce</a>
          </div>

          <div className="contact">
            <h1 className='contactH1'>Coordonnées :</h1>
            <p className='contactP'>06 07 08 09 10</p>
            <p className='contactP'>lalongere@.com</p>
            <a className='FooterA' href='https://www.google.com/maps/place/1+Rte+de+la+Mayenne,+49220+La+Jaille-Yvon'>
              <p className='contactP'>1 route de la Mayenne, France</p>
            </a>
            <div className='BtnWrapper'>
              <Link to='/Contact' className='FooterA'>
                <button className="contactBtn">CONTACT</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Admin Switch Button on Right Side - visible only on reservation page */}
        <div className="footer-right">
          {isReservationPage && (
            <button
              onClick={handleAdminSwitch}
              className="admin-switch-btn"
            >
              <Lock className="w-4 h-4" />
              {isAdmin ? 'Switch to User View' : 'Switch to Admin View'}
            </button>
          )}
        </div>
      </div>
    </div>  
  );
}