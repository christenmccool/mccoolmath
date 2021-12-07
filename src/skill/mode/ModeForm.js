import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faWindowClose } from '@fortawesome/free-regular-svg-icons';
import './ModeForm.css';

/** Edit Mode Form for McCool Math app 
 * Three modes:
 * - Practice: no timer
 * - Number of problems goal: User selects number of problems to complete with countup timer
 * - Countdown goal: User selects length of countdown timer
*/
const ModeForm = ({ settings, setSettings, toggleEditMode, resetScore, resetTimer, resetProblem }) => {

    const WARNING_LENGTH = 3000;
    
    //Initialize form to reflect user's current mode
    const currTotalSec = settings.timerStart ? Math.round(settings.timerStart / 1000) : 0;
    const currMin = Math.floor(currTotalSec / 60);
    const currSec = currTotalSec % 60;

    const initialFormData = {
        mode: settings.mode,
        timerStartMin: !currSec && !currMin ? 1 : currMin,
        timerStartSec: currSec,
        goalNumProblems: settings.goalNumProblems || 25
    }

    const [formData, setFormData] = useState(initialFormData);
    const [warning, setWarning] = useState(null);

    const iconClass = warning ? "ModeForm-checkIcon-disabled" : "";

    //Display warning if user select 0 min and sec for countdown timer
    useEffect(() => {
        if (formData.mode==="countdownGoal" && formData.timerStartMin===0 && formData.timerStartSec===0) {
            setWarning("Countdown timer cannot be zero");
        } else {
            setWarning(null);
        }
    }, [formData.mode, formData.timerStartMin, formData.timerStartSec])

    //mode is a string, all other field values are numbers
    const handleFieldChange = (evt) => {
        let {name, value} = evt.target;
        if (evt.target.type !== 'checkbox') {
            value = +value;
        }
        setFormData({...formData, [name]: value});
    }
    
    //Updata other settings based on mode choice and submit
    const submitEdits = () => {
        if (formData.mode==="countdownGoal" && formData.timerStartMin === 0 && formData.timerStartSec === 0) return;

        let newSettings = {
            mode: formData.mode, 
            editingMode: false
        };

        if (formData.mode === 'practice') {
            newSettings = {...newSettings,
                timerType: null,
                timerStart: null,
                warningLength: null,
                goalNumProblems: null,
            };
        } else {
            newSettings.timerType = formData.mode === 'numProbGoal' ? 'count-up' : 'count-down';
            newSettings.timerStart = formData.mode === 'numProbGoal' ? 0 : 
                                            formData.timerStartMin * 60000 + formData.timerStartSec * 1000;
            newSettings.warningLength = WARNING_LENGTH;
            newSettings.goalNumProblems = formData.mode === 'numProbGoal' ? formData.goalNumProblems : null;
        }

        setSettings(newSettings);

        resetScore();
        resetTimer();
        resetProblem();
    }

    return (
        <div className="ModeForm">
            <h1>Select Mode</h1>
            <form className="ModeForm-inputs">
                <div className="ModeForm-input-group">
                    <div>
                        <input 
                            type="checkbox" 
                            id="practice" 
                            name="mode" 
                            value="practice" 
                            onChange={handleFieldChange} 
                            checked={formData.mode==='practice'}
                        />
                        <label htmlFor="practice">Practice</label>
                        <div className="ModeForm-description">
                            No timer
                        </div>
                    </div>
                </div>

                <div className="ModeForm-input-group">
                    <div>
                        <input 
                            type="checkbox" 
                            id="numProbGoal" 
                            name="mode" 
                            value="numProbGoal" 
                            onChange={handleFieldChange} 
                            checked={formData.mode==='numProbGoal'}
                        />
                        <label htmlFor="numProbGoal">Number of Problems</label>
                        <div className="ModeForm-description">
                            As quickly as possible 
                        </div>
                    </div>
                    <div>
                        <select 
                            name="goalNumProblems" 
                            value={formData.goalNumProblems} 
                            onChange={handleFieldChange} 
                            disabled={formData.mode!=='numProbGoal'}
                        >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                </div>
                

                <div className="ModeForm-input-group">
                    <div>
                        <input 
                            type="checkbox" 
                            id="countdownGoal" 
                            name="mode" 
                            value="countdownGoal" 
                            onChange={handleFieldChange} 
                            checked={formData.mode==='countdownGoal'}
                        />
                        <label htmlFor="countdownGoal">Time</label>
                        <div className="ModeForm-description">
                            As many problems as possible 
                        </div>
                    </div>
                    <div>
                        <select 
                            name="timerStartMin" 
                            value={formData.timerStartMin}
                            onChange={handleFieldChange} 
                            disabled={formData.mode!=='countdownGoal'}
                        >
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        :
                        <select 
                            name="timerStartSec" 
                            value={formData.timerStartSec}
                            onChange={handleFieldChange} 
                            disabled={formData.mode!=='countdownGoal'}
                        >
                            <option value="0">00</option>
                            <option value="30">30</option>
                        </select>
                    </div>
                </div>
                <div className="ModeForm-warning">
                    {warning}
                </div>

                <div className="ModeForm-icons">   
                    <div className={`ModeForm-checkIcon ${iconClass}`}>                    
                        <FontAwesomeIcon icon={faCheckSquare} onClick={submitEdits} />
                    </div>
                    <div>                    
                        <FontAwesomeIcon icon={faWindowClose} onClick={toggleEditMode} />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ModeForm;