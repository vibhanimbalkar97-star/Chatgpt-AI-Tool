import './App.css'

function App() {


  return (
    <>
      <div className='h-screen grid grid-cols-5 text-center'>
        <div className='col-span-1 bg-zinc-800'></div>
        <div className='col-span-4 bg-zinc-900 p-10'>
          <div className='containe h-110'>
          </div>
          <div className='bg-zinc-800 w-1/2 p-1 pr-5 text-white rounded-4xl m-auto flex border border-zinc-700 h-16'>
            <input type='text' className='p-3 w-full h-full outline-none' placeholder='Ask me anything' />
            <button>Ask</button>
          </div>

        </div>

      </div>
    </>
  )
}

export default App
