import React, { useEffect, useState, useRef } from 'react';

import ModeForm from './mode/ModeForm';
import Options from './options/Options';
import HoldingScreen from './HoldingScreen';
import Problem from './problem/Problem';
import Timer from './timer/Timer';
import WarningTimer from './timer/WarningTimer';
import Score from './score/Score';
import ModeWrapper from './mode/ModeWrapper';
import StartButton from './StartButton';

import { INITIAL_SETTING_STATE, INITIAL_TIMER_STATE, INITIAL_PROB_STATE, INITIAL_SCORE_STATE } from './initialValues';
import './Skill.css';

/** Skill component for McCool Math app 
 * Three modes:
 * - Practice: no timer
 * - Number of problems goal: complete selected number of problems with countup timer
 * - Countdown goal: complete max problems given countdown timer
 * Timer components only render values during goal modes
 * Score and current mode displayed for all modes
 * Edit mode and timer/goal settings with ModeForm component
*/
const Skill = () => {

    const [settings, setSettings] = useState(INITIAL_SETTING_STATE);
    const [problem, setProblem] = useState(INITIAL_PROB_STATE);
    const [timer, setTimer] = useState(INITIAL_TIMER_STATE);
    const [score, setScore] = useState(INITIAL_SCORE_STATE);

    const startButton = useRef();

    const resetScore = () => setScore(INITIAL_SCORE_STATE);
    const startTimer = () => setTimer({time: 0, runTimer: true});
    const stopTimer = () => setTimer({...timer, runTimer: false});
    const resetTimer = () => setTimer(INITIAL_TIMER_STATE);
    const resetProblem = () => setProblem(INITIAL_PROB_STATE);

    const toggleEditMode = () => {
        setSettings({...settings, editingMode:!settings.editingMode})
        stopTimer();
    }

    //If number of problem goal is met or countdown timer is complete, display message
    const numProbCompleted = settings.mode==="numProbGoal" && score.correct===settings.goalNumProblems;
    const countdownCompleted = settings.mode==="countdownGoal" && timer.time+100>(settings.timerStart + settings.warningLength);

    useEffect(() => {
        if (numProbCompleted || countdownCompleted) stopTimer();
    }, [timer.time, score.correct])

    const completedMessage = () => {
        if (numProbCompleted || countdownCompleted) return `${score.correct} problems complete!`;
        return null;
    }

    //Focus on start button before user selects start
    useEffect(() => {
        if (settings.mode !== "practice" && timer.time===null) {
            startButton.current.focus();
        }
    }, [settings.mode, timer.time]);

    if (settings.editingMode) {
        return (
            <div className="Skill">
                <ModeForm 
                    settings={settings}
                    setSettings={setSettings}
                    toggleEditMode={toggleEditMode}
                    resetScore={resetScore}
                    resetTimer={resetTimer}
                /> 
            </div>
        )
    }

    return (
        <div className="Skill">
            <div className="Skill-main">
                <Options />
                {completedMessage() || timer.time < settings.warningLength ?
                    <HoldingScreen 
                        text={completedMessage() || "Get Ready!"}
                    /> 
                : null }
                <Problem 
                    visible={!completedMessage() && timer.time >= settings.warningLength}
                    problem={problem}
                    setProblem={setProblem}
                    setScore={setScore} 
                /> 
                <div className="Skill-warning-timer">
                    <WarningTimer
                        warningLength={settings.warningLength}
                        time={timer.time}
                    />
                </div>
                <div className="Skill-timer">
                    <Timer 
                        settings={settings}
                        timer={timer}
                        setTimer={setTimer}
                    />
                </div>
            </div>

            <div className="Skill-info">
                <div className="Skill-info-sub">
                    <Score 
                        score={score}
                    />   
                    <ModeWrapper 
                        settings={settings} 
                        toggleEditMode={toggleEditMode}
                    />
                </div>

                {settings.mode !== 'practice' ? 
                    <div className="Skill-start-button">
                        <StartButton 
                            timer={timer}
                            startTimer={startTimer}
                            stopTimer={stopTimer}
                            resetTimer={resetTimer}
                            resetScore={resetScore}
                            resetProblem={resetProblem}
                            refToAccess={startButton}
                        /> 
                    </div>
                : null}
            </div>
        </div>
    )
}

export default Skill;