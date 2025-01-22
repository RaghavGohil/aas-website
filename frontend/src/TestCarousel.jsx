import { useState, useContext, useEffect } from 'react'
import TestItem from './components/TestItem'
import ProgressBar from './components/ProgressBar'
import { TestContext } from './TestContext'
import { handleError } from './Utility'
import axios from 'axios' 

export default function TestCarousel() {

  const {testData, setTestData, currentTestItemIndex} = useContext(TestContext)

  useEffect(()=>{
    const fetchTestData = async() => {
      try{
        let res = await axios.get(
          import.meta.env.VITE_BACKEND_URL+'/api/test/data',
          {
            withCredentials: true 
          }
        )
        setTestData(res.data) // contains the word, ipa and the image.
      }catch(err){
        handleError(err)
      }  
    }
    fetchTestData()
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Auto Articulation Screening</h1>

      <ProgressBar current={currentTestItemIndex+ 1} total={testData?.length}/>
      <div className="mb-4 text-center">
        <span className="font-semibold">Word {currentTestItemIndex + 1} of {testData?.length}</span>
      </div>
      <TestItem/>
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Click "Start Recording" to begin, then "Next Word" when you're ready to continue.</p>
      </div>
    </div>
  )
}

