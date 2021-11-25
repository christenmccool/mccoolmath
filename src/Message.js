import React from 'react';
import { useSelector } from 'react-redux';
import Expression from './Expression';
import './Message.css'

const Message = () => {
    const problem = useSelector(state => state.problem);

    return (
        <div className="Message">
            {problem.status==='showCorrect' ? 
                <>
                    <Expression latex={problem.correctAnswer} />
                </>
                : 
                problem.status==='correct' ? 
                    <>
                        <Expression latex={problem.userAnswer} />
                        <h1 className="Message-text Message-text-correct">Correct!</h1>
                    </>
                    : 
                    <>
                        <Expression latex={problem.userAnswer} />  
                        <h1 className="Message-text Message-text-incorrect">Incorrect</h1>
                    </>
            }
        </div>
    )
}

export default Message;