import React, {useState, useEffect} from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import opts from '../../app/opts';
import OptionsTab from './OptionsTab';

import './Options.css';

/** Options component for McCool Math app 
 * Allows user to select options for skill
 * Maps option to query string
 * Renders series of buttons or dropdown for mobile 
*/
const Options = ( {resetScore, resetTimer, resetProblem} ) => {
    const {skill} = useParams();
    const options = opts[skill].options;
    const [option, setOption] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    //Set initial option based on query string or default
    useEffect(() => {
        let opt = opts[skill].options.find(ele => ele.paramStr === searchParams.toString());        
        if (!opt) {
            opt = opts[skill].options.find(ele => ele.name === opts[skill].defaultOption);
            setSearchParams(opt.paramStr);
        }
        setOption(opt);
    }, [])

    //Set option based on user click of Option Tab or selection in dropdown
    //Set query string to reflect selected option
    const handleClick = (evt) => {
        let opt;
        if (evt.target.nodeName === "BUTTON") {
            if (option.name === evt.target.id) return;
            opt = options.find(ele => ele.name === evt.target.id);
        }
        if (evt.target.nodeName === "SELECT") {
            if (option.name === evt.target.value) return;
            opt = options.find(ele => ele.name === evt.target.value);
        }
        setOption(opt);
        setSearchParams(opt.paramStr);
        resetScore();
        resetTimer();
        resetProblem();
    }

    return (
        <div className="Options">
            <div className="Options-tabs">
                {options.map(ele => {
                    return (
                        <OptionsTab 
                            key={ele.name} 
                            id={ele.name} 
                            selected={option.name === ele.name ? true : false}
                            text={ele.text} 
                            handleClick={handleClick} 
                        />
                    )
                })}
            </div>

            <div className="Options-dropdown">
                <select name="option" value={option.name} onChange={handleClick} >
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