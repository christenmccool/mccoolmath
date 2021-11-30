import React, { useEffect } from 'react';
import './Timer.css';

const Timer = ({ initialTime, timerType, warningTime, setWarningTime, time, setTime, runTimer, setRunTimer }) => {

    useEffect(() => {
        setTime(initialTime);
    }, [initialTime])

    useEffect(() => {
        let timerId;
    
        if (runTimer) {
            let initialWarningTime = 5000;
            let currTime = Date.now();                

            timerId = setInterval(() => {   
                let timeRemaining = initialWarningTime - (Date.now() - currTime);
                if (timeRemaining < -500) {
                    clearInterval(timerId);
                }
                setWarningTime(Math.round(timeRemaining / 1000));
            }, 1000);
        } else {
            clearInterval(timerId);
        }
    
        return () => clearInterval(timerId);
    }, [runTimer]);

    useEffect(() => {
        let timerId;
    
        if (runTimer && warningTime <=0) {
            let currTime = Date.now();                

            if (timerType === 'count-up') {
                timerId = setInterval(() => {
                    let timeEllapsed = Date.now() - currTime;
                    setTime(timeEllapsed);
                }, 1000);
            } else if (timerType === 'count-down') {
                timerId = setInterval(() => {
                    let timeRemaining = initialTime - (Date.now() - currTime);
                    if (timeRemaining < 100) {
                        clearInterval(timerId);
                        setRunTimer(false);
                    }
                    setTime(timeRemaining);
                }, 1000);
            }
        } else {
            clearInterval(timerId);
        }
    
        return () => clearInterval(timerId);
    }, [runTimer, warningTime]);

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
            {formatTime(time)}
        </div>
    )
}

export default Timer;
