import './App.css'
import QuestionInput from './Components/QuestionInput'

function App() {
  
  return (
    <>
      <div className='h-screen grid grid-cols-5 text-center'>
        <div className='col-span-1 bg-zinc-800'></div>
        <QuestionInput />
      </div>
    </>
  )
}

export default App
