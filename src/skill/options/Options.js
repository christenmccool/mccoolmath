import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {opts} from '../../app/opts';
import OptionsTab from './OptionsTab';
import './Options.css';

/** Options component for McCool Math app 
 * Allows user to select options for skill
 * Maps option to query string
 * Renders series of buttons or dropdown for mobile 
 * Return null if no options for a skill
*/
const Options = ({ option, setOption }) => {

    const {skill} = useParams();
    const options = opts[skill];

    const [searchParams, setSearchParams] = useSearchParams();

    //Set option based on user click of Option Tab
    //Set query string to reflect selected option
    const handleClick = (evt) => {
        if (option.name === evt.target.id) return;
        const opt = options.find(ele => ele.name === evt.target.id);
        setOption(opt);
        setSearchParams(opt.paramStr);
    }

    //Set option based on user selection in dropdown
    //Set query string to reflect selected option
    const handleChange = (evt) => {
        if (option.name === evt.target.value) return;
        const opt = options.find(ele => ele.name === evt.target.value);
        setOption(opt);
        setSearchParams(opt.paramStr);
    }

    if (!options) return null;
        
    return (
        <div className="Options">
            <div className="Options-buttons">
                {options.map(ele => {
                    return (
                        <OptionsTab 
                            key={ele.name} 
                            id={ele.name} 
                            selected={option&&option.name === ele.name ? true : false}
                            text={ele.text} 
                            handleClick={handleClick} 
                        />
                    )
                })}
            </div>

            <div className="Options-dropdown">
                <select name="option" value={option && option.name} onChange={handleChange} >
                    {options.map(ele => {
                        return (
                            <option
                                key={ele.name} 
                                value={ele.name} 
                            >
                                {ele.text}
                            </option>
                        )
                    })}
                </select>
            </div>
        </div>
    )
}

export default Options;