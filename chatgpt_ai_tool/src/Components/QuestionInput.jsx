import React, { useEffect, useRef, useState } from 'react'
import { generateGeminiResponse } from '../api/geminiApi';
import Answers from './Answers';


const QuestionInput = () => {
  // user input 
  const [input, setInput] = useState('');

  //  API result
  const [response, setResponse] = useState([]);

  // error
  const [error, setError] = useState('');

  // maintain history and recent search
  const [recentHistory, setRecentHistory] = useState(JSON.parse(localStorage.getItem('history')));

  const [selectedHistory, setSelectedHistory] = useState('')
  const [loading, setLoading] = useState(false);

  const scrollToAns = useRef();

  const askQuestion = async () => {
    const datapayload = input || selectedHistory;

    if (!datapayload) return;

    //maintain recent search
    if (input) {
      if (localStorage.getItem('history')) {
        let history = JSON.parse(localStorage.getItem('history'))
        history = [input, ...history]
        localStorage.setItem('history', JSON.stringify(history))
        setRecentHistory(history)
      } else {
        localStorage.setItem('history', JSON.stringify([input]))
        setRecentHistory([input])
      }
    }

    try {
      setLoading(true)
      const result = await generateGeminiResponse(datapayload);
      setResponse((prev) => [
        ...prev,
        { type: 'q', text: datapayload },
        { type: 'a', text: result }
      ]);
      setInput("");

      setTimeout(() => {
        scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
      }, 500)
      setLoading(false)
    } catch (error) {
      setError("Something went wrong while fetching response.")
    }
  }

  // delete history
  const clearHistory = () => {
    localStorage.clear();
    setRecentHistory([]);
  }

  // submit question on enter button
  const isEnter = (e) => {
    if (e.key === 'Enter') {
      askQuestion();
    }
  }

  useEffect(() => {
    askQuestion();
  }, [selectedHistory])

  return (
    <>
      <div className='col-span-1 bg-zinc-800 pt-3'>
        <h1 className='text-xl text-white flex text-center justify-center '>
          <span>Recent History</span>
          <button onClick={clearHistory} className='cursor-pointer pt-1'><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" /></svg></button>
        </h1>
        <ul className='text-left overflow-auto text-sm'>
          {
            recentHistory && recentHistory.map((history, index) => (
              <li onClick={() => setSelectedHistory(history)} key={index} className='p-1 pl-5 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 cursor-pointer truncate'>{history}</li>
            ))
          }
        </ul>
      </div>
      <div className='col-span-4 bg-zinc-900 p-10'>
        <h1 className='text-4xl bg-clip-text text-transparent bg-linear-to-r from-pink-700 to-violet-700'>Hello User, Ask me Anything</h1>
        {
          loading ? <div className="flex justify-center items-center">
            <div className="w-10 h-10 rounded-full border-4 border-neutral-800 relative">
              <div className="absolute inset-0 border-4 border-purple-500 border-t-transparent border-l-transparent rounded-full animate-spin"></div>
            </div>
          </div>
            : null
        }
        <div ref={scrollToAns} className='container h-140 overflow-auto'>
          <div className='text-zinc-400'>
            <ul>
              {
                response.map((res, index) => (
                  <div key={index + Math.random()} className={res.type == 'q' ? 'flex justify-end' : ''}>
                    {
                      res.type == 'q' ? <li key={index + Math.random()} className='text-right p-1 bg-zinc-700 border-8 border-zinc-700 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl  w-fit flex'>
                        <Answers ans={res.text} totalResult={1} index={index} type={res.type} />
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
          <input
            type='text'
            className='p-3 w-full h-full outline-none'
            placeholder='Ask me anything'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={isEnter} />
          <button onClick={askQuestion}>Ask</button>
        </div>

      </div>
    </>
  )
}

export default QuestionInput