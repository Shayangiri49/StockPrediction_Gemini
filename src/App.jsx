import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FinancialForm } from './components/FinancialForm'
import { Result } from './components/Result'

function App() {
  const [result, setResult] = useState("")

  return (
    <div className='App'>
      <header className='.App-header'>
        <h1>Stock Prediction</h1>
      </header>
      {
        result.length > 0 &&
        <>
          <Result result={result} />
          <button className='clearbutton' onClick={()=>{
            setResult('')
          }}>
            Clear Result
          </button>
        </>
      }

      {
        result.length == 0 && <FinancialForm setResult={setResult} />
      }

    </div>
  )
}

export default App
