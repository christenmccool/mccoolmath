import React, { useEffect } from 'react';

import './Timer.css';

const Timer = ({timerState, timerDispatch, timer, setTimer}) => {
    
    useEffect(() => {
        setTimer({...timer, time: timer.initialTime});
    }, [timer.initialTime])

    useEffect(() => {
        let timerId;
    
        if (timer.runTimer) {
            let currTime = Date.now();                

            if (timer.timerType === 'count-up') {
                timerId = setInterval(() => {
                    let timeEllapsed = Date.now() - currTime;
                    if (timeEllapsed <= 5000) {
                        setTimer({...timer, warningTime: Math.round((5000 - timeEllapsed)/1000)});
                    } else {
                        setTimer({...timer, warningTime: 0, time: timeEllapsed - 5000});
                    }
                }, 1000);
            } else if (timer.timerType === 'count-down') {
                timerId = setInterval(() => {
                    let timeEllapsed = Date.now() - currTime;
                    if (timeEllapsed <= 5000) {
                        setTimer({...timer, warningTime: Math.round((5000 - timeEllapsed)/1000)});
                    } else {
                        let timeRemaining = 5000 + timer.initialTime - timeEllapsed;
                        if (timeRemaining < 100) {
                            clearInterval(timerId);
                            setTimer({...timer, runTimer: false});
                        } else {
                            setTimer({...timer, warningTime: 0, time: timeRemaining});
                        }
                    }
                }, 1000);
            }
        } else {
            clearInterval(timerId);
        }
    
        return () => clearInterval(timerId);
    }, [timer.runTimer]);

    const formatTime = (time) => {
        let totalSeconds = Math.round(time / 1000)

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

    return (
        <div className="Timer">
            {formatTime(timer.time)}
        </div>
    )
}

export default Timer;
