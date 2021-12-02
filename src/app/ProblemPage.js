import React, { useState } from 'react';
import Options from '../options/Options';
import HoldingScreen from './HoldingScreen';
import Problem from '../problem/Problem';
import Timer from '../timer/Timer';
import Score from '../score/Score';
import StartButton from './StartButton';
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

    const INITIAL_SCORE_STATE = {
        correct: 0, 
        attempts: 0
    }

    const [problem, setProblem] = useState(INITIAL_PROB_STATE);
    const [timer, setTimer] = useState(INITIAL_TIMER_STATE);
    const [score, setScore] = useState(INITIAL_SCORE_STATE);
    const [editGoal, setEditGoal] = useState(false);

    // {!timer.runTimer || (timer.runTimer && !warningTime()) ?

    const warningTime = () => {
        if (timer.warningTime === 0) {
            return "Go!";
        } else if ((timer.runTimer && timer.warningTime!==-1) || 
            (!timer.runTimer && timer.warningTime !== 5 && timer.warningTime >= 0)) {
                return timer.warningTime;
        }
        return null;
    }

    return (
        <div className="ProblemPage">
            <div className="ProblemPage-main">
                <Options />
                {timer.runTimer && warningTime()>0 ?
                    <HoldingScreen /> 
                    :
                    <Problem 
                        problem={problem}
                        setProblem={setProblem}
                        setScore={setScore} 
                    /> 
                }
                <div className="ProblemPage-warning">
                    <WarningTimer
                        time={warningTime()}
                    />
                </div>
                <div className="ProblemPage-timer">
                    <Timer 
                        timer={timer}
                        setTimer={setTimer}
                    />
                </div>
            </div>

            {!editGoal ? 
                <div className="ProblemPage-stats">
                    <Score 
                        score={score}
                    />    
                    <StartButton 
                        setScore={setScore}
                        timer={timer}
                        setTimer={setTimer}
                    />
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
    )
}

export default ProblemPage;