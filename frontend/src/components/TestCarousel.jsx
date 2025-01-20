import { useState, useContext } from 'react'
import AudioRecorder from './AudioRecorder'
import { TestContext } from '../TestContext'

export default function TestItem() {

  const {currentTestItemIndex, setCurrentTestItemIndex, testData} = useContext(TestContext);

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
            onClick={handleNext}
            className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all"
          >
            Next Word
          </button>
          <button
            onClick={handlePrev}
            className="w-full px-4 py-2 bg-slate-500 text-white font-semibold rounded-lg hover:bg-slate-600 transition-all"
          >
            Prev Word
          </button>
        </>
      </div>
    </div>
  )
}
