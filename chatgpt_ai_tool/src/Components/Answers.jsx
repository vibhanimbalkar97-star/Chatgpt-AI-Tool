import React, { useEffect, useState } from 'react'
import { checkHeading, replaceHeadingStars } from './helper';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkDown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
const Answers = ({ ans, index, totalResult, type }) => {

    // to check star from statement
    const [heading, setHeading] = useState(false);

    // to replace star with the space
    const [answer, setAnswer] = useState(ans)

    useEffect(() => {
        if (checkHeading(ans)) {
            setHeading(true);
            setAnswer(replaceHeadingStars(ans))
        }
    }, [])

    const renderer = {
        code({node, inline, className, children, ...props}) {
            const match= /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <SyntaxHighlighter
                {...props}
                children={String(children).replace(/\n$/,'')}
                language={match[1]}
                style={dark} 
                pretag="div"/>
            ) : (
                <code {...props} className={className}>
                    {children}
                </code>
            )
        }
    }


    return (
        <>
        {
            index==0 && totalResult>1 ? <span className='text-xl block pt-2 text-white'>{answer}</span>
            : heading ? <span className='text-lg block pt-2 text-white'>{answer}</span> 
            : <span className={type == 'q' ? 'pl-1' : 'pl-5'}>
                <ReactMarkDown components={renderer}>
                    {answer}
                </ReactMarkDown>
                </span>
        }
           
        </>
    )
}

export default Answers