import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {opts} from './opts';
import OptionsTab from './OptionsTab';
import './Options.css';

/** Options component for McCool Math app 
 * Allows user to select options for problem to be retrieved from API
 * Maps option to query string to pass to API
 * Indicates which option is selected
 * Return null if no options for a particular skill
*/
const Options = () => {

    const {skill} = useParams();
    const options = opts[skill];

    //Set option to default option
    const [searchParams, setSearchParams] = useSearchParams();
    let defaultOpt = null;
    if (options) {
        const defaultName = options.default;
        defaultOpt = options.opts.find(ele => ele.opt===defaultName);
    }
    const [option, setOption] = useState(defaultOpt);

    //Set option to query string, if provided
    useEffect(() => {
        if (!options) return;
        if (searchParams.toString() !== "") {
            let paramOpt = options.opts.find(ele => ele.paramStr===searchParams.toString());
            setOption(paramOpt);
        }
    }, [searchParams])

    //Select option based on user click of Option Tab
    const handleClick = (evt) => {
        if (option.opt === evt.target.id) return;
        const opt = options.opts.find(ele => ele.opt===evt.target.id);
        setOption(opt);
        setSearchParams(opt.paramStr);
    }

    if (!options) return null;
        
    return (
        <div className="Options">
            {options.opts.map(ele => {
                return (
                    <OptionsTab 
                        key={ele.opt} 
                        id={ele.opt} 
                        selected={option.opt===ele.opt ? true : false}
                        text={ele.text} 
                        handleClick={handleClick} 
                    />
                )
            })}
        </div>
    )
}

export default Options;