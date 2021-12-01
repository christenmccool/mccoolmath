import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import OptionsButton from './OptionsButton'
import './Options.css';

const Options = () => {

    const {skill} = useParams()
    const options = () => {

        switch (skill) {
            case "integers":
                return { opts: [
                    {opt:'add', text: 'Add', params: {"type":"add"}, paramStr: "type=add"},
                    {opt:'sub', text: 'Subtract', params: {"type":"sub"}, paramStr: "type=sub"},
                    {opt:'mult', text: 'Multiply', params: {"type":"mult"}, paramStr: "type=mult"},
                    {opt:'div', text: 'Divide', params: {"type":"div"}, paramStr: "type=div"},
                    {opt:'all', text: 'All', params: {"type":"all"}, paramStr: "type=all"}
                ],
                    default: 'all'
                } 
            case "orderofops":
                return { opts: [
                    {opt:'l1', text: 'Level 1', params: {"n":"3"}, paramStr: "n=3"},
                    {opt:'l2', text: 'Level 2', params: {"n":"4"}, paramStr: "n=4"},
                    {opt:'l3', text: 'Level 3', params: {"n":"5"}, paramStr: "n=5"},
                ],
                    default: 'l1'
                } 
            default: 
                return null
        }
    }

    const [searchParams, setSearchParams] = useSearchParams();
    const defaultOpt = options().opts.find(ele => ele.opt===options().default);
    const [option, setOption] = useState(defaultOpt);

    useEffect(() => {
        if (searchParams.toString()==="") {
            setSearchParams(option.params);
        } else {
            let paramOpt = options().opts.find(ele => ele.paramStr===searchParams.toString());
            setOption(paramOpt);
        }
    }, [searchParams])

    const handleClick = (evt) => {
        if (option.opt === evt.target.id) return;
        setOption(options().opts.find(ele => ele.opt===evt.target.id));
        setSearchParams(options().opts.find(ele => ele.opt===evt.target.id).params);
    }

    return (
        <div className="Options">
            {options().opts.map(ele => {
                return (
                    <OptionsButton 
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