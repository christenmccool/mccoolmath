import React, {useState} from 'react';
import UserInputField from './UserInputField';
import Button from './Button';
import './UserInputForm.css'

const UserInputForm = ( {submitUserAnswer, inputFieldRef} ) => {
    const [input, setInput] = useState("");

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
            <UserInputField 
                handleKeyDown={handleKeyDown}
                input={input}
                setInput={setInput}
                inputFieldRef={inputFieldRef}
            />
            <Button 
                role="check"
            />
        </form>
    )
}

export default UserInputForm;