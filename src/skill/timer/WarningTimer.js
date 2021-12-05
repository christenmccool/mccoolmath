import React from 'react';
import './WarningTimer.css'


const WarningTimer = ({ warningLength, timer }) => {

    const warningTime = () => {        
        
        let warningTime = Math.round((warningLength - timer.time) / 1000);

        if (warningTime > 0) {
            return warningTime;
        } else if (warningTime === 0) {
            return "Go!";
        } 
        return null;
    }

    if (timer.time===null) return null;

    return (
        <div className="WarningTimer">
            <div className="WarningTimer-text">
                {warningTime()}
            </div>
        </div>  
    )
}

export default WarningTimer;


