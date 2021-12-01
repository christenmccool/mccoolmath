import React from 'react';
import './TimerButton.css';

const TimerButton = ({ timer, setTimer }) => {

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
            return () => setTimer({...timer, runTimer: true});
        } else if (timer.runTimer===false) {
            return () => {
                setTimer({...timer, warningTime: 5, time: timer.initialTime});
            }
        } else {
            return () => setTimer({...timer, runTimer: false});
        }
    }

    return (
        <div className="TimerButton">
            <button className="Timer-start-btn" type="button" onClick={handleButtonClick()}>
                {buttonText()}
            </button>
        </div>
    )
}

export default TimerButton;
