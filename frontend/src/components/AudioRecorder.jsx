import { useState } from "react";
import { ReactMic } from "react-mic";

export default function AudioRecorder() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);

  const startRecording = () => {
    setRecording(true);
  };

  const stopRecording = () => {
    setRecording(false);
  };

  const onData = (recordedBlob) => {
    console.log("Recording in progress", recordedBlob);
  };

  const onStop = (recordedBlob) => {
    console.log("Recording stopped", recordedBlob);
    setAudioURL(recordedBlob.blobURL);
  };

  return (
    <div className="max-w-md mx-auto rounded-lg text-center">

      {/* ReactMic Component */}
      <ReactMic
        record={recording}
        className="w-full bg-gray-200 rounded-lg"
        onStop={onStop}
        onData={onData}
        strokeColor="#2563EB"
        backgroundColor="#E5E7EB"
      />

      <div className="mt-4 flex justify-center gap-4">
        <button
          onClick={startRecording}
          disabled={recording}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all disabled:bg-gray-400"
        >
          Start Recording
        </button>
        <button
          onClick={stopRecording}
          disabled={!recording}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-700 transition-all disabled:bg-gray-400"
        >
          Stop Recording
        </button>
      </div>

      {audioURL && (
        <div className="mt-4">
          <p className="text-gray-700 mb-2">Playback:</p>
          <audio controls src={audioURL} className="w-full"></audio>
        </div>
      )}
    </div>
  );
}
