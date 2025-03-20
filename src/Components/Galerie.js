import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../CSS/Galerie.css';
import NavBar from './LayoutComponents/NavBar';

// Importing images
import Chambre1 from '../Images/Chambres/chambreParental.png';
import Chambre2 from '../Images/Chambres/chambreBB.png';
import Chambre3 from '../Images/Chambres/GrandeChambre.png';
import Chambre4 from '../Images/Chambres/Chambre4.png';
import Chambre5 from '../Images/Chambres/chambre5.png';
import Chambre5_2 from '../Images/Chambres/chambre4_2.png';

import EspaceDeVie1 from '../Images/EspaceDeVie/salleManger.png';
import EspaceDeVie2 from '../Images/EspaceDeVie/EspaceDeVie2.png';
import EspaceDeVie3 from '../Images/EspaceDeVie/EspaceDeVie3.png';
import EspaceDeVieAvecText from '../Images/EspaceDeVie/EspaceDeVieAvecText.png';

import Cuisine1 from '../Images/Cuisine/Cuisine1.png';
import Cuisine2 from '../Images/Cuisine/cuisine_21.png';
import Cuisine3 from '../Images/Cuisine/Cuisine3.png';
import CuisineAvecText from '../Images/Cuisine/CuisineAvecText.png';
import CuisineAvecText2 from '../Images/Cuisine/CuisineAvecText2.png';

import Exterieur1 from '../Images/Exterieur/Exterieur1.png';
import Exterieur2 from '../Images/Exterieur/Exterieur2.png';
import Exterieur3 from '../Images/Exterieur/Exterieur3.png';
import Exterieur4 from '../Images/Exterieur/Exterieur4.png';
import ExterieurAvecText from '../Images/Exterieur/ExterieurAvecText.png';

const sections = [
  {
    title: 'Les chambres',
    images: [
      { url: Chambre1, title: 'Chambre parentale', text: "En haut d’un bel escalier en bois patiné par le temps, cette chambre cathédrale avec son alcôve est équipée d’un lit double confortable (160X200cm), d’un lit simple (90X190cm) et d'une armoire à glace. Elle est idéale pour un couple avec 1 enfant et 1 bébé, car attenante à cette chambre vous trouverez une chambre de bébé" },
      { url: Chambre2, title: 'Chambre bébé', text: 'Attenante à la chambre parentale (chambre verte), une chambre de bébé avec un lit à barreaux en bois (60x120cm) et une table à langer munie de rangements pour les vêtements de bébé' },
      { url: Chambre3, title: 'Grande chambre', text: "Cette chambre récemment rénovée est équipée d'un lit double confortable. Elle bénéficie d'une salle de bain attenante moderne, offrant tout le confort nécessaire. Les toilettes sont séparées. Située au rez-de-chaussée, cette chambre est idéale pour un couple ou des invités qui souhaitent éviter de monter à l'étage." },
      { url: Chambre4, title: 'Chambre enfilade sur la grande chambre', text: 'Cette chambre en enfilade sur la chambre 3 comprend deux lits simples (80X190cm), qui peuvent être rapprochés en un lit double (160X190cm) si nécessaire. Dans ce dortoir vous y trouverez aussi deux petits lits (60X140cm) pour jeunes enfants de moins de 6 ans, et une commode vintage pour vos affaires' },
      { url: Chambre5, title: 'Chambre élégante', text: "Cette chambre récemment rénovée est équipée d’un lit double confortable (140X200cm) et d'une grande armoire ancienne. Elle bénéficie d’une salle de bain attenante ainsi que de toilettes séparées. Elle est située au rez-de-chaussée ce qui la rend idéal pour un couple souhaitant être un peu à l’écart ou éviter la montée des escaliers. La chambre a un accès de plein pied au jardin" },
      { url: Chambre5_2, title: 'Chambre élégante', text: "Cette chambre récemment rénovée est équipée d’un lit double confortable (140X200cm) et d'une grande armoire ancienne. Elle bénéficie d’une salle de bain attenante ainsi que de toilettes séparées. Elle est située au rez-de-chaussée ce qui la rend idéal pour un couple souhaitant être un peu à l’écart ou éviter la montée des escaliers. La chambre a un accès de plein pied au jardin" },
    ]
  },
  {
    title: "L'espace de vie",
    images: [
      { url: EspaceDeVie1, title: 'Salon moderne', text: 'Une salle à manger ouverte sur la cuisine avec le charme de l’ancien au sol pavé de tommettes. Une grande table permettant d’accueillir jusqu’à dix personnes, idéale pour les grands repas de famille dans une ambiance conviviale et chaleureuse.' },
      { url: EspaceDeVie2, title: 'Espace lumineux', text: 'Une pièce baignée de lumière.' },
      { url: EspaceDeVie3, title: 'Coin détente', text: 'Un endroit parfait pour se relaxer.' },
      { url: EspaceDeVieAvecText, title: 'Salon cosy', text: 'Un cadre chaleureux et accueillant.' },
    ]
  },
  {
    title: 'Cuisine',
    images: [
      { url: Cuisine2, title: 'Cuisine spacieuse', text: "a cuisine ouverte sur la salle à manger est spacieuse, moderne et équipée pour des repas en famille ou entre amis. Elle dispose d’un piano de cuisine avec un four électrique et cinq feux au gaz, d’un micro-ondes, d’un réfrigérateur, d’un lave vaisselle et d’un lave linge. Cette cuisine est très bien équipée comme à la maison avec de nombreux accessoires (cocotte minute, plats à gratin, moules, rouleau à patisserie, thermomètre, robot de cuisine, mixeur...). Vous trouverez aussi un bel équipement pour bébé (babycook, vaisselle enfant, deux chaises hautes,...)." },
      { url: Cuisine3, title: 'Cuisine design', text: 'Beaucoup d’espace de travail.' },
      { url: CuisineAvecText, title: 'Espace repas', text: 'Un lieu idéal pour partager des repas.' },
      { url: CuisineAvecText2, title: 'Cuisine fonctionnelle', text: 'Ergonomie et confort optimisés.' },
      { url: Cuisine1, title: 'Cuisine équipée', text: 'Tout le nécessaire pour cuisiner.' },
    ]
  },
  {
    title: "L'extérieur",
    images: [
      { url: Exterieur1, title: 'Jardin verdoyant', text: "L’extérieur de la maison offre un vaste espace naturel entouré d’un grand parc arboré, avec des arbres centenaires et un verger plein de pruniers, cerisiers, pommiers et pêchers. À l’avant, une grande terrasse orientée plein sud est aménagée avec une table de jardin, idéale pour des repas en plein air. Un barbecue est disponible pour des grillades conviviales. Le jardin comprend aussi une piscine parfaite pour se rafraîchir en été, ainsi qu'une cabane pour enfants et un bac à sable, créant un espace de jeu et de détente pour petits et grands dans un cadre paisible et sécurisé." },
      { url: Exterieur2, title: 'Extérieur moderne', text: "L’extérieur de la maison offre un vaste espace naturel entouré d’un grand parc arboré, avec des arbres centenaires et un verger plein de pruniers, cerisiers, pommiers et pêchers. À l’avant, une grande terrasse orientée plein sud est aménagée avec une table de jardin, idéale pour des repas en plein air. Un barbecue est disponible pour des grillades conviviales. Le jardin comprend aussi une piscine parfaite pour se rafraîchir en été, ainsi qu'une cabane pour enfants et un bac à sable, créant un espace de jeu et de détente pour petits et grands dans un cadre paisible et sécurisé." },
      { url: Exterieur3, title: 'Terrasse ensoleillée', text: "L’extérieur de la maison offre un vaste espace naturel entouré d’un grand parc arboré, avec des arbres centenaires et un verger plein de pruniers, cerisiers, pommiers et pêchers. À l’avant, une grande terrasse orientée plein sud est aménagée avec une table de jardin, idéale pour des repas en plein air. Un barbecue est disponible pour des grillades conviviales. Le jardin comprend aussi une piscine parfaite pour se rafraîchir en été, ainsi qu'une cabane pour enfants et un bac à sable, créant un espace de jeu et de détente pour petits et grands dans un cadre paisible et sécurisé." },
      { url: Exterieur4, title: 'Façade élégante', text: "L’extérieur de la maison offre un vaste espace naturel entouré d’un grand parc arboré, avec des arbres centenaires et un verger plein de pruniers, cerisiers, pommiers et pêchers. À l’avant, une grande terrasse orientée plein sud est aménagée avec une table de jardin, idéale pour des repas en plein air. Un barbecue est disponible pour des grillades conviviales. Le jardin comprend aussi une piscine parfaite pour se rafraîchir en été, ainsi qu'une cabane pour enfants et un bac à sable, créant un espace de jeu et de détente pour petits et grands dans un cadre paisible et sécurisé." },
      { url: ExterieurAvecText, title: 'Espace extérieur', text: "L’extérieur de la maison offre un vaste espace naturel entouré d’un grand parc arboré, avec des arbres centenaires et un verger plein de pruniers, cerisiers, pommiers et pêchers. À l’avant, une grande terrasse orientée plein sud est aménagée avec une table de jardin, idéale pour des repas en plein air. Un barbecue est disponible pour des grillades conviviales. Le jardin comprend aussi une piscine parfaite pour se rafraîchir en été, ainsi qu'une cabane pour enfants et un bac à sable, créant un espace de jeu et de détente pour petits et grands dans un cadre paisible et sécurisé." },
    ]
  }
];

export const Galerie = () => {
  const [currentIndices, setCurrentIndices] = useState(
    sections.map(() => 0) // Store current index for each section
  );

  const nextSlide = (sectionIndex) => {
    setCurrentIndices((prev) =>
      prev.map((index, i) =>
        i === sectionIndex ? Math.min(index + 1, sections[sectionIndex].images.length - getImagesPerSlide()) : index
      )
    );
  };

  const prevSlide = (sectionIndex) => {
    setCurrentIndices((prev) =>
      prev.map((index, i) => (i === sectionIndex ? Math.max(index - 1, 0) : index))
    );
  };

  const getImagesPerSlide = () => {
    if (window.innerWidth >= 1981) return 3;
    if (window.innerWidth >= 1201) return 2;
    return 1;
  };

  return (
    <div>
      <NavBar />
      <div className="gallery-container">
        <h1 className="gallery-title">GALERIE</h1>
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="carousel-sectionGaleriePage">
            <h2 className="section-title">{section.title}</h2>
            <div className="carouselGaleriePage">
              <button
                className={`carousel-buttonGaleriePage prevGaleriePage ${currentIndices[sectionIndex] === 0 ? 'disabled' : ''}`}
                onClick={() => prevSlide(sectionIndex)}
                disabled={currentIndices[sectionIndex] === 0}
              >
                <ChevronLeft />
              </button>
              <div className="carousel-contentGaleriePage">
                {section.images.slice(currentIndices[sectionIndex], currentIndices[sectionIndex] + getImagesPerSlide()).map((image, index) => (
                  <div key={index} className="carousel-image-wrapperGaleriePage">
                    <img src={image.url} alt={image.title} loading='lazy' className="carousel-imageGaleriePage" />
                    <div className="image-overlayGaleriePage">
                      <p className="overlay-titleGaleriePage">{image.title}</p>
                      <p className="overlay-textGaleriePage">{image.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className={`carousel-buttonGaleriePage nextGaleriePage ${
                  currentIndices[sectionIndex] + getImagesPerSlide() >= sections[sectionIndex].images.length ? 'disabled' : ''
                }`}
                onClick={() => nextSlide(sectionIndex)}
                disabled={currentIndices[sectionIndex] + getImagesPerSlide() >= sections[sectionIndex].images.length}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Galerie;
