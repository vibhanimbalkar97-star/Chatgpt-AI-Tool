import React, { useEffect, useState } from 'react'
import axios from "axios";
import { generateGeminiResponse } from '../api/geminiApi';


const QuestionInput = () => {
// user input 
 const [input, setInput] = useState('');

//  API result
const [response,setResponse] = useState('');

// error
const [error, setError] = useState('');

const handleAsk = async () => {
  try {
    const result = await generateGeminiResponse(input);
    setResponse(result);
  } catch(error) {
    setError("Something went wrong while fetching response.")
  }
}


  return (
   <div className='col-span-4 bg-zinc-900 p-10'>
          <div className='container h-110'>
          </div>
          <div className='bg-zinc-800 w-1/2 p-1 pr-5 text-white rounded-4xl m-auto flex border border-zinc-700 h-16'>
            <input type='text' className='p-3 w-full h-full outline-none' placeholder='Ask me anything'
            value={input}
            onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleAsk}>Ask</button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {response && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#f5f5f5",
            borderRadius: "10px",
            textAlign: "left",
          }}
        >
          <h4>Response:</h4>
          <p>{response}</p>
        </div>
      )}
          </div>
  )
}

export default QuestionInput