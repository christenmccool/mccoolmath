import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-regular-svg-icons';
import confetti from '../confetti.gif';

import './Overlay.css';

const Overlay = ({ problem, setShowOverlay }) => {
    const confettiClass = problem.status === 'correct' ? "Overlay-confetti" : "Overlay-no-confetti";
    
    const messageText = () => {
        switch (problem.status) {
            case "correct": return "Correct"
            case "incorrect": return "Try Again"
            default: return null;
        }
    }

    return (
        <div className={`Overlay`}>
            <img className={confettiClass} src={confetti} alt="confetti" />
            <h1 className={`Overlay-text-${problem.status}`}>
                {messageText()}
            </h1>
            <span className="Overlay-icon">
                <FontAwesomeIcon icon={faWindowClose} onClick={() => setShowOverlay(false)} />
            </span>
        </div>
    )
}

export default Overlay;