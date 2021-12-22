import React, {useState} from 'react';
import { addStyles, EditableMathField } from 'react-mathquill';
import './UserInputField.css';

//Editable math input field for user to type answer
//Formatting dependent on if graphing problem or not
const UserInputField = ( {submitUserAnswer, inputFieldRef, isGraphing, setWarning} ) => {
    const [input, setInput] = useState("");

    const componentClass = isGraphing ? `-graphing` : "";

    // Inserts required CSS for MathQuill
    addStyles();

    const integer = /^[+-]?[0-9][0-9]*$/;
    const equation = /^y=-?[x0-9]x?[-+]?(?:\\left\()?[-+]?[0-9]?(?:\\right\))?$/;
    const fractionEquation = /^y=-?\\frac{[0-9]}{[0-9]}x[-+]?(?:\\left\()?[-+]?[0-9]?(?:\\right\))?$/;

    const handleKeyDown = (evt) => {
        if (evt.key === 'Enter') {
            evt.preventDefault();
            evt.stopPropagation();
            handleSubmit(evt);
        }
    }

    const handleChange = (mathField) => {
        setInput(mathField.latex());
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setWarning("");
        if (input === "") return;

        if (!isGraphing) {
            if(!integer.test(input)) {
                setWarning("Answer must be an integer")
                return;
            }
        }
        if (isGraphing) {
            if(!equation.test(input) && !fractionEquation.test(input)) {
                setWarning("Answer must be of the form y=mx+b (integer b)")
                return;
            }
        }
        submitUserAnswer(input);
        setInput("");
    }    


    return (
        <form className={`UserInputField${componentClass}`} id="check-answer-form" ref={inputFieldRef} onSubmit={handleSubmit}>
            <EditableMathField
                className={`UserInputField-input${componentClass}`}
                latex={input}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </form>
    )
}

export default UserInputField;