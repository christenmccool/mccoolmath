import React, { useEffect } from 'react';

import './Timer.css';

const Timer = ({ timer, setTimer }) => {
    
    useEffect(() => {
        setTimer({...timer, time: timer.initialTime});
    }, [timer.initialTime])

    useEffect(() => {
        let timerId;
    
        if (timer.runTimer) {
            let startTime = Date.now();    

            timerId = setInterval(() => {
                let timeEllapsed = Date.now() - startTime;
                let timerTime = timer.timerType === 'count-down' ? 
                                timer.initialTime - timeEllapsed + 5000 : 
                                timeEllapsed - 5000;

                if (timeEllapsed <= 5000) {
                    setTimer({...timer, warningTime: Math.round((5000 - timeEllapsed)/1000)});
                } else if (timer.timerType === 'count-down' && timerTime < 100) {
                    clearInterval(timerId);
                    setTimer({...timer, runTimer: false});
                } else if (timeEllapsed - 5000 < 100) {
                    setTimer({...timer, warningTime: 0, time: timerTime});
                }else {
                    setTimer({...timer, warningTime: -1, time: timerTime});
                }
            }, 1000);
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
