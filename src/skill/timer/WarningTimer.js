import React from 'react';
import './WarningTimer.css'

/** Warning countdown component for McCool Math app 
 * Returns null if timer isn't running or if warning length has passed
*/
const WarningTimer = ({ warningTime }) => {

    if (warningTime === null) return null;

    return (
        <div className="WarningTimer">
            <div className="WarningTimer-text">
                {warningTime || "Go!"}
            </div>
        </div>  
    )
}

export default WarningTimer;


