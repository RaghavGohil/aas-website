import { useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";

export default function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [hasRecordedOnce, setHasRecordedOnce] = useState(false);

  return (
    <div className="rounded-lg text-center">
      <ReactMediaRecorder
        audio
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
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
            {mediaBlobUrl && <audio src={mediaBlobUrl} controls />}
          </div>
        )}
      /> 
    </div>
  );
}
