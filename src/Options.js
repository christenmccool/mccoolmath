import React from 'react';
import OptionsButton from './OptionsButton'
import './Options.css';

const Options = ({ options, option, setOption }) => {
    
    const handleClick = (evt) => {
        if (option.value === evt.target.id) return;
        setOption({param:options.param, value:evt.target.id});
    }

    return (
        <div className="Options">
            {Object.keys(options.choices).map(ele => {
                return (
                    <OptionsButton 
                        key={ele} 
                        id={ele} 
                        selected={option.value===ele ? true : false}
                        text={options.choices[ele]} 
                        handleClick={handleClick} 
                    />
                )
            })}
        </div>
    )
}

export default Options;