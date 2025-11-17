import React, { useEffect, useRef, useState } from 'react'
import { generateGeminiResponse } from '../api/geminiApi';
import RecentHistory from './RecentHistory';
import QuestionAnswer from './QuestionAnswer';


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
      <RecentHistory recentHistory={recentHistory} setRecentHistory={setRecentHistory} setSelectedHistory={setSelectedHistory} />
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
        <div ref={scrollToAns} className='container h-110 overflow-auto'>
          <div className='text-zinc-400'>
            <ul>
              {
                response.map((res, index) => (
                  <QuestionAnswer key={index} res={res} index={index} />
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