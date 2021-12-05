import React, { useEffect } from 'react';

import './Timer.css';

const Timer = ({ settings, timer, setTimer }) => {

    const countdownLength = settings.timerType === 'count-down' ? settings.timerStart + settings.warningLength : null;
    
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
                } else {
                    setTimer({...timer, 
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


    const formattedTime = () => {
        let timerTime = settings.timerType === 'count-down' ? 
                            countdownLength - timer.time : 
                            timer.time - settings.warningLength;

        if (settings.timerType === 'count-down' && timerTime > settings.timerStart) {
            timerTime = settings.timerStart;
        }

        let totalSeconds = Math.round(timerTime / 1000)

        if (totalSeconds < 0) {
            totalSeconds = 0;
        }

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
