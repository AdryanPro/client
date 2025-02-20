import React from 'react'
import '../../CSS/Footer.css'
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="footer">
        <div className="info">
            <h1>Localisation :</h1>
            <a className='FooterA' href='https://www.google.com/maps/place/53200+Daon/'>https://www.google.com/maps/place/53200+Daon/</a>

            <h1>Avis Clients :</h1>
            <a className='FooterA' href='https://www.airbnb.fr/rooms/39481267/reviews'>https://www.airbnb.fr/rooms/39481267/reviews </a>

            <h1>Annonce AirBnB :</h1>
            <a className='FooterA' href='https://www.airbnb.fr/rooms/39481267/reviews'>https://www.airbnb.fr/rooms/39481267/reviews</a>
        </div>
        
        <div className="contact">
            <h1 className='contactH1'>Coordonnées :</h1>
            <p className='contactP'>06 07 08 09 10</p>
            <p className='contactP'>lalongere@.com</p>
            <a className='FooterA' href='https://www.google.com/maps/place/1+Rte+de+la+Mayenne,+49220+La+Jaille-Yvon/@47.718952,-0.6697129,17z/data=!3m1!4b1!4m6!3m5!1s0x48088a7c66d305eb:0x9c186631afb21b58!8m2!3d47.718952!4d-0.667138!16s%2Fg%2F11csd2bm7f?entry=ttu&g_ep=EgoyMDI0MTExMi4wIKXMDSoASAFQAw%3D%3D'><p className='contactP'>1 route de la Mayenne, France</p></a>
            <div className='BtnWrapper'>
            <Link to='/Contact' className='FooterA'><button className="contactBtn">CONTACT</button></Link>
            </div>
        </div>
    </div>
  )
}
