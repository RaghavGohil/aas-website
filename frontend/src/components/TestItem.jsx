import { useState } from 'react'
import AudioRecorder from './AudioRecorder'

export default function TestItem({ testItem , onNext, onPrev }) {

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

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <div className="flex flex-col items-center mb-6">
        <img src={testItem.image || "/placeholder.svg"} alt={testItem.word} className="w-48 h-48 mb-4 rounded-lg shadow-md" />
        <h2 className="text-4xl font-bold mb-2">{testItem.word}</h2>
        <p className="text-xl text-gray-600 mb-4">{testItem.ipa}</p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <AudioRecorder/>
        <>
          <button
            onClick={onNext}
            className="w-full px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-all"
          >
            Next Word
          </button>
          <button
            onClick={onPrev}
            className="w-full px-4 py-2 bg-slate-500 text-white font-bold rounded-lg hover:bg-slate-600 transition-all"
          >
            Prev Word
          </button>
        </>
      </div>
    </div>
  )
}
