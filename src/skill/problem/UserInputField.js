import React, {useState} from 'react';
import { addStyles, EditableMathField } from 'react-mathquill';
import './UserInputField.css'

//Editable math input field for user to type answer
const UserInputField = ( {submitUserAnswer, inputFieldRef, isGraphing} ) => {
    const [input, setInput] = useState("");

    const componentClass = isGraphing ? `-graphing` : "";

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
        <div className={`UserInputField${componentClass}`} ref={inputFieldRef}>
            <EditableMathField
                className={`UserInputField-input${componentClass}`}
                latex={input}
                onChange={(mathField) => setInput(mathField.latex())}
                onKeyDown={handleKeyDown}
            />
        </div>
    )
}

export default UserInputField;