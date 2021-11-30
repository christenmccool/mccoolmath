import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faWindowClose } from '@fortawesome/free-regular-svg-icons';
import './GoalForm.css';

const GoalForm = ({ numProb, setNumProb, timerType, setTimerType, initialTime, setInitialTime, toggleEditGoal }) => {
    let totalSeconds = Math.round(initialTime / 1000);
    let initialMinutes = Math.floor(totalSeconds / 60);
    let initialSeconds = totalSeconds % 60;

    const [goalMin, setGoalMin] = useState(initialMinutes);
    const [goalSec, setGoalSec] = useState(initialSeconds);
    const [goalNumProb, setGoalNumProb] = useState(numProb || 25);
    const [goalTimerType, setGoalTimerType] = useState(timerType);
    // const [timerType, setTimerType] = useState('count-down');

    const handleCheckChange = (evt) => {
        setGoalTimerType(evt.target.value)
        if (evt.target.value==='count-down') {
            const defaultSec = initialSeconds || 0;
            const defaultMin = !initialSeconds && !initialMinutes ? 1 : initialMinutes;
            setGoalMin(defaultMin);
            setGoalSec(defaultSec);
        } else {
            setGoalMin(0);
            setGoalSec(0);
        }
    }

    const handleMinChange = (evt) => {
        setGoalMin(evt.target.value);
    }

    const handleSecChange = (evt) => {
        setGoalSec(evt.target.value);
    }

    const handleNumProbChange = (evt) => {
        setGoalNumProb(evt.target.value);
    }
    
    const submitEdits = () => {
        setTimerType(goalTimerType);
        if (goalTimerType === 'count-up') {
            setInitialTime(0);
            setNumProb(goalNumProb);
        } else {
            setNumProb(null);
            setInitialTime(goalMin * 60000 + goalSec * 1000);
        }
        toggleEditGoal();
    }

    return (
        <div className="GoalForm">
            <div className="GoalForm-radio-inputs">
                <div>
                    <input 
                        type="radio" 
                        id="count-up" 
                        name="goalTimerType" 
                        value="count-up" 
                        checked={goalTimerType==='count-up'}
                        onChange={handleCheckChange} 
                    />
                    <label htmlFor="count-up">Number of Problems</label>
                </div>

                <div>
                    <input 
                        type="radio" 
                        id="count-down" 
                        name="goalTimerType" 
                        value="count-down" 
                        checked={goalTimerType==='count-down'}
                        onChange={handleCheckChange} 
                    />
                    <label htmlFor="count-down">Time</label>
                </div>
            </div>

            {goalTimerType === 'count-down' ? 
                <div className="GoalForm-select">
                    <select onChange={handleMinChange} value={goalMin}>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    :
                    <select onChange={handleSecChange} value={goalSec}>
                        <option value="0">00</option>
                        <option value="30">30</option>
                    </select>
                </div>
            :  
            <div className="GoalForm-select">
                <select onChange={handleNumProbChange} value={goalNumProb}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            }

            <div className="GoalForm-icons">   
                <div className="GoalForm-icon">                    
                    <FontAwesomeIcon icon={faCheckSquare} onClick={submitEdits} />
                </div>
                <div className="GoalForm-icon">                    
                    <FontAwesomeIcon icon={faWindowClose} onClick={toggleEditGoal} />
                </div>
            </div>
        </div>
    )
}

export default GoalForm;