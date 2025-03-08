import React, { Component } from 'react';
// import Carousel from './Carousel';

// Importing images from your project
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

class Gallery extends Component {
  render() {
    const sections = [
      {
        title: "Les chambres",
        images: [Chambre1, Chambre2, Chambre3, Chambre4, Douche]
      },
      {
        title: "L'espace de vie",
        images: [EspaceDeVie1, EspaceDeVie2, EspaceDeVie3, EspaceDeVieAvecText]
      },
      {
        title: "La cuisine",
        images: [Cuisine1, Cuisine2, Cuisine3, CuisineAvecText, CuisineAvecText2]
      },
      {
        title: "L'extérieur",
        images: [Exterieur1, Exterieur2, Exterieur3, Exterieur4, ExterieurAvecText]
      }
    ];

    return (
        <div className="gallery-container">
        <h1 className="gallery-title">Galerie</h1>
        <div className="carousels-wrapper">
          {sections.map((section, index) => (
            <div key={index} className="carousel-section">
              <h2 className="section-title">{section.title}</h2>
              {/* <Carousel images={section.images} /> */}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Gallery;
