import { useEffect, useState, useContext } from "react"
import { useReactMediaRecorder } from "react-media-recorder"
import { TestContext } from "../TestContext"
import axios from 'axios'

export default function AudioRecorder() {

  const [recording, setRecording] = useState(false) // sets if you are recording or not
  const [hasRecordedOnce, setHasRecordedOnce] = useState(false) // sets if you have recorded once, if yes then retake shows
  const [blobUrls, setBlobUrls] = useState([]) // sets the blob urls which point to the memory
  const {currentTestItemIndex} = useContext(TestContext) // the test context stores all the important test data

  const sendAudioData = async (formData) => { // send the audio data to the server for processing
    try{
      await axios.post(
        import.meta.env.VITE_BACKEND_URL+`/api/upload-audio/${currentTestItemIndex}`,
        formData,
        {
          withCredentials: true // include session cookie
        }
      )
    }catch(err){
      console.log('Unable to send audio data to server.', err)
    }
  }

  const { status, startRecording, stopRecording, mediaBlobUrl, mediaBlob, clearBlobUrl} =
    useReactMediaRecorder({ 
      audio: true, 
      onStop: (blobUrl, blob)=>{ // on stop gets the blobUrl and the blob itself

        // send the blob to the server on stop 
        const audioFile = new File([blob], "audio.wav", { type: "audio/wav" })
        const formData = new FormData();
        formData.append("audio", audioFile);
        sendAudioData(formData); // send the formData to server

        setBlobUrls(prev => [...prev, blobUrl]) // on stop, also set the pointers 
      },
  });

  useEffect(()=>{ // cleanup & reset
    // as the current test item changes, we have to reset the audio recorder.
    setRecording(false)
    setHasRecordedOnce(false)
  },[currentTestItemIndex]) // as currentTestItemIndex changes, (test progresses) the recording state should reset

  return (
    <div className="w-full rounded-lg text-center">
      <div className="space-y-4">
        <p> Status: {status}</p>
          {
            !recording? // if not recording, show option to record
            (
              <button
               onClick={()=>{
                startRecording()
                setHasRecordedOnce(true)
                setRecording(true)
               }}
               className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
              >
               {hasRecordedOnce ? 'Retake Audio' : 'Start Recording' /* if recorded once show retake audio */}
              </button>   
            ):( // when recording, show option to stop
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
        {(blobUrls[currentTestItemIndex]) && <audio className="m-auto" src={blobUrls[currentTestItemIndex]} controls />}
      </div>
    </div>
  )
}
