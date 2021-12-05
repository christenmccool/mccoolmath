import React from 'react';
import './WarningTimer.css'

/** Warning countdown component for McCool Math app 
 * Returns null if timer isn't running or if warning length has passed
*/
const WarningTimer = ({ warningLength, time }) => {

    if (time===null) return null;

    const warningTime = () => {        
        
        let warningTime = Math.round((warningLength - time) / 1000);

        if (warningTime > 0) {
            return warningTime;
        } else if (warningTime === 0) {
            return "Go!";
        } 
        return null;
    }

    if (warningTime()===null) return null;

    return (
        <div className="WarningTimer">
            <div className="WarningTimer-text">
                {warningTime()}
            </div>
        </div>  
    )
}

export default WarningTimer;


