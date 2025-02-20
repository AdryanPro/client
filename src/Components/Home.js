import React from 'react'
import "../CSS/Home.css";
import "../CSS/HomeResponsive.css"
import { Link } from 'react-router-dom';
import NotreMaisonImg from '../Images/NotreMaisonIMG.png';
import Accrobranche from '../Images/Accrobranche.png';
import BaladeAPied from '../Images/BaladeAPied.png';
import BaladeAVelo from '../Images/BaladeAVelo.png';
import Epicerie from '../Images/Epicerie.png';
import Chateau from '../Images/Chateau.png';
import guinguette from '../Images/guinguette.png';
import LocationDePedalo from '../Images/LocationDePedalos.png';
import MiniGolf from '../Images/MiniGolf.png';
import Cathedral from '../Images/NotreRegion1.png'
import MaisonFleurie from '../Images/NotreRegion2.png'
import Fromage from '../Images/NotreRegion3.png'
import PetitVillage from '../Images/NotreRegion4.png'
import LaMayenne from '../Images/NotreRegion5.png'
import Logo from '../Images/LogoMaison.png'
import Slider from "react-slick";
import Footer from './LayoutComponents/Footer';
import NavBar from './LayoutComponents/NavBar';

export const Home = () => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 900,
        autoplaySpeed: 2000,
        cssEase: "linear",
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    };
  return (
    <div className='HomeMainWrapper'>
        <NavBar/>
        <div className="Home-header">
            <img src={Logo} alt="Logo" />
            <h1 className='H1'>LA PETITE NOIRIE</h1>
            <h2 className='H2'>LONGÈRE DE CHARME</h2>
            <Link to='/Reservation'>
            <button className="reserve"> Réserver</button>
            </Link>

            <nav className="fixednavbar">
                {/* <Link className='FixNavBarA' to="/">Accueil</Link> */}
                <a className='FixNavBarA' href="#NotreMaison">La Maison</a>
                <Link className='FixNavBarA' to="/Galerie">La Galerie</Link>
                <Link className='FixNavBarA' to="/Contact">Contact</Link>
            </nav>
        </div>

        <div className="Welcome">
                <h1 className='WelcomeH1'>BIENVENUE DANS VOTRE COIN DE PARADIS</h1>
                <p className='WelcomeP'>Plongez dans un cadre idyllique, niché 
                    dans une campagne valonnée et verdoyante,surplombant 
                    la sinueuse rivière qu’est la Mayenne.
                </p>
                <Link to={'/Reservation'}>
                    <button className="reserveCampagneMayenne">Réserver</button>
                </Link>
        </div>

        <div className="NotreMaison" id='NotreMaison'>
            <div className="wrapperNotreMaisonTexte">
                <h1 className="NotreMaisonH1">NOTRE MAISON ...</h1>
                <p className="NotreMaisonP">
                    idéalement située au cœur des Pays de la Loire, 
                    et plus précisément dans le sud de la Mayenne, à mi chemin entre Laval et Angers.
                    Cette jolie Longère construite au XVIIIe siècle, avec ses deux jardins et son grand verger, 
                    surplombe la rivière séparée par un petit bois privé
                </p>
            </div>
            <Link to={'/Galerie'}>
            <button className="galerieBtn">Galerie</button>
            </Link>
            <img src={NotreMaisonImg} alt='La masion vue de deriere' className='NotreMaisonImg'/>
        </div>

        <div className="ActiviterWrapper">
            <h1 className='activiterH1'>ACTIVITÉS & PROXIMITÉ</h1>
            <div className="logoWrapper">
                <img src={BaladeAPied} alt="BaladeAPied" className='logoActiviter logoActiviterBaladeAPied item-1'/>
                <img src={guinguette} alt="guinguette" className='logoActiviter logoActiviterguinguette item-2'/>
                <img src={Chateau} alt="Chateau" className='logoActiviter logoActiviterChateau item-3' />
                <img src={BaladeAVelo} alt="BaladeAVelo" className='logoActiviter logoActiviterBaladeAVelo item-4'/>
                <img src={MiniGolf} alt="MiniGolf" className='logoActiviter logoActiviterMiniGolf item-5'/>
                <img src={LocationDePedalo} alt="LocationDePedalo" className='logoActiviter logoActiviterLocationDePedalo item-6'/>
                <img src={Epicerie} alt="Epicerie" className='logoActiviter logoActiviterEpicerie item-7'/>
                <img src={Accrobranche} alt="Accrobranche" className='logoActiviter logoActiviterAccrobranche item-8' />
            </div>
        </div>

        {/* <div className="NotreRegionWrapper">
            <h1 className="NotreRegionH1">NOTRE RÉGION... </h1>
            <div className="band">band</div>
            <div className='LaMayenneImgWrapper'>
                <img src={Cathedral} alt="Cathedral" className='img1' />
                <img src={MaisonFleurie} alt="MaisonFleurie" className='img2' />
                <img src={Fromage} alt="Fromage" className='img3' />
                <img src={PetitVillage} alt="PetitVillage" className='img4' />
                <img src={LaMayenne} alt="LaMayenne" className='img5' />
            </div>

            <a className='EnSavoirPlusA' href="https://www.mayenne-tourisme.com/">
                <button className='EnSavoirPlusBtn'>EN SAVOIR PLUS</button>
            </a>
        </div> */}
        <div className="NotreRegionPetitEcrantH1">
            <h1 className="NotreRegionH1">NOTRE RÉGION... </h1>
        </div>
        <div className="NotreRegionPetitEcrant">
            <div className="slider-container">
                <Slider {...settings}>
                    <img src={Cathedral} alt="Cathedral" className='img1 imgNotreRegion' />
                    <img src={MaisonFleurie} alt="MaisonFleurie" className='img2 imgNotreRegion' />
                    <img src={Fromage} alt="Fromage" className='img3 imgNotreRegion' />
                    <img src={PetitVillage} alt="PetitVillage" className='img4 imgNotreRegion' />
                    <img src={LaMayenne} alt="LaMayenne" className='img5 imgNotreRegion' />
                </Slider>
            </div>
        </div>

        <div className="buttonWrapperRegion">
            <a className='EnSavoirPlusA' href="https://www.mayenne-tourisme.com/">
                <button className='EnSavoirPlusBtn'>EN SAVOIR PLUS</button>
                </a>
            </div>

            <Footer />
            {/* <div className="footer">
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
                     <a className='FooterA' href='https://www.google.com/maps/place/1+Rte+de+la+Mayenne,+49220+La+Jaille-Yvon/@47.718952,-0.6697129,17z/data=!3m1!4b1!4m6!3m5!1s0x48088a7c66d305eb:0x9c186631afb21b58!8m2!3d47.718952!4d-0.667138!16s%2Fg%2F11csd2bm7f?entry=ttu&g_ep=EgoyMDI0MTExMi4wIKXMDSoASAFQAw%3D%3D'>
                        <p className='contactP'>1 route de la Mayenne, France</p>
                     </a>
                     <Link to='/Contact'>
                        <button className="contactBtn">CONTACT</button>
                     </Link>
                </div>
            </div> */}
    </div>
  )
}
