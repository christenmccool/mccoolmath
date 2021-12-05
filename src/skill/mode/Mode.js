import React from 'react';

// Displays a short description of the current mode
const Mode = ({ settings }) => {

    const timeStr = () => {
        if (settings.mode !== 'countdownGoal') return "";
        let timeStr = "";
        let minutes = Math.floor(settings.timerStart / 60000);
        let seconds = (settings.timerStart / 1000) % 60;
        if (minutes) timeStr += `${minutes} min `
        if (seconds) timeStr += `${seconds} sec `
        return timeStr;
    }
    
    const text = () => {
        switch (settings.mode) {
            case 'practice':
                return "Practice mode";
            case 'numProbGoal':
                return `Goal: ${settings.goalNumProblems} correct`;
            case 'countdownGoal':
                return `${timeStr()} timer`;
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
