import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ModeForm from './mode/ModeForm';
import Options from './options/Options';
import HoldingScreen from './HoldingScreen';
import Problem from './problem/Problem';
import Timer from './timer/Timer';
import WarningTimer from './timer/WarningTimer';
import Score from './score/Score';
import ModeWrapper from './mode/ModeWrapper';
import StartButton from './StartButton';

import opts from '../app/opts';
import { INITIAL_TIMER_STATE, INITIAL_OPT_STATE, INITIAL_PROB_STATE, INITIAL_SCORE_STATE, INITIAL_SETTING_STATE } from './initialValues';
import './Skill.css';

/** Skill component for McCool Math app 
 * Three modes:
 * - Practice: no timer
 * - Number of problems goal: complete selected number of problems with countup timer
 * - Countdown goal: complete max problems given countdown timer
 * Timer components display during goal modes (not practice)
 * Score and current mode displayed for all modes
 * Display message when goal is completed
 * Renders ModeForm when editing mode
 * Redirects to Not Found page if not a valid skill
*/
const Skill = () => {
    const {skill} = useParams();
    const navigate = useNavigate();

    const [settings, setSettings] = useState(INITIAL_SETTING_STATE);
    const [option, setOption] = useState(INITIAL_OPT_STATE);
    const [problem, setProblem] = useState(INITIAL_PROB_STATE);
    const [timer, setTimer] = useState(INITIAL_TIMER_STATE);
    const [score, setScore] = useState(INITIAL_SCORE_STATE);
    const [complete, setComplete] = useState(false);

    const startButton = useRef();

    //Functions passed to components to change state
    const resetScore = () => setScore(INITIAL_SCORE_STATE);
    const startTimer = () => setTimer({time: 0, runTimer: true});
    const stopTimer = () => setTimer({...timer, runTimer: false});
    const resetTimer = () => setTimer(INITIAL_TIMER_STATE);
    const resetProblem = () => setProblem(INITIAL_PROB_STATE);

    //Navigate to "Not Found" page if not a valid skill
    useEffect(() => {
        if (!opts[skill]) {
            navigate("/404");
            return;
        }
    }, [skill])

    //Set focus to start button before user selects start
    useEffect(() => {
        if (settings.mode !== "practice" && timer.time === null) {
            startButton.current.focus();
        }
    }, [settings.mode, timer.time])

    //Stop timer and set complete to false when toggling to edit mode
    const toggleEditMode = () => {
        if (!settings.editingMode) {
            stopTimer();
            setComplete(false);
        }
        setSettings({...settings, editingMode: !settings.editingMode})
    }

    //Check to see if number of problems goal is complete
    useEffect(() => {
        if (settings.mode !== "numProbGoal") return;
        if (score.correct === settings.goalNumProblems) {
            setComplete(true);
            stopTimer();
        }
    }, [score.correct])

    //Display message when goal is complete
    const completeMessage = () => {
        if (complete) return `${score.correct} problems complete!`;
        return null;
    }

    //Calculate warning countdown time
    const warningTime = () => {           
        let warningTime = Math.round((settings.warningLength - timer.time) / 1000);
        if (warningTime >= 0) {
            return warningTime;
        } 
        return null;
    }

    //Prevent initial render if not a valid skill
    if (!opts[skill]) {
        return null;
    }
    
    //Render ModeForm if editing mode
    if (settings.editingMode) {
        return (
            <div className="Skill">
                <ModeForm 
                    settings={settings}
                    setSettings={setSettings}
                    toggleEditMode={toggleEditMode}
                    resetScore={resetScore}
                    resetTimer={resetTimer}
                    resetProblem={resetProblem}
                /> 
            </div>
        )
    }

    //Render if not editing mode
    return (
        <div className="Skill">
            <div className="Skill-main">
                <Options 
                    option={option} 
                    setOption={setOption} 
                    resetScore={resetScore}
                    resetTimer={resetTimer}
                    resetProblem={resetProblem}
                />

                {completeMessage() || warningTime() > 0 ?
                    <HoldingScreen 
                        text={completeMessage() || "Get Ready!"}
                    /> 
                : null }

                <Problem 
                    visible={!completeMessage() && !warningTime()}
                    option={option} 
                    problem={problem}
                    setProblem={setProblem}
                    setScore={setScore} 
                /> 

                {timer.time !== null ?
                    <>
                        <div className="Skill-warning-timer">
                            <WarningTimer
                                warningTime={warningTime()}
                            />
                        </div>
                        <div className="Skill-timer">
                            <Timer 
                                settings={settings}
                                timer={timer}
                                setTimer={setTimer}
                                setComplete={setComplete}
                            />
                        </div>
                    </>
                : null}
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
                            setComplete={setComplete}
                            refToAccess={startButton}
                        /> 
                    </div>
                : null}
            </div>
        </div>
    )
}

export default Skill;