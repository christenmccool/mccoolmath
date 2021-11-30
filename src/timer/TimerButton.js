import React from 'react';
import './TimerButton.css';

const TimerButton = ({ initialTime, warningTime, setWarningTime, time, setTime, runTimer, setRunTimer }) => {

    const buttonText = () => {
        if (runTimer===true) {
            return "Stop";
        } else if (runTimer===false && time===initialTime && warningTime===5) {
            return "Start";
        } else {
            return "Reset";
        }
    }

    const handleButtonClick = () => {
        if (runTimer===false && time===initialTime && warningTime===5) {
            return () => setRunTimer(true);
        } else if (runTimer===false) {
            return () => {
                setWarningTime(5);
                setTime(initialTime);
            }
        } else {
            return () => setRunTimer(false);
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
