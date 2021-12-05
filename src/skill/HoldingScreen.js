import React from 'react';
import './HoldingScreen.css';

// Holding Screen to render during countdown
const HoldingScreen = ({ text }) => {
    return (
        <div className="HoldingScreen">
            <div className="HoldingScreen-text">
                { text }
            </div>
        </div>
    )
}

export default HoldingScreen;