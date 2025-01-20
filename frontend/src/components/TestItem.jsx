import { useState } from 'react'

export default function TestItem({ word, onNext }) {

  const [isRecording, setIsRecording] = useState(false)
  const [hasRecorded, setHasRecorded] = useState(false)

  const handleRecord = () => {
    setIsRecording(true)
    setTimeout(() => {
      setIsRecording(false)
      setHasRecorded(true)
    }, 3000)
  }

  const handleRetake = () => {
    setHasRecorded(false)
  }

  const handleNext = () => {
    const isCorrect = Math.random() > 0.5
    onNext(word.word, isCorrect)
    setHasRecorded(false)
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <div className="flex flex-col items-center mb-6">
        <img src={word.image || "/placeholder.svg"} alt={word.word} className="w-48 h-48 mb-4 rounded-lg shadow-md" />
        <h2 className="text-4xl font-bold mb-2">{word.word}</h2>
        <p className="text-xl text-gray-600 mb-4">{word.ipa}</p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={handleRecord}
          disabled={isRecording || hasRecorded}
          className={`w-full px-4 py-2 text-white font-bold rounded-lg transition-all ${isRecording ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          🎤 {isRecording ? 'Recording...' : 'Start Recording'}
        </button>
        {hasRecorded && (
          <>
            <button
              onClick={handleRetake}
              className="w-full px-4 py-2 border border-gray-400 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition-all"
            >
              🔄 Retake
            </button>
            <button
              onClick={handleNext}
              className="w-full px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-all"
            >
              ➡️ Next Word
            </button>
          </>
        )}
      </div>
    </div>
  )
}
