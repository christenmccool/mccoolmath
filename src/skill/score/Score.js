import React from 'react';
import './Score.css';

const Score = ({ score }) => {

    return (
        <div className="Score">
            <div>
                Correct: {score.correct}
            </div>
            <div >
                Attempts: {score.attempts}
            </div>
        </div>
    )
}

export default Score;

