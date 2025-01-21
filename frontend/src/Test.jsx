import { useContext, useEffect, useState } from 'react'
import TestCarousel from './components/TestCarousel'
import Result from './components/Results'
import ProgressBar from './components/ProgressBar'
import Welcome from './Welcome'
import { TestContext } from './TestContext'
import { Navigate } from 'react-router-dom'

export default function Test() {

  const {currentTestItemIndex,testData} = useContext(TestContext)

  if(testData.length === 0) 
  {
    return <Navigate to='/' /> // no test data, return to welcome
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

