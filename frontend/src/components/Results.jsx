import { useState } from 'react';
import { Check, X, FileDown, RotateCcw } from 'lucide-react';

export default function ResultScreen({ results, words, onRestart }) {
  const [pdfUrl, setPdfUrl] = useState(null);

  const correctWords = words.filter(word => results[word.word]);
  const incorrectWords = words.filter(word => !results[word.word]);
  const accuracy = (correctWords.length / words.length) * 100;

  const generatePDF = () => {
    // Simulate PDF generation
    setTimeout(() => {
      setPdfUrl('/sample.pdf');
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Your Results</h1>
      <p className="text-center mb-8 text-gray-600">Great job completing the assessment! Here's how you did:</p>

      <div className="mb-8 p-6 border border-gray-200 rounded-lg shadow-md">
        <p className="text-4xl font-bold mb-4 text-center">Accuracy: {accuracy.toFixed(2)}%</p>
        <p className="text-center mb-4">You correctly pronounced {correctWords.length} out of {words.length} words.</p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={generatePDF}
            disabled={pdfUrl !== null}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
          >
            {pdfUrl ? 'Report Generated' : 'Generate Report'}
          </button>

          {pdfUrl && (
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
              <a href={pdfUrl} download>
                <FileDown className="mr-2 h-4 w-4" /> Download Report
              </a>
            </button>
          )}

          <button
            onClick={onRestart}
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg"
          >
            <RotateCcw className="mr-2 h-4 w-4" /> Start New Assessment
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-6 border border-green-500 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Check className="mr-2 h-5 w-5 text-green-500" />
            <span className="text-xl font-bold">Well Pronounced</span>
          </div>
          <ul>
            {correctWords.map(word => (
              <li key={word.word} className="mb-2 flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                {word.word} <span className="text-gray-500 ml-2">({word.ipa})</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 border border-red-500 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <X className="mr-2 h-5 w-5 text-red-500" />
            <span className="text-xl font-bold">Needs Practice</span>
          </div>
          <ul>
            {incorrectWords.map(word => (
              <li key={word.word} className="mb-2 flex items-center">
                <X className="mr-2 h-4 w-4 text-red-500" />
                {word.word} <span className="text-gray-500 ml-2">({word.ipa})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
