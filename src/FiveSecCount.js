import React from 'react';
import './FiveSecCount.css'

const FiveSecCount = ({time}) => {

    return (
        <div className="FiveSecCount">
            <div className="FiveSecCount-text">
                {time ? time : "Go!"}
            </div>
        </div>  
    )
}

export default FiveSecCount;


