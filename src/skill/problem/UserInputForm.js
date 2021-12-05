import React, {useState} from 'react';
import { addStyles, EditableMathField } from 'react-mathquill';
import Button from '../Button';
import './UserInputForm.css'

//Math input form for user to submit answer
const UserInputForm = ( {submitUserAnswer, inputFieldRef} ) => {
    const [input, setInput] = useState("");

    // Inserts required CSS for MathQuill
    addStyles();

    const handleKeyDown = (evt) => {
        if (evt.key === 'Enter') {
            evt.preventDefault();
            evt.stopPropagation();
            handleSubmit(evt);
        }
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (input === "") return;
        submitUserAnswer(input);
        setInput("");
    }    

    return (
        <form className="UserInputForm" onSubmit={handleSubmit}>
            <div className="UserInputForm-field" ref={inputFieldRef}>
                <EditableMathField
                    className="UserInputForm-input"
                    latex={input}
                    onChange={(mathField) => setInput(mathField.latex())}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <Button 
                text="Check"
                type="check" 
            />
        </form>
    )
}

export default UserInputForm;