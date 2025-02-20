import React from 'react'
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
import "../CSS/APropos.css"

export default function APropos() {
  return (
    <div>
        <div className="Titre">
            <h1 className='aProposH1'>NOTRE MAISON</h1>
        </div>
        <div className="chambreMainDisplay">
            <img src={Chambre1} alt="1er chambres" className='AProposChambreMainDisplayImg'/>
            <p className='AProposChambreMainDisplayP'>Nos chambres vous offrent des espaces chaleureux et confortables, 
                idéaux pour vous reposer après une journée bien remplie. Profitez 
                de lits douillets, d’une décoration soignée et de toutes les commodités 
                nécessaires pour un séjour agréable.
            </p>
        </div>
    </div>
  )
}
