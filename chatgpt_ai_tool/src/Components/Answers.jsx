import React, { useEffect, useState } from 'react'
import { checkHeading, replaceHeadingStars } from './helper';

const Answers = ({ ans, index, totalResult }) => {
    console.log(ans, index, checkHeading(ans))

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


    return (
        <>
        {
            index==0 && totalResult>1 ? <span className='text-xl block pt-2 text-white'>{answer}</span>
            : heading ? <span className='text-lg block pt-2 text-white'>{answer}</span> 
            : <span className='pl-5'>{answer}</span>
        }
           
        </>
    )
}

export default Answers