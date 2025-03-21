import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import "../CSS/Home.css";
import "../CSS/HomeResponsive.css"
import { Link } from 'react-router-dom';
import NotreMaisonImg from '../Images/NotreMaisonIMG.png';
import Cathedral from '../Images/NotreRegion1.png'
import MaisonFleurie from '../Images/NotreRegion2.png'
import Fromage from '../Images/NotreRegion3.png'
import PetitVillage from '../Images/NotreRegion4.png'
import LaMayenne from '../Images/NotreRegion5.png'
import Logo from '../Images/LogoMaison.png'
import NavBar from './LayoutComponents/NavBar';
import accrobranche from "../Images/cardHomePage/acrobranche.png"
import epice from "../Images/cardHomePage/epice.png"
import miniGolf from "../Images/cardHomePage/miniGolf.png"
import pedalo from "../Images/cardHomePage/pedalo.png"
import velo from "../Images/cardHomePage/velo.png"
import chateau from "../Images/cardHomePage/chateau.png"
import guingette from "../Images/cardHomePage/guingette.png"
import restaurant from "../Images/cardHomePage/restaurant.png"

export const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const images = [
      {
        url: Cathedral,
        alt: "Scenic mountain landscape"
      },
      {
        url: MaisonFleurie,
        alt: "Ocean waves crashing on beach"
      },
      {
        url: Fromage,
        alt: "Autumn forest pathway"
      },
      {
        url: PetitVillage,
        alt: "City skyline at sunset"
      },{
        url: LaMayenne,
        alt: "La region"
      }
    ];
    const activities = [
      { icon: restaurant, label: "restaurant", link: "https://www.la-taverne-daon.fr/" },
      { icon: guingette, label: "Guinguette", link: "https://www.facebook.com/share/1AuQVgrdtH/?mibextid=wwXIfr" },
      { icon: velo, label: "Balade à vélo & Balade à pied", link: "https://www.anjou-tourisme.com/fr/voir-faire/balades/balades-velo/le-chemin-de-halage-de-la-mayenne?srsltid=AfmBOoqTJ0nR4R5mau609Z83Ji_hwuoe40XpWZI0RWZmEZ4rQg9A9oGa" },
      { icon: pedalo, label: "Location de pédalos", link: "https://www.facebook.com/share/1AuQVgrdtH/?mibextid=wwXIfr" },
      { icon: accrobranche, label: "Accrobranche", link: "https://anjousportnature.com/" },
      { icon: miniGolf, label: "Mini Golf", link: "https://www.facebook.com/share/1AuQVgrdtH/?mibextid=wwXIfr" },
      { icon: chateau, label: "Châteaux", link: "https://www.mayenne-tourisme.com/" },
      { icon: epice, label: "Épicerie", link: "https://www.facebook.com/barLeRelaisDaon/?_rdr" }
    ];
    const nextSlide = useCallback(() => {
      setCurrentIndex(prevIndex => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, [images.length]);
  
    const prevSlide = () => {
      setCurrentIndex(prevIndex => 
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    };
  
    const goToSlide = (index) => {
      setCurrentIndex(index);
    };
  
    useEffect(() => {
      const timer = setInterval(() => {
        nextSlide();
      }, 10000); // change the speed of the carousel
  
      return () => clearInterval(timer);
    }, [nextSlide]);
  
    const handleTouchStart = (e) => {
      setTouchEnd(null);
      setTouchStart(e.targetTouches[0].clientX);
    };
  
    const handleTouchMove = (e) => {
      setTouchEnd(e.targetTouches[0].clientX);
    };
  
    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      
      const distance = touchStart - touchEnd;
      const minSwipeDistance = 50;
  
      if (distance > minSwipeDistance) {
        nextSlide();
      } else if (distance < -minSwipeDistance) {
        prevSlide();
      }
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
                    Idéalement située au cœur des Pays de la Loire,
                    et plus précisément dans le sud de la Mayenne, à mi chemin entre Laval et Angers.
                    Cette jolie Longère construite au XVIIIe siècle, avec ses deux jardins et son grand verger, 
                    surplombe la rivière séparée par un petit bois privé.
                </p>
                <Link to={'/Galerie'}>
                  <button className="galerieBtn">Galerie</button>
                </Link>
                {/* <Link to={'/'}>
                  <button className="galerieBtn">A Propos</button>
                </Link> */}
            </div>
            <img src={NotreMaisonImg} alt='La masion vue de deriere' className='NotreMaisonImg'/>
        </div>

        <div className="ActiviterWrapper">
          <h1 className='activiterH1'>ACTIVITÉS & PROXIMITÉ</h1>
          <div className="activity-container">
            {activities.map((activity, index) => (
              <a key={index} href={activity.link} target="_blank" rel="noopener noreferrer" className="activity-item">
                {/* <div className="activity-icon">{activity.icon}</div> */}
                <img src={activity.icon} className="activity-icon" alt={activity.label} />
                <div className="activity-label">{activity.label}</div>
              </a>
            ))}
          </div>
        </div>
        <div className="regionTitre"> 
          <h1>NOTRE REGION ...</h1>
        </div>
        <div className="NotreRegion">
          <div className="carousel">
            <div 
              className="carousel-container"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                  />
                </div>
              ))}
              
              <button
                className="nav-button prev"
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                <ChevronLeft />
              </button>
              <button
                className="nav-button next"
                onClick={nextSlide}
                aria-label="Next slide"
              >
                <ChevronRight />
              </button>

              <div className="dots">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`dot ${index === currentIndex ? 'active' : ''}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="buttonWrapperRegion">
            <a className='EnSavoirPlusA' href="https://www.mayenne-tourisme.com/">
                <button className='EnSavoirPlusBtn'>EN SAVOIR PLUS</button>
            </a>

            <div 
              className="scroll-to-top-button" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <ChevronUp size={24} color="#fff" /> {/* Triangle icon */}
            </div>
        </div>
    </div>
  )
}
