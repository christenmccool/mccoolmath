import React from 'react';
import './WarningTimer.css'


const WarningTimer = ({ time }) => {

    return (
        <div className="WarningTimer">
            <div className="WarningTimer-text">
                {time}
            </div>
        </div>  
    )
}

export default WarningTimer;


