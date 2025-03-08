import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../CSS/Galerie.css';
import NavBar from './LayoutComponents/NavBar';

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

const sections = [
  {
    title: 'Les chambres',
    images: [
      { url: Chambre1, title: 'Chambre moderne', text: 'Un espace élégant et moderne.' },
      { url: Chambre2, title: 'Chambre lumineuse', text: 'Profitez de la lumière naturelle.' },
      { url: Chambre3, title: 'Chambre élégante', text: 'Un design raffiné et épuré.' },
      { url: Chambre4, title: 'Chambre confortable', text: 'Un confort exceptionnel.' },
      { url: Douche, title: 'Salle de bain', text: 'Un espace propre et fonctionnel.' },
    ]
  },
  {
    title: "L'espace de vie",
    images: [
      { url: EspaceDeVie1, title: 'Salon moderne', text: 'Un salon spacieux et convivial.' },
      { url: EspaceDeVie2, title: 'Espace lumineux', text: 'Une pièce baignée de lumière.' },
      { url: EspaceDeVie3, title: 'Coin détente', text: 'Un endroit parfait pour se relaxer.' },
      { url: EspaceDeVieAvecText, title: 'Salon cosy', text: 'Un cadre chaleureux et accueillant.' },
    ]
  },
  {
    title: 'Cuisine',
    images: [
      { url: Cuisine1, title: 'Cuisine équipée', text: 'Tout le nécessaire pour cuisiner.' },
      { url: Cuisine2, title: 'Cuisine spacieuse', text: 'Beaucoup d’espace de travail.' },
      { url: Cuisine3, title: 'Cuisine design', text: 'Un style moderne et élégant.' },
      { url: CuisineAvecText, title: 'Espace repas', text: 'Un lieu idéal pour partager des repas.' },
      { url: CuisineAvecText2, title: 'Cuisine fonctionnelle', text: 'Ergonomie et confort optimisés.' },
    ]
  },
  {
    title: "L'extérieur",
    images: [
      { url: Exterieur1, title: 'Jardin verdoyant', text: 'Un espace naturel pour se détendre.' },
      { url: Exterieur2, title: 'Extérieur moderne', text: 'Un design extérieur épuré.' },
      { url: Exterieur3, title: 'Terrasse ensoleillée', text: 'Parfait pour les journées d’été.' },
      { url: Exterieur4, title: 'Façade élégante', text: 'Un extérieur harmonieux.' },
      { url: ExterieurAvecText, title: 'Espace extérieur', text: 'Profitez de la nature.' },
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
                    <img src={image.url} alt={image.title} className="carousel-imageGaleriePage" />
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
