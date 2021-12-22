import React from 'react';
import Mode from './Mode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import './ModeWrapper.css';

// Renders mode description and icon to toggle edit mode
const ModeWrapper = ( {settings, toggleEditMode} ) => {
    return (
        <div className="ModeWrapper">
            <Mode 
                settings={settings} 
            />
            <div className="ModeWrapper-icon">
                <FontAwesomeIcon icon={faEdit}  onClick={toggleEditMode}/>
            </div>
        </div>
    )
}

export default ModeWrapper;