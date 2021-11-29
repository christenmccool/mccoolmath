import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Options from './Options';
import Problem from './Problem';
import FiveSecCount from './FiveSecCount';
import Score from './Score';
import Timer from './Timer';
import './ProblemPage.css';

const ProblemPage = () => {
    const {skill} = useParams();

    const INITIAL_STATE = {
        latex: null, 
        problemType: null, 
        args: null,
        userAnswer: null,
        correctAnswer: null, 
        status: null,
        previousUserAnswers: []
    }

    const [problem, setProblem] = useState(INITIAL_STATE);
    const [score, setScore] = useState({correct: 0, attempts: 0});
    const [time, setTime] = useState(0);
    const [runTimer, setRunTimer] = useState(false);

    const countdownTime = () => {
        return 5 - Math.round(time / 1000);
    }

    return (
        <div className="ProblemPage">
            <div className="ProblemPage-main">
                <Options />
                <Problem 
                    INITIAL_STATE={INITIAL_STATE}
                    problem={problem}
                    setProblem={setProblem}
                    setScore={setScore} 
                />
                {runTimer && time < 6000 ?
                    <div className="ProblemPage-countdown">
                        <FiveSecCount
                            time={countdownTime()}
                        />
                    </div>
                : null}
            </div>
            <div className="ProblemPage-info">
                <div className="ProblemPage-scores">
                    <Score score={score} />
                </div>
                <div className="ProblemPage-timer">
                    <Timer 
                        time={time}
                        setTime={setTime}
                        runTimer={runTimer}
                        setRunTimer={setRunTimer}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProblemPage;