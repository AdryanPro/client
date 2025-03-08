import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
import Footer from './LayoutComponents/Footer';
import NavBar from './LayoutComponents/NavBar';

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
      { icon: "🚶", label: "Balade à pied", link: "https://example.com/balade" },
      { icon: "🎤", label: "Guinguette", link: "https://example.com/guinguette" },
      { icon: "🚲", label: "Balade à vélo", link: "https://example.com/velo" },
      { icon: "🚣", label: "Location de pédalos", link: "https://example.com/pedalo" },
      { icon: "🌳", label: "Accrobranche", link: "https://example.com/accrobranche" },
      { icon: "⛳", label: "Mini Golf", link: "https://example.com/mini-golf" },
      { icon: "🏰", label: "Châteaux", link: "https://example.com/chateaux" },
      { icon: "🏪", label: "Épicerie", link: "https://example.com/epicerie" }
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
      }, 3000);
  
      return () => clearInterval(timer);
    }, [nextSlide, 3000]);
  
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
                <div className="bg-blue-500 text-blue p-4 rounded-lg">
                  🎉 Tailwind is working!
                </div>
                
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
                <div className="activity-icon">{activity.icon}</div>
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
        </div>
    </div>
  )
}
