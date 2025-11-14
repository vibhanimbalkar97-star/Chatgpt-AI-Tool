import React, { useEffect, useState } from 'react'
import { generateGeminiResponse } from '../api/geminiApi';
import Answers from './Answers';


const QuestionInput = () => {
// user input 
 const [input, setInput] = useState('');

//  API result
const [response,setResponse] = useState('');

// error
const [error, setError] = useState('');

const askQuestion = async () => {
  try {
    const result = await generateGeminiResponse(input);
    setResponse(result);
  } catch(error) {
    setError("Something went wrong while fetching response.")
  }
}


  return (
   <div className='col-span-4 bg-zinc-900 p-10'>
          <div className='container h-110 overflow-scroll'>
            <div className='text-white'>
              <ul>
                {response && response.map((res, index) => (
                <li className='text-left p-1'><Answers ans={res} key={index} /></li>
              ))}
              </ul>
              
            </div>
           
          </div>
          <div className='bg-zinc-800 w-1/2 p-1 pr-5 text-white rounded-4xl m-auto flex border border-zinc-700 h-16'>
            <input type='text' className='p-3 w-full h-full outline-none' placeholder='Ask me anything'
            value={input}
            onChange={(e) => setInput(e.target.value)} />
            <button onClick={askQuestion}>Ask</button>
          </div>
          
          </div>
  )
}

export default QuestionInput