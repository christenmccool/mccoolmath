import React from 'react';
import './Goal.css';

const Goal = ({ numProb }) => {

    return (
        <div className="Goal">
            Goal: {numProb ? `${numProb} correct` : `Max correct`}
        </div>
    )    
}

export default Goal;
