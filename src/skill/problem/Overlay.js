import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-regular-svg-icons';
import confetti from '../confetti.gif';

import './Overlay.css';

//Overlay component displays Message component on top of graph
//Closes on user click of icon
const Overlay = ({ div, setShowOverlay }) => {

    return (
        <div className="Overlay">
            <div className="Overlay-div">
                {div}
            </div>
            <span className="Overlay-icon">
                <FontAwesomeIcon icon={faWindowClose} onClick={() => setShowOverlay(false)} />
            </span>
        </div>
    )
}

export default Overlay;