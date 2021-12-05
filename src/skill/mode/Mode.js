import React from 'react';

// Displays a short description of the current mode
const Mode = ({ settings }) => {

    const text = () => {
        switch (settings.mode) {
            case 'practice':
                return "Practice mode";
            case 'numProbGoal':
                return `Goal: ${settings.goalNumProblems} correct`;
            case 'countdownGoal':
                return `Goal: Max correct`;
            default:
                return null
        }
    }

    return (
        <div>
            {text()}
        </div>
    )    
}

export default Mode;
