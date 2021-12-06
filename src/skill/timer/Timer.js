import React, { useEffect } from 'react';
import './Timer.css';

/** Timer component for McCool Math app 
 * Timer is triggered when runTimer is set to true
 * Timer counts up from 0
 * formattedTime function calculates time to display for countdown timer
 * formatterTime function also removes warning time for display time
*/
const Timer = ({ settings, timer, setTimer, setComplete }) => {

    const countdownLength = settings.timerType === 'count-down' ? settings.timerStart + settings.warningLength : null;
    
    //Counts up from 0 when runTimer is set to true
    //Countdown timer stops when time is ellapsed
    useEffect(() => {
        let timerId;
    
        if (timer.runTimer) {
            let startTime = Date.now();    

            timerId = setInterval(() => {
                let timeEllapsed = Date.now() - startTime;

                if (settings.timerType === 'count-down' && countdownLength - timeEllapsed < 100) {
                    setTimer({
                        time: timeEllapsed,
                        runTimer: false
                    });
                    setComplete(true);
                } else {
                    setTimer({
                        time: timeEllapsed,
                        runTimer: true
                    });
                }
            }, 1000);
        } else {
            clearInterval(timerId);
        }
        return () => clearInterval(timerId);
    }, [timer.runTimer]);

    //Countdown time to display calculated from internatl time
    //Does not inclue warning time in time to display
    const formattedTime = () => {
        let timerTime = settings.timerType === 'count-down' ? 
                            countdownLength - timer.time : 
                            timer.time - settings.warningLength;

        // Show start value while warning timer runs
        if (settings.timerType === 'count-up' && timerTime < 0) {
            timerTime = 0;
        } else if (settings.timerType === 'count-down' && timerTime > settings.timerStart) {
            timerTime = settings.timerStart;
        }

        let totalSeconds = Math.round(timerTime / 1000)
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        let minStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
        let secStr = seconds < 10 ? `0${seconds}` : `${seconds}`;

        let timeStr = `${minStr}:${secStr}`
        return timeStr;
    }

    if (timer.time===null) return null;

    return (
        <div className="Timer">
            {formattedTime()}
        </div>
    )
}

export default Timer;


