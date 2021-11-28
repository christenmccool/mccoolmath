import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = ({ time, setTime, runTimer, setRunTimer }) => {
    const [initialTime, setInitialTime] = useState(0);
    const [timerType, setTimerType] = useState("count-up");

    useEffect(() => {
        setTime(initialTime);
    }, [initialTime])


    useEffect(() => {
        let timerId;
    
        if (runTimer) {
            let currTime = Date.now();                

            if (timerType === 'count-up') {
                timerId = setInterval(() => {
                    let timeEllapsed = initialTime + Date.now() - currTime;
                    setTime(timeEllapsed);
                }, 1000);
            } else if (timerType === 'count-down') {
                timerId = setInterval(() => {
                    let timeRemaining = initialTime - (Date.now() - currTime);
                    console.log(timeRemaining);
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
    }, [runTimer]);

    const formatTime = (time) => {
        let totalSeconds = Math.round(time / 1000) - 5;

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

    const toggleRunTimer = () => {
        if (time===initialTime) {
            setRunTimer(true);
        } else {
            setRunTimer(false);
        }
    }

    const resetTimer = () => {
        setRunTimer(false);
        setTime(initialTime);
    }

    const renderStartBtn = () => {
        if (time===initialTime) {
            return "Start"
        } 
        return "Stop";
    }

    return (
        <div className="Timer">
            <div className="Timer-display">
                <h1>{formatTime(time)}</h1>
            </div>
            <div className="Timer-buttons">
                <button className="Timer-start-btn" type="button" onClick={toggleRunTimer}>
                    {renderStartBtn()}
                </button>
                <button className="Timer-reset-btn" type="button" onClick={resetTimer}>Reset</button>
            </div>
        </div>
    )
}

export default Timer;
