import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Options from '../options/Options';
import Problem from '../problem/Problem';
import Timer from '../timer/Timer';
import Score from '../score/Score';
import TimerButton from '../timer/TimerButton';
import WarningTimer from '../timer/WarningTimer';
import GoalWrapper from '../goal/GoalWrapper';
import './ProblemPage.css';

const ProblemPage = () => {
    const {skill} = useParams();

    const INITIAL_PROB_STATE = {
        latex: null, 
        problemType: null, 
        args: null,
        userAnswer: null,
        correctAnswer: null, 
        status: null,
        previousUserAnswers: []
    }



    const [problem, setProblem] = useState(INITIAL_PROB_STATE);
    const [score, setScore] = useState({correct: 0, attempts: 0});
    const [initialTime, setInitialTime] = useState(0);
    const [timerType, setTimerType] = useState('count-up');
    const [time, setTime] = useState(0);
    const [warningTime, setWarningTime] = useState(5);
    const [runTimer, setRunTimer] = useState(false);

    return (
        <div className="ProblemPage">
            <div className="ProblemPage-main">
                <Options />
                <Problem 
                    INITIAL_STATE={INITIAL_PROB_STATE}
                    problem={problem}
                    setProblem={setProblem}
                    setScore={setScore} 
                />
                {(runTimer && warningTime>=0) || (!runTimer && warningTime !== 5 && warningTime >= 0) ?
                    <div className="ProblemPage-warning">
                        <WarningTimer
                            time={warningTime}
                        />
                    </div>
                : null}
                <div className="ProblemPage-timer">
                    <Timer 
                        initialTime={initialTime}
                        setInitialTime={setInitialTime}
                        timerType={timerType}
                        setTimerType={setTimerType}
                        time={time}
                        setTime={setTime}
                        warningTime={warningTime}
                        setWarningTime={setWarningTime}
                        runTimer={runTimer}
                        setRunTimer={setRunTimer}
                    />
                </div>
            </div>
            <div className="ProblemPage-info">
                <Score 
                    score={score}
                />    
                <TimerButton 
                    initialTime={initialTime}
                    setInitialTime={setInitialTime}
                    setTimerType={setTimerType}
                    time={time}
                    setTime={setTime}
                    warningTime={warningTime}
                    setWarningTime={setWarningTime}
                    runTimer={runTimer}
                    setRunTimer={setRunTimer}
                />
                <GoalWrapper 
                    initialTime={initialTime}
                    setInitialTime={setInitialTime}
                    timerType={timerType}
                    setTimerType={setTimerType}
                />
            </div>
        </div>
    )
}

export default ProblemPage;