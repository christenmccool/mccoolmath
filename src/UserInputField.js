import React from 'react';
import { addStyles, EditableMathField } from 'react-mathquill';
import './UserInputField.css'


const UserInputField = ( {input, setInput, handleKeyDown, inputFieldRef}  ) => {
    
    // Inserts required CSS for MathQuill
    addStyles();

    return (
        <div className="UserInputField" ref={inputFieldRef}>
            <EditableMathField
                latex={input}
                onChange={(mathField) => setInput(mathField.latex())}
                onKeyDown={handleKeyDown}
                className="UserInputField-input"
            />
        </div>
    )
}

export default UserInputField;