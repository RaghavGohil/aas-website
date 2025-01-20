export default function Welcome({ onStart }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <h1 className="text-3xl text-center font-bold">Welcome to Auto Articulation Screener Test</h1>
        </div>
        <div className="space-y-6">
          <p className="text-center text-lg">
            Improve your pronunciation skills with our interactive assessment tool.
          </p>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">How it works:</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>You'll see a series of words with accompanying images.</li>
              <li>Click "Start Recording" and pronounce the word clearly.</li>
              <li>Use "Retake" if you want to try again.</li>
              <li>Click "Next Word" to continue to the next word.</li>
              <li>At the end, you'll receive your results and can download a report.</li>
            </ol>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Tips for success:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Speak clearly and at a normal pace.</li>
              <li>Try to pronounce each sound in the word.</li>
              <li>Don't worry about making mistakes - this is a learning process!</li>
            </ul>
          </div>
          <button
            onClick={onStart}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Start Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
