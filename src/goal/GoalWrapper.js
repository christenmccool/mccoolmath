import React, {useState} from 'react';
import Goal from './Goal';
import GoalForm from './GoalForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import './GoalWrapper.css';

const GoalWrapper = ({ editGoal, setEditGoal, setScore, timer, setTimer }) => {
    const [numProb, setNumProb] = useState(25);

    const toggleEditGoal = () => {
        if (!editGoal) {
            setScore({correct: 0, attempts: 0});
            setTimer({...timer, time:timer.initialTime, warningTime: 5, runTimer: false})
        }
        setEditGoal(!editGoal);
    }

    return (
        <div className="GoalWrapper">
            {editGoal ?
            <>
                <GoalForm 
                    numProb={numProb}
                    setNumProb={setNumProb}
                    timer={timer}
                    setTimer={setTimer}
                    toggleEditGoal={toggleEditGoal}
                />
            </>
            :
            <>
                <div className="GoalWrapper-goal">
                    <Goal 
                        numProb={numProb}
                    />
                    <FontAwesomeIcon icon={faEdit}  onClick={toggleEditGoal}/>
                </div>   
            </>

            }



        </div>
    )    
}

export default GoalWrapper;

