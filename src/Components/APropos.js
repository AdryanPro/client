import React from 'react'
import Chambre1 from '../Images/Chambres/Chambre1AvecText.png';
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
