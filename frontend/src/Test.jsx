import { useContext, useEffect, useState } from 'react'
import TestCarousel from './components/TestCarousel'
import Result from './components/Results'
import ProgressBar from './components/ProgressBar'
import Welcome from './components/Welcome'
import axios from 'axios'
import { TestContext } from './TestContext'

export default function Test() {

  const [showWelcome, setShowWelcome] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  const {currentTestItemIndex,testData} = useContext(TestContext)

  // start the test
  const startTest = async () => {
    try{
      let res = await axios.post(
        import.meta.env.VITE_BACKEND_URL+'/api/start-test',
        {},
        {
          withCredentials: true
        }
      )
      console.log('Test has been started successfully!!!', res.data)
      setShowWelcome(false)
    }catch(err){
      console.log('Test could not be started.', err) 
    }
  }

  const handleRestart = () => {
    //setResults({})
    setIsComplete(false)
    setShowWelcome(true)
  }

  if (showWelcome) {
    return <Welcome onStart={startTest}/>
  }

  if (isComplete) {
    return <>Results screen should be here!</>
    //return <ResultScreen results={results} words={words} onRestart={handleRestart} />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Auto Articulation Screening</h1>

      <ProgressBar current={currentTestItemIndex+ 1} total={testData.length}/>
      <div className="mb-4 text-center">
        <span className="font-semibold">Word {currentTestItemIndex + 1} of {testData.length}</span>
      </div>
      <TestCarousel/>
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Click "Start Recording" to begin, then "Next Word" when you're ready to continue.</p>
      </div>
    </div>
  )
}

