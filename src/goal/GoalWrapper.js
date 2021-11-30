import React, {useState} from 'react';
// import Score from './Score';
import Goal from './Goal';
// import Timer from './Timer';
import GoalForm from './GoalForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import './GoalWrapper.css';

const GoalWrapper = ({ initialTime, setInitialTime, timerType, setTimerType }) => {
    const [numProb, setNumProb] = useState(25);
    const [editGoal, setEditGoal] = useState(false);

    const toggleEditGoal = () => {
        setEditGoal(!editGoal)
    }

    return (
        <div className="GoalWrapper">
            {editGoal ?
            <>
                <GoalForm 
                    numProb={numProb}
                    setNumProb={setNumProb}
                    timerType={timerType}
                    setTimerType={setTimerType}
                    initialTime={initialTime}
                    setInitialTime={setInitialTime}
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

