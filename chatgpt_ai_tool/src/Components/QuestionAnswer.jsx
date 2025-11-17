import React from 'react'
import Answers from './Answers'

const QuestionAnswer = ({res, index}) => {
  return (
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
  )
}

export default QuestionAnswer