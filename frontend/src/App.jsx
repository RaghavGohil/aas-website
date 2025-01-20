import './index.css'
import { useEffect, useState } from 'react'
import TestItem from './components/TestItem'
import Result from './components/Results'
import ProgressBar from './components/ProgressBar'
import Welcome from './components/Welcome'
import axios from 'axios'

axios.defaults.headers.post['credentials'] = 'include'

export default function App() {

  const [showWelcome, setShowWelcome] = useState(true)
  const [currentTestItemIndex, setCurrentTestItemIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [testData, setTestData] = useState([])
  //const [results, setResults] = useState({})

  useEffect(()=>{
    async function fetchTestData(){
      try{
        let res = await axios.get(import.meta.env.VITE_BACKEND_URL+'/api/test-data')
        setTestData(res.data) // contains the word, ipa and the image.
      }catch(err){
        console.log('Could not get the test data from the server.', err)
      }  
    }
    fetchTestData();
  },[])

  // start the test
  const startTest = async () => {
    try{
      let res = await axios.post(import.meta.env.VITE_BACKEND_URL+'/api/start-test')
      console.log('Test has been started successfully!!!', res.data)
      setShowWelcome(false)
    }catch(err){
      console.log('Test could not be started.', err) 
    }
  }

  // handle the word
  const handleNext = () => {
    if (currentTestItemIndex < testData.length - 1) {
      setCurrentTestItemIndex(prev => prev + 1)
    } else {
      setIsComplete(true)
    }
  }

  // handle the word
  const handlePrev = () => {
    if (currentTestItemIndex > 0) {
      setCurrentTestItemIndex(prev => prev - 1)
    }
  }

  const handleRestart = () => {
    setCurrentTestItemIndex(0)
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
      
      {/* <ProgressBar current={currentIndex + 1} total={words.length} /> */}
      <div className="mb-4 text-center">
        <span className="font-semibold">Word {currentTestItemIndex + 1} of {testData.length}</span>
      </div>
      <TestItem
        testItem={testData[currentTestItemIndex]}
        onNext={handleNext}
        onPrev={handlePrev}
      />
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Click "Start Recording" to begin, then "Next Word" when you're ready to continue.</p>
      </div>
    </div>
  )
}

