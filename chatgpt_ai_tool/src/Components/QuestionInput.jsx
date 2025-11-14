import React, { useEffect, useState } from 'react'
import { generateGeminiResponse } from '../api/geminiApi';
import Answers from './Answers';


const QuestionInput = () => {
  // user input 
  const [input, setInput] = useState('');

  //  API result
  const [response, setResponse] = useState([]);
  console.log(response)

  // error
  const [error, setError] = useState('');

  const askQuestion = async () => {
    try {
      const result = await generateGeminiResponse(input);
      setResponse((prev) => [
        ...prev,
        { type: 'q', text: input },
        { type: 'a', text: result }
      ]);
      setInput("");
    } catch (error) {
      setError("Something went wrong while fetching response.")
    }
  }


  return (
    <div className='col-span-4 bg-zinc-900 p-10'>
      <div className='container h-140 overflow-auto'>
        <div className='text-zinc-400'>
          <ul>
            {
              response.map((res, index) => (
               <div key={index + Math.random()} className={res.type=='q' ? 'flex justify-end':''}>
                 {
                   res.type == 'q' ? <li key={index + Math.random()} className='text-right p-1 bg-zinc-700 border-8 border-zinc-700 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl  w-fit flex'>
                    <Answers ans={res.text} totalResult={1} index={index} type={res.type}/>
                    </li>
                  : res.text.map((ansRes, ansIndex) => <li key={ansIndex + Math.random()} className='text-left p-1'>
                    <Answers ans={ansRes} totalResult={res.length} index={ansIndex} type={res.type}
                    /></li>)
                 } 
             </div>
              ))
            }
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