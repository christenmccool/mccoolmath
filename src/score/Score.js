import React from 'react';
import './Score.css';

const Score = ({ score }) => {

    return (
        <div className="Score">
            <div className="Score-score">
                Correct: {score.correct}
            </div>
            <div className="Score-score">
                Attempts: {score.attempts}
            </div>
        </div>
    )
}

export default Score;

