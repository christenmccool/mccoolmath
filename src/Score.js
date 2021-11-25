import React from 'react';
import { useSelector } from 'react-redux';
import './Score.css';

const Score = () => {
    const scores = useSelector(state => state.scores);

    return (
        <div className="Score">
            <div>
                Correct: {scores.totalCorrect}
            </div>
            <div>
                Attempts: {scores.totalAttempts}
            </div>
        </div>
    )
}

export default Score;

