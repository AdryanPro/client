// import React from 'react'
// import '../CSS/Galerie.css'
// import '../CSS/GalerieResponsive.css'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// import Chambre1 from '../Images/Chanbres/Chambre1AvecText.png'
// import Chambre2 from '../Images/Chanbres/Chambre2AvecText.png'
// import Chambre3 from '../Images/Chanbres/Chambre3AvecText.png'
// import Chambre4 from '../Images/Chanbres/Chambre4AvecText.png'
// import Douche from '../Images/Chanbres/Douche.png'
// import EspaceDeVieAvecText from '../Images/EspaceDeVie/EspaceDeVieAvecText.png'
// import EspaceDeVie1 from '../Images/EspaceDeVie/EspaceDeVie1.png'
// import EspaceDeVie2 from '../Images/EspaceDeVie/EspaceDeVie2.png'
// import EspaceDeVie3 from '../Images/EspaceDeVie/EspaceDeVie3.png'
// import CuisineAvecText from '../Images/Cuisine/CuisineAvecText.png'
// import CuisineAvecText2 from '../Images/Cuisine/CuisineAvecText2.png'
// import Cuisine1 from '../Images/Cuisine/Cuisine1.png'
// import Cuisine2 from '../Images/Cuisine/Cuisine2.png'
// import Cuisine3 from '../Images/Cuisine/Cuisine3.png'
// import ExterieurAvecText from '../Images/Exterieur/ExterieurAvecText.png'
// import Exterieur1 from '../Images/Exterieur/Exterieur1.png'
// import Exterieur2 from '../Images/Exterieur/Exterieur2.png'
// import Exterieur3 from '../Images/Exterieur/Exterieur3.png'
// import Exterieur4 from '../Images/Exterieur/Exterieur4.png'
// import Exterieur5 from '../Images/Exterieur/Exterieur5.png'
// import Footer from './LayoutComponents/Footer';

// export const Galerie = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     slidesToShow: 2,
//     slidesToScroll: 1,
//     autoplay: true,
//     speed: 2500,
//     autoplaySpeed: 4400,
//     cssEase: "linear",
//     pauseOnHover: true,
//     nextArrow: false,
//     prevArrow: false,
//     responsive: [
//       {
//         breakpoint: 1080,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true
//         }
//       },
//       {
//         breakpoint: 900,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         }
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1
//         }
//       }
//     ]
//   };

//   // const imageStyle = {
//   //   width: "50%",
//   //   objectFit: "cover",
//   // };
//   return (
//     <div className='GalerieWrapper'> 
//       <div className='h1Wrapper'>
//         <h1 className='GalerieH1'>Galerie</h1>
//       </div>
//       <div className='SlidersWrapper'>
//                                   {/* LES CHAMBRES */}
//         <div className="slider-container">
//           <h1>LES CHAMBRES</h1>
//           <Slider {...settings}>
//           <div className='Card'>
//               <img src={Chambre1} alt="La 1er chambre" className='ImageCarrousel'/>
//               <p className='ChambreP'>
//                   CHAMBRE 1:<br/>
//                   Cette chambre récemment rénovée est équipée d'un lit double confortable. 
//                   Elle bénéficie d'une salle de bain attenante moderne, offrant tout le confort nécessaire. 
//                   Les toilettes sont séparées. Située au rez-de-chaussée, cette chambre est idéale pour un 
//                   couple ou des invités qui souhaitent éviter de monter à l'étage.
//               </p>
//             </div>

//             <div className='Card'>
//               <img src={Chambre2} alt="La 1er chambre" className='ImageCarrousel'/>
//               <p className='ChambreP'>
//                   CHAMBRE 2:<br/>
//                   En haut d’un bel escalier en bois patiné par le temps, cette chambre cathédrale avec son 
//                   alcôve est équipée d’un lit double confortable (160X200cm), d’un lit simple (90X190cm) et 
//                   d'une armoire à glace. Elle est idéale pour un couple avec 1 enfant et 1 bébé, car 
//                   attenante à cette chambre vous trouverez une chambre de bébé.
//               </p>
//             </div>

//             <div className='Card'>
//               <img src={Chambre3} alt="La 1er chambre" className='ImageCarrousel'/>
//               <p className='ChambreP'>
//                   CHAMBRE 3:<br/>
//                   De l’autre côté du palier, cette chambre spacieuse, est parfaite pour une grande famille grâce
//                   à son dortoir attenant. Elle est équipée d’un grand lit double (160X190cm), d’un lit simple 
//                   (90X190cm) et d'un placard pour vos vêtements. Vous y trouverez aussi un petit bureau, parfait 
//                   pour ceux qui ont besoin de travailler.
//               </p>

//             </div>

//             <div className='Card'>
//               <img src={Chambre4} alt="La 1er chambre" className='ImageCarrousel'/>
//               <p className='ChambreP'>
//                   CHAMBRE 4:<br/>
//                   Attenante à la chambre parentale (chambre verte), une chambre de bébé avec un lit à 
//                   barreaux en bois (60x120cm) et une table à langer munie de rangements pour les 
//                   vêtements de bébé
//               </p>
//             </div>

//             <div className='Card'>
//               <img src={Douche} alt="Douche" className='ImageCarrousel ImageDouche'/>
//               <p className='ChambreP'>
//                 SALLE DE BAIN :
//                 <br/>
//                 <br/>
//                 {/* La maison dispose de deux salles de bain dont une rénovée.
//                 À l’étage vous trouverez une grande salle de bain équipée d’une douche, 
//                 d’une baignoire, de toilettes ainsi qu’une double vasque avec rangements.
//                 Au rez de chaussée une salle de bain rétro attenante à la chambre, avec une baignoire, 
//                 une vasque simple et des rangements pour vos affaires. Juste à côté vous trouverez des 
//                 toilettes séparées. */}
//                 À l'étage : grande salle de bain avec douche, baignoire, toilettes et double vasque avec rangements.
//                 Au rez-de-chaussée : salle de bain rétro attenante à la chambre, équipée d'une baignoire, d'une vasque 
//                 simple et de rangements, avec des toilettes séparées à proximité.
//               </p>
//             </div>
//           </Slider>
//         </div>
//                                   {/* L'ESPACE DE VIE */}
                                  
//         <div className="slider-container">
//           <h1>L'ESPACE DE VIE</h1>
//           <Slider {...settings}>
//             <div className='Card'>
//                 <img src={EspaceDeVieAvecText} alt="EspaceDeVieAvecText" className='ImageCarrousel'/>
//                 <p className='ChambreP'>
//                   Photo salon
//                   <br/>
//                   Le double salon est séparé par des poutres anciennes ajourées. Elle offre deux espaces de 
//                   détente. Dans la première vous y trouverez un canapé, d’où, confortablement installé vous 
//                   pourrez regarder la télévision ou un DVD. Dans l’autre salon, un grand canapé d'angle et 
//                   une table de jeux, parfaite pour accueillir toute votre famille devant la grande cheminée.
//                    Des livres et jeux de société sont mis à votre disposition. Un appareil à CD est également 
//                    disponible si vous souhaitez écouter de la musique pendant votre séjour.
//                 </p>
//               </div>

//               <div className='CardOnlyImage'>
//                 <img src={EspaceDeVie1} alt="EspaceDeVie1" className='OnlyImageCarrousel'/>
//               </div>

//               <div className='CardOnlyImage'>
//                 <img src={EspaceDeVie2} alt="EspaceDeVie2" className='OnlyImageCarrousel'/>
//               </div>

//               <div className='CardOnlyImage'>
//                 <img src={EspaceDeVie3} alt="EspaceDeVie3" className='OnlyImageCarrousel'/>
//               </div>
//           </Slider>
//         </div>
//                                   {/* LA CUISINE */}
//         <div className="slider-container">
//           <h1>LA CUISINE</h1>
//           <Slider {...settings}>
//           <div className='Card'>
//                 <img src={CuisineAvecText} alt="EspaceDeVie3" className='ImageCarrousel'/>
//                 <p className='ChambreP'>
//                   Photo cuisine :
//                   <br/>
//                   La cuisine ouverte sur la salle à manger est spacieuse, moderne et équipée pour des 
//                   repas en famille ou entre amis. Elle dispose d’un piano de cuisine avec un four électrique 
//                   et cinq feux au gaz, d’un micro-ondes, d’un réfrigérateur, d’un lave vaisselle et d’un lave 
//                   linge. Cette cuisine est très bien équipée comme à la maison avec de nombreux accessoires 
//                   (cocotte minute, plats à gratin, moules, rouleau à patisserie, thermomètre, robot de cuisine, 
//                   mixeur...). 
//                   Vous trouverez aussi un bel équipement pour bébé 
//                   (babycook, vaisselle enfant, deux chaises hautes,...).
//                   {/* <br/><br/><br/> */}
//                 </p>
//           </div>

//           <div className='Card'>
//                 <img src={CuisineAvecText2} alt="CuisineAvecText2" className='ImageCarrousel'/>
//                 <p className='ChambreP'>
//                 <br/>
//                 Photo cuisine
//                 <br/>
//                   Une salle à manger ouverte sur la cuisine avec le charme de l’ancien au sol pavé de tommettes.
//                   Une grande table permettant d’accueillir jusqu’à dix personnes, idéale pour les grands repas 
//                   de famille dans une ambiance conviviale et chaleureuse.
//                 {/* <br/> <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/> */}
//                 </p>
//           </div>

//           <div className='CardOnlyImage'>
//             <img src={Cuisine1} alt="Cuisine1" className='OnlyImageCarrousel'/>
//           </div>

//           <div className='CardOnlyImage'>
//             <img src={Cuisine2} alt="Cuisine2" className='OnlyImageCarrousel'/>
//           </div>
          
//           <div className='CardOnlyImage'>
//             <img src={Cuisine3} alt="Cuisine3" className='OnlyImageCarrousel'/>
//           </div>
//           </Slider>
//         </div>

//                                   {/* L'EXTERIEUR */}
//         <div className="slider-container">
//           <h1>L'EXTERIEUR</h1>
//           <Slider {...settings}>
//             <div className='Card'>
//                   <img src={ExterieurAvecText} alt="ExterieurAvecText" className='ImageCarrousel'/>
//                   <p className='ChambreP'>
//                     Photo extérieur description globale
//                     <br/>
//                     L’extérieur de la maison offre un grand parc arboré avec des arbres centenaires et un verger (pruniers, cerisiers, pommiers, pêchers).
//                     À l’avant : terrasse plein sud avec table de jardin, idéale pour des repas en plein air, et barbecue.
//                     Jardin : piscine pour l’été, cabane pour enfants et bac à sable, parfaits pour jouer et se détendre dans un cadre paisible et sécurisé.
//                   </p>
//             </div>
//             <div className='CardOnlyImage'>
//                   <img src={Exterieur1} alt="Exterieur1" className='OnlyImageCarrousel'/>
//             </div>
//             <div className='CardOnlyImage'>
//                   <img src={Exterieur2} alt="Exterieur2" className='OnlyImageCarrousel'/>
//             </div>
//             <div className='CardOnlyImage'>
//                   <img src={Exterieur3} alt="Exterieur3" className='OnlyImageCarrousel'/>
//             </div>
//             <div className='CardOnlyImage'>
//                   <img src={Exterieur4} alt="Exterieur4" className='OnlyImageCarrousel'/>
//             </div>
//             {/* <div className='CardOnlyImage'>
//                   <img src={Exterieur5} alt="Exterieur5" className='OnlyImageCarrousel'/>
//             </div> */}
//           </Slider>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../CSS/Galerie.css'
import Footer from './LayoutComponents/Footer';
// Importing images
import Chambre1 from '../Images/Chambres/Chambre1AvecText.png';
import Chambre2 from '../Images/Chambres/Chambre2AvecText.png';
import Chambre3 from '../Images/Chambres/Chambre3AvecText.png';
import Chambre4 from '../Images/Chambres/Chambre4AvecText.png';
import Douche from '../Images/Chambres/Douche.png';

import EspaceDeVie1 from '../Images/EspaceDeVie/EspaceDeVie1.png';
import EspaceDeVie2 from '../Images/EspaceDeVie/EspaceDeVie2.png';
import EspaceDeVie3 from '../Images/EspaceDeVie/EspaceDeVie3.png';
import EspaceDeVieAvecText from '../Images/EspaceDeVie/EspaceDeVieAvecText.png';

import Cuisine1 from '../Images/Cuisine/Cuisine1.png';
import Cuisine2 from '../Images/Cuisine/Cuisine2.png';
import Cuisine3 from '../Images/Cuisine/Cuisine3.png';
import CuisineAvecText from '../Images/Cuisine/CuisineAvecText.png';
import CuisineAvecText2 from '../Images/Cuisine/CuisineAvecText2.png';

import Exterieur1 from '../Images/Exterieur/Exterieur1.png';
import Exterieur2 from '../Images/Exterieur/Exterieur2.png';
import Exterieur3 from '../Images/Exterieur/Exterieur3.png';
import Exterieur4 from '../Images/Exterieur/Exterieur4.png';
import ExterieurAvecText from '../Images/Exterieur/ExterieurAvecText.png';
import NavBar from './LayoutComponents/NavBar';

export const Galerie = () => {
  const [currentIndices, setCurrentIndices] = useState({});
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState({});

  const sections = [
    {
      title: 'Chambres',
      images: [
        { url: Chambre1, alt: 'Chambre moderne' },
        { url: Chambre2, alt: 'Chambre lumineuse' },
        { url: Chambre3, alt: 'Chambre élégante' },
        { url: Chambre4, alt: 'Chambre confortable' },
        { url: Douche, alt: 'Douche' },
      ]
    },
    {
      title: "L'espace de vie",
      images: [
        { url: EspaceDeVie1, alt: 'Salon moderne' },
        { url: EspaceDeVie2, alt: 'Salon spacieux' },
        { url: EspaceDeVie3, alt: 'Salon lumineux' },
        { url: EspaceDeVieAvecText, alt: 'Salon cosy' },
      ]
    },
    {
      title: 'Cuisine',
      images: [
        { url: Cuisine1, alt: 'Cuisine moderne' },
        { url: Cuisine2, alt: 'Cuisine équipée' },
        { url: Cuisine3, alt: 'Cuisine design' },
        { url: CuisineAvecText, alt: 'Cuisine spacieuse' },
        { url: CuisineAvecText2, alt: 'Cuisine équipée' },
      ]
    },
    {
      title: "L'extérieur",
      images: [
        { url: Exterieur1, alt: 'Jardin' },
        { url: Exterieur2, alt: 'Extérieur maison' },
        { url: Exterieur3, alt: 'Terrasse' },
        { url: Exterieur4, alt: 'Façade' },
        { url: ExterieurAvecText, alt: 'Jardin avec texte' },
      ]
    }
  ];

  const getExtendedImages = (images) => {
    return [...images.slice(-2), ...images, ...images.slice(0, 2)];
  };

  useEffect(() => {
    const indices = {};
    const transitions = {};
    sections.forEach((_, index) => {
      indices[index] = 2;
      transitions[index] = false;
    });
    setCurrentIndices(indices);
    setIsTransitioning(transitions);
  }, []);

  const handleTransitionEnd = (sectionIndex) => {
    const currentIndex = currentIndices[sectionIndex];
    const imagesLength = sections[sectionIndex].images.length;

    if (currentIndex <= 1) {
      setIsTransitioning((prev) => ({ ...prev, [sectionIndex]: true }));
      setCurrentIndices((prev) => ({
        ...prev,
        [sectionIndex]: imagesLength + currentIndex
      }));
      setTimeout(() => {
        setIsTransitioning((prev) => ({ ...prev, [sectionIndex]: false }));
      }, 0);
    } else if (currentIndex >= imagesLength + 2) {
      setIsTransitioning((prev) => ({ ...prev, [sectionIndex]: true }));
      setCurrentIndices((prev) => ({
        ...prev,
        [sectionIndex]: currentIndex - imagesLength
      }));
      setTimeout(() => {
        setIsTransitioning((prev) => ({ ...prev, [sectionIndex]: false }));
      }, 0);
    }
  };

  const next = useCallback(
    (sectionIndex) => {
      if (isTransitioning[sectionIndex]) return;
      setCurrentIndices((prev) => ({
        ...prev,
        [sectionIndex]: prev[sectionIndex] + 1
      }));
    },
    [isTransitioning]
  );

  const previous = (sectionIndex) => {
    if (isTransitioning[sectionIndex]) return;
    setCurrentIndices((prev) => ({
      ...prev,
      [sectionIndex]: prev[sectionIndex] - 1
    }));
  };

  useEffect(() => {
    if (!isPaused) {
      const intervals = sections.map((_, sectionIndex) =>
        setInterval(() => next(sectionIndex), 3000)
      );
      return () => intervals.forEach((interval) => clearInterval(interval));
    }
  }, [isPaused, next, sections]);

  return (
    <div>
      <NavBar />
      <div className="gallery">
        <h1>Notre Propriété</h1>

        {sections.map((section, sectionIndex) => {
          const extendedImages = getExtendedImages(section.images);
          return (
            <div key={sectionIndex} className="carousel-section">
              <h2>{section.title}</h2>
              <div
                className="carousel-container"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => {
                  setIsPaused(false);
                  setHoveredIndex(null);
                }}
              >
                <div className="carousel-track">
                  <div
                    className="carousel-slides"
                    style={{
                      transform: `translateX(-${
                        (currentIndices[sectionIndex] - 1) * (100 / 3)
                      }%)`,
                      transition: isTransitioning[sectionIndex]
                        ? 'none'
                        : 'transform 0.5s ease-in-out'
                    }}
                    onTransitionEnd={() => handleTransitionEnd(sectionIndex)}
                  >
                    {extendedImages.map((image, index) => (
                      <div
                        key={index}
                        className="slide"
                        style={{ width: `${100 / 3}%` }}
                      >
                        <div
                          className={`slide-content ${
                            hoveredIndex === index ? 'hovered' : ''
                          }`}
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                        >
                          <img src={image.url} alt={image.alt} loading="lazy" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  className="nav-button prev"
                  onClick={() => previous(sectionIndex)}
                >
                  <ChevronLeft />
                </button>

                <button
                  className="nav-button next"
                  onClick={() => next(sectionIndex)}
                >
                  <ChevronRight />
                </button>

                <div className="dots">
                  {section.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setCurrentIndices((prev) => ({
                          ...prev,
                          [sectionIndex]: index + 2
                        }))
                      }
                      className={`dot ${
                        currentIndices[sectionIndex] - 2 === index
                          ? 'active'
                          : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};
