import { useEffect, useState, useContext } from 'react'
import AudioRecorder from './AudioRecorder'
import { TestContext } from '../TestContext'
import { useNavigate } from 'react-router-dom';

export default function TestItem() {

  const {currentTestItemIndex, setCurrentTestItemIndex, testData, submitTest} = useContext(TestContext);
  const navigate = useNavigate()

  // handle the word
  const handleNext = () => {
    if (currentTestItemIndex < testData.length - 1) {
      setCurrentTestItemIndex(prev => prev + 1)
    } else {
      setIsComplete(true)
    }
  }

  const handlePrev = () => {
    if (currentTestItemIndex > 0) {
      setCurrentTestItemIndex(prev => prev - 1)
    }
  }

  const handleSubmit = async() => {
    await submitTest()
    navigate('/test/results') 
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <div className="flex flex-col items-center mb-6">
        <img src={testData[currentTestItemIndex].image || "/placeholder.svg"} alt={testData[currentTestItemIndex].word} className="w-48 h-48 mb-4 rounded-lg shadow-md" />
        <h2 className="text-4xl font-bold mb-2">{testData[currentTestItemIndex].word}</h2>
        <p className="text-xl text-gray-600 mb-4">{testData[currentTestItemIndex].ipa}</p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <AudioRecorder/>
        <>
          <button
            onClick={(currentTestItemIndex + 1) === testData.length ? handleSubmit : handleNext /*Change to submit if last item*/ }
            className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all"
          >
            {(currentTestItemIndex + 1) === testData.length ? 'Submit' : 'Next Word' /*Change to submit if last item*/ }
          </button>
          <button
            onClick={handlePrev}
            disabled={currentTestItemIndex < 1 /*Change to disabled if first item*/}
            className="w-full px-4 py-2 bg-slate-500 text-white font-semibold rounded-lg hover:bg-slate-600 disabled:bg-slate-300 transition-all"
          >
            Prev Word
          </button>
        </>
      </div>
    </div>
  )
}
