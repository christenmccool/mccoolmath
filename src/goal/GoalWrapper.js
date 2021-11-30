import React, {useState} from 'react';
import Goal from './Goal';
import GoalForm from './GoalForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import './GoalWrapper.css';

const GoalWrapper = ({ timer, setTimer }) => {
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

