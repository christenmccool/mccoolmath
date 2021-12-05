import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import OptionsTab from './OptionsTab'
import './Options.css';

/** Options component for McCool Math app 
 * Allows user to select options for problem to be retreived from API
 * Maps option to query string to pass to API
 * Indicates which option is selected
*/
const Options = () => {

    const {skill} = useParams();

    const options = () => {
        switch (skill) {
            case "integers":
                return { opts: [
                    {opt:'add', text: 'Add', paramStr: "type=add"},
                    {opt:'sub', text: 'Subtract', paramStr: "type=sub"},
                    {opt:'mult', text: 'Multiply', paramStr: "type=mult"},
                    {opt:'div', text: 'Divide', paramStr: "type=div"},
                    {opt:'all', text: 'All', paramStr: "type=all"}
                ],
                    default: 'all'
                } 
            case "orderofops":
                return { opts: [
                    {opt:'l1', text: 'Level 1', paramStr: "n=3"},
                    {opt:'l2', text: 'Level 2', paramStr: "n=4"},
                    {opt:'l3', text: 'Level 3', paramStr: "n=5"},
                ],
                    default: 'l2'
                } 
            default: 
                return null
        }
    }

    const [searchParams, setSearchParams] = useSearchParams();
    let defaultOpt = null;
    if (options()) {
        const defaultName = options().default;
        defaultOpt = options().opts.find(ele => ele.opt===defaultName);
    }
    const [option, setOption] = useState(defaultOpt);

    useEffect(() => {
        if (!options()) return;
        if (searchParams.toString()!=="") {
            let paramOpt = options().opts.find(ele => ele.paramStr===searchParams.toString());
            setOption(paramOpt);
        }
    }, [searchParams])

    const handleClick = (evt) => {
        if (option.opt === evt.target.id) return;
        const opt = options().opts.find(ele => ele.opt===evt.target.id);
        setOption(opt);
        setSearchParams(opt.paramStr);
    }

    if (!options()) return null;
        
    return (
        <div className="Options">
            {options().opts.map(ele => {
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