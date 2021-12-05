import React, { useEffect, useState, useRef } from 'react';

import ModeForm from './mode/ModeForm';
import Options from './options/Options';
import SkillMessage from './SkillMessage';
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
 * XXX
*/
const Skill = () => {

    const [settings, setSettings] = useState(INITIAL_SETTING_STATE);
    const [problem, setProblem] = useState(INITIAL_PROB_STATE);
    const [timer, setTimer] = useState(INITIAL_TIMER_STATE);
    const [score, setScore] = useState(INITIAL_SCORE_STATE);
    const startButtonRef = useRef();

    const resetScore = () => setScore(INITIAL_SCORE_STATE);
    const resetTimer = () => setTimer(INITIAL_TIMER_STATE);

    const toggleEditMode = () => {
        setSettings({...settings, 
            editingMode:!settings.editingMode
        })
        setTimer({
            ...timer,
            runTimer: false
        })
    }

    const numProbComplete = settings.mode==="numProbGoal" && score.correct===settings.goalNumProblems;
    const countdownComplete = settings.mode==="countdownGoal" && timer.time>(settings.timerStart + settings.warningLength);

    useEffect(() => {
        if (numProbComplete || countdownComplete) {
            setTimer({...timer,
                runTimer: false});
            startButtonRef.current.focus();
        }
    }, [timer.time, score.correct])

    const skillMessageText = () => {
        if (numProbComplete || countdownComplete) return `${score.correct} problems complete!`;
        return null;
    }

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
                {skillMessageText() || timer.time < settings.warningLength ?
                    <HoldingScreen 
                        text={skillMessageText() || "Get Ready!"}
                    /> 
                    :
                    <Problem 
                        problem={problem}
                        setProblem={setProblem}
                        setScore={setScore} 
                    /> 
                }
                <div className="Skill-warning-timer">
                    <WarningTimer
                        warningLength={settings.warningLength}
                        timer={timer}
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
                        setTimer={setTimer}
                        resetScore={resetScore}
                        refToAccess={startButtonRef}
                    /> 
                </div>
                : null}
            </div>
        </div>
    )
}

export default Skill;