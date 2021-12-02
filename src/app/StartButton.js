import React from 'react';
import './StartButton.css';

const StartButton = ({ setScore, timer, setTimer }) => {

    const buttonText = () => {
        if (timer.runTimer===true) {
            return "Stop";
        } else if (timer.runTimer===false && timer.time===timer.initialTime && timer.warningTime===5) {
            return "Start";
        } else {
            return "Reset";
        }
    }

    const handleButtonClick = () => {
        if (timer.runTimer===false && timer.time===timer.initialTime && timer.warningTime===5) {
            return () => {
                setTimer({...timer, runTimer: true});
                setScore({correct: 0, attempts: 0});
            }
        } else if (timer.runTimer===false) {
            return () => {
                setTimer({...timer, warningTime: 5, time: timer.initialTime});
                setScore({correct: 0, attempts: 0});
            }
        } else {
            return () => setTimer({...timer, runTimer: false});
        }
    }

    return (
        <div className="StartButton">
            <button className="Timer-start-btn" type="button" onClick={handleButtonClick()}>
                {buttonText()}
            </button>
        </div>
    )
}

export default StartButton;
