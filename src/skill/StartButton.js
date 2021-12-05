import React from 'react';
import './StartButton.css';

/** Start Button component for McCool Math app 
 * on "Start": starts timer at zero, resets score and problem
 * on "Stop": stops timer
 * on "Reset": sets timer.time to null, reset score
*/
const StartButton = ({ timer, setTimer, resetScore, refToAccess }) => {

    const buttonText = () => {
        //Timer is not running and time is at null
        if (timer.runTimer===false && timer.time===null) {
            return "Start";
        //Timer is not running but time has a value (timer was running)
        } else if (timer.runTimer===false) {
            return "Reset";
        //Timer is running
        } else {
            return "Stop"
        }
    }
    const handleButtonClick = () => {
        //"Start": start timer with timer.time at 0, reset score
        if (timer.runTimer===false && timer.time===null) {
            return () => {
                setTimer({
                    time: 0,
                    runTimer: true
                });
                resetScore();
            }
        //"Reset": set timer.time to null, reset score
        } else if (timer.runTimer===false) {
            return () => {
                setTimer({
                    time: null,
                    runTimer: false
                });
                resetScore();
            }
        //"Stop": stop timer 
        } else {
            return () => {
                setTimer({
                    ...timer, 
                    runTimer: false
                });
            }
        }
    }

    return (
        <div className="StartButton">
            <button className="Timer-start-btn" type="button" onClick={handleButtonClick()} ref={refToAccess}>
                {buttonText()}
            </button>
        </div>
    )
}

export default StartButton;
