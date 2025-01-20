export default function Instructions({ onClose }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Use This App</h2>
        <p className="text-gray-600 mb-4">Welcome to the Speech Misarticulation Detection app! Here's a quick guide:</p>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li>You'll see a series of words with images.</li>
          <li>Click "Start Recording" and pronounce the word clearly.</li>
          <li>If needed, use "Retake" to try again.</li>
          <li>Click "Next Word" to continue.</li>
          <li>At the end, you'll see your results and can download a report.</li>
        </ol>
        <p className="text-gray-600 mt-4">Remember, practice makes perfect! Take your time and enjoy learning.</p>
        <button 
          onClick={onClose} 
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Start Practice
        </button>
      </div>
    </div>
  );
}
