import React from 'react';
import Button from './Button';

/** Start Button component for McCool Math app 
 * on "Start": starts timer at zero, resets score and problem
 * on "Stop": stops timer
 * on "Reset": sets timer.time to null, reset score
*/
const StartButton = ({ timer, startTimer, stopTimer, resetTimer, resetScore, refToAccess }) => {

    const buttonText = () => {
        if (timer.runTimer===false && timer.time===null) {
            return "Start";
        } else if (timer.runTimer===false) {
            return "Reset";
        } else {
            return "Stop"
        }
    }
    const handleButtonClick = () => {
        //"Start": start timer at 0, reset score
        if (timer.runTimer===false && timer.time===null) {
            return () => {
                startTimer();
                resetScore();
            }
        //"Reset": set time to null, reset score
        } else if (timer.runTimer===false) {
            return () => {
                resetTimer();
                resetScore();
            }
        //"Stop": stop timer 
        } else {
            return stopTimer;
        }
    }

    return (
        <Button text={buttonText()} type="start" handleClick={handleButtonClick()} refToAccess={refToAccess} />
    )
}

export default StartButton;
