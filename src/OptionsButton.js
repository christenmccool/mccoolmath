import React from 'react';
import './OptionsButton.css';

const OptionsButton = ({ id, selected, text, handleClick }) => {
    const buttonClass = selected ? "OptionsButton-selected" : "";

    return (
        <button className={`OptionsButton ${buttonClass}`} id={id} onClick={handleClick}>{text}</button>
    )
}

export default OptionsButton;