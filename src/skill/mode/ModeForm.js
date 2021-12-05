import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faWindowClose } from '@fortawesome/free-regular-svg-icons';
import './ModeForm.css';

const ModeForm = ({ settings, setSettings, toggleEditMode, resetScore, resetTimer }) => {

    const WARNING_LENGTH = 3000;
    
    const currTotalSec = settings.timerStart ? Math.round(settings.timerStart / 1000) : 0;
    const currMin = Math.floor(currTotalSec / 60);
    const currSec = currTotalSec % 60;

    const initialFormData = {
        mode: settings.mode,
        min: !currSec && !currMin ? 1 : currMin,
        sec: currSec,
        prob: settings.goalNumProblems || 25
    }

    const [formData, setFormData] = useState(initialFormData);
    const [warning, setWarning] = useState(null);

    const checkClass = warning ? "ModeForm-checkIcon-disabled" : "";

    useEffect(() => {
        if (formData.mode==="countdownGoal" && formData.sec===0 && formData.min===0) {
            setWarning("Countdown timer cannot be zero");
        } else {
            setWarning(null);
        }
    }, [formData.min, formData.sec, formData.mode])

    const handleFieldChange = (evt) => {
        let {name, value} = evt.target;
        if (evt.target.type !== 'checkbox') {
            value = +value;
        }
        setFormData({...formData, [name]: value});
    }
    
    const submitEdits = () => {
        if (formData.mode==="countdownGoal" && formData.sec===0 && formData.min===0) return;

        switch (formData.mode) {
            case "practice":
                setSettings({...settings,
                    mode: formData.mode, 
                    timerType: null,
                    timerStart: null,
                    warningLength: null,
                    goalNumProblems: null,
                    editingMode: false
                })
                break;
            case "numProbGoal":
                setSettings({...settings,
                    mode: formData.mode, 
                    timerType: 'count-up',
                    timerStart: 0,
                    warningLength: WARNING_LENGTH,
                    goalNumProblems: formData.prob,
                    editingMode: false
                })
                break;
            case "countdownGoal":
                setSettings({...settings,
                    mode: formData.mode, 
                    timerType: 'count-down',
                    timerStart: formData.min * 60000 + formData.sec * 1000,
                    warningLength: WARNING_LENGTH,
                    goalNumProblems: null,
                    editingMode: false
                })
                break;
            default:
                break;
        }
        resetScore();
        resetTimer();
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
                            name="prob" 
                            value={formData.prob} 
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
                            onChange={handleFieldChange} 
                            name="min" 
                            value={formData.min}
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
                            name="sec" 
                            value={formData.sec}
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
                    <div className={`ModeForm-checkIcon ${checkClass}`}>                    
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