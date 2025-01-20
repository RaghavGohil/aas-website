import { useEffect, useState, useContext } from "react"
import { useReactMediaRecorder } from "react-media-recorder"
import { TestContext } from "../TestContext"
import axios from 'axios'

export default function AudioRecorder() {

  const [recording, setRecording] = useState(false)
  const [hasRecordedOnce, setHasRecordedOnce] = useState(false)
  const {currentTestItemIndex} = useContext(TestContext)
       
  const sendAudioData = async (formData) => {
    try{
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL+`/api/upload-audio/${currentTestItemIndex}`,
        formData,
        {
          withCredentials: true
        }
      )
    }catch(err){
      console.log('Unable to send audio data to server', err)
    }
  }

  const { status, startRecording, stopRecording, mediaBlobUrl, mediaBlob} =
    useReactMediaRecorder({ 
      audio: true, 
      onStop: (blobUrl, blob)=>{
        // send the blob to the server on stop 
        console.log(blobUrl, blob)
        const audioFile = new File([blob], "audio.wav", { type: "audio/wav" })
        console.log(audioFile);
        const formData = new FormData();
        formData.append("audio", audioFile);
        sendAudioData(formData);
      },
  });

  return (
    <div className="w-full rounded-lg text-center">
      <div className="space-y-4">
        <p> Status: {status}</p>
          {
            !recording?
            (
              <button
               onClick={()=>{
                startRecording()
                setHasRecordedOnce(true)
                setRecording(true)
               }}
               className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
              >
               {hasRecordedOnce ? 'Retake Audio' : 'Start Recording' }
              </button>   
            ):(
              <button
                onClick={()=>{
                  stopRecording()
                  setRecording(false)
                }}
                className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 bg-slate disabled transition-all"
              >
                Stop Recording
              </button>
            )
          }
        {mediaBlobUrl && <audio className="m-auto" src={mediaBlobUrl} controls />}
      </div>
    </div>
  )
}
