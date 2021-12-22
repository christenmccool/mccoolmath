import React from 'react';
import './OptionsTab.css';

//Tab to provide option choices
const OptionsTab = ({ id, selected, text, handleClick }) => {
    const buttonClass = selected ? "OptionsTab-selected" : "";

    return (
        <button className={`OptionsTab ${buttonClass}`} id={id} onClick={handleClick}>{text}</button>
    )
}

export default OptionsTab;