import React, { useState } from 'react';
import Options from '../options/Options';
import Problem from '../problem/Problem';
import Timer from '../timer/Timer';
import Score from '../score/Score';
import TimerButton from '../timer/TimerButton';
import WarningTimer from '../timer/WarningTimer';
import GoalWrapper from '../goal/GoalWrapper';
import './ProblemPage.css';

const ProblemPage = () => {

    const INITIAL_TIMER_STATE = {
        initialTime: 0,
        timerType: 'count-up',
        time: 0,
        warningTime: 5,
        runTimer: false
    }

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
    const [timer, setTimer] = useState(INITIAL_TIMER_STATE);
    const [score, setScore] = useState({correct: 0, attempts: 0});
    const [editGoal, setEditGoal] = useState(false);


    return (
        <div className="ProblemPage">
            <div className="ProblemPage-main">
                <Options />
                <Problem 
                    problem={problem}
                    setProblem={setProblem}
                    setScore={setScore} 
                />
                {(timer.runTimer && timer.warningTime!==-1) || (!timer.runTimer && timer.warningTime !== 5 && timer.warningTime >= 0) ?
                    <div className="ProblemPage-warning">
                        <WarningTimer
                            time={timer.warningTime}
                        />
                    </div>
                : null}
                <div className="ProblemPage-timer">
                    <Timer 
                        timer={timer}
                        setTimer={setTimer}
                    />
                </div>
            </div>
            <div className="ProblemPage-info">
                {!editGoal ? 
                    <div className="ProblemPage-stats">
                        <div className="ProblemPage-stat">
                            <Score 
                                score={score}
                            />    
                        </div>
                        <div className="ProblemPage-stat">
                            <TimerButton 
                                timer={timer}
                                setTimer={setTimer}
                            />
                        </div>
                    </div>
                : null}
                <GoalWrapper 
                    editGoal={editGoal} 
                    setEditGoal={setEditGoal}
                    setScore={setScore}
                    timer={timer}
                    setTimer={setTimer}
                />
            </div>
        </div>
    )
}

export default ProblemPage;