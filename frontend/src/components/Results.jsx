import { useState, useContext, useEffect } from 'react'
import { Check, X, FileDown, RotateCcw, Loader } from 'lucide-react'
import { TestContext } from '../TestContext'
import { useNavigate } from 'react-router-dom'

const words = [
    {"word": "man", "ipa": "/mæn/", "image": "https://media.istockphoto.com/id/980239992/vector/happy-handsome-man-showing-thumbs-up-concept-illustration-in-cartoon-style.jpg?s=612x612&w=0&k=20&c=1ikVDLkafPxGOLqq4gtIs4HQFBQpdjuiaSchIoqW_M4=" },
    {"word": "red", "ipa": "/ɹɛd/", "image": "https://www.solidbackgrounds.com/images/1920x1080/1920x1080-red-solid-color-background.jpg" },
    {"word": "sun", "ipa": "/sʌn/", "image": "https://market-resized.envatousercontent.com/previews/files/258481713/preview.jpg?w=590&h=590&cf_fit=crop&crop=top&format=auto&q=85&s=f3db3d967a3e35ed674eb1e6f6fec35ebc54147fc5bb37f08180b0d92d7a1fa1" },
    {"word": "cat", "ipa": "/kæt/", "image": "https://i.pinimg.com/736x/11/8c/c8/118cc81c633316f14688da16832f90b3.jpg" },
    {"word": "fan", "ipa": "/fæn/", "image": "https://cdn.vectorstock.com/i/500p/78/88/fan-vector-25477888.jpg" },
    {"word": "cow", "ipa": "/kaʊ/", "image": "https://img.freepik.com/free-vector/cute-cow-cartoon-character_1308-134420.jpg?t=st=1737199940~exp=1737203540~hmac=7c241d1743d7fdb8bd372829731945d8591fda822ec47ba832a6ce6141660e22&w=826" },
    {"word": "big", "ipa": "/bIg/", "image": "https://www.freepik.com/premium-psd/big-text-effect-3d-rendering-vector-illustration_38491113.htm" },
    {"word": "lip", "ipa": "/lɪp/", "image": "https://img.freepik.com/premium-vector/mouth-lips-cartoon-female-sexy-part-body_24911-12319.jpg?w=1380" },
    {"word": "rat", "ipa": "/ɹæt/", "image": "https://www.freepik.com/free-vector/playful-little-creature_5366859.htm" },
    {"word": "old", "ipa": "/oʊld/", "image": "http://img.freepik.com/free-vector/hand-drawn-old-man-cartoon-illustration_52683-117765.jpg" },
    {"word": "dog", "ipa": "/dɔɡ/", "image": "https://img.freepik.com/free-photo/cute-spitz_144627-7076.jpg" },
    {"word": "run", "ipa": "/ɹən/", "image": "https://img.freepik.com/premium-vector/beautiful-professional-cartoon-character-design-vector-illustration_1253202-273605.jpg?w=826" },
    {"word": "fat", "ipa": "/fæt/", "image": "https://img.freepik.com/free-vector/hand-drawn-fat-person-cartoon-illustration_52683-117783.jpg" },
    {"word": "boy", "ipa": "/bɔɪ/", "image": "https://img.freepik.com/free-vector/cute-boy-with-peace-sign-cartoon-vector-icon-illustration-people-fashion-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3946.jpg" },
    {"word": "cup", "ipa": "/kəp/", "image": "https://img.freepik.com/free-psd/beverage-illustration-design_23-2151470158.jpg" },
    {"word": "sit", "ipa": "/sɪt/", "image": "https://img.freepik.com/premium-vector/man-sitting-sofa-icon_24877-43683.jpg" },
    {"word": "hot", "ipa": "/hɑt/", "image": "https://img.freepik.com/premium-vector/fire-decorative-icon_98292-1613.jpg" },
    {"word": "hen", "ipa": "/hɛ́n/", "image": "https://img.freepik.com/free-vector/chicken-finger-gestures-pointing-cartoon-character_1308-85016.jpg" },
    {"word": "fox", "ipa": "/fɔ́ks/", "image": "https://img.freepik.com/premium-vector/cute-cartoon-style-running-red-fox-white-background_1174662-4341.jpg" },
    {"word": "pen", "ipa": "/pɛ́n/", "image": "https://img.freepik.com/free-vector/cartoonish-blue-fountain-pen-isolated-white-background-vector-illustration_8130-2560.jpg" },
    {"word": "box", "ipa": "/bɒks/", "image": "https://img.freepik.com/free-vector/sticker-empty-box-opened-white-background_1308-68243.jpg" },
    {"word": "new", "ipa": "/nɪu̯/", "image": "https://media.istockphoto.com/id/1254219019/vector/new-comic-speech-bubble-vector-flat-illustrations.jpg" },
    {"word": "hat", "ipa": "/hæt/", "image": "https://img.freepik.com/free-vector/hat-travel-icon-illustration_32991-1021.jpg" },
    {"word": "wet", "ipa": "/wɛt/", "image": "https://img.freepik.com/free-vector/opposite-adjective-dry-wet_1308-2856.jpg" },
    {"word": "day", "ipa": "/deɪ/", "image": "https://img.freepik.com/free-vector/sunset-nature-view_1308-24780.jpg" },
    {"word": "out", "ipa": "/aʊt/", "image": "https://img.freepik.com/premium-vector/illustrator-opposites-out-object_65947-816.jpg" }
];

export default function Result() {
  
  const [pdfUrl, setPdfUrl] = useState(null)
  const [loading, setLoading] = useState(true)
  const [wellPronounced, setWellPronounced] = useState([])
  const [mispronounced, setMispronounced] = useState([])
  const [accuracy, setAccuracy] = useState(0)
  
  const { testData } = useContext(TestContext)
  const navigate = useNavigate()

  useEffect(() => {
    // Simulate loading time (3 seconds)
    setTimeout(() => {
      // Randomly determine which words are well-pronounced or mispronounced
      const randomResults = words.map((word) => ({
        ...word,
        correctlyPronounced: Math.random() > 0.5,  // Randomly decide if the word is well-pronounced
      }));
      
      const well = randomResults.filter((word) => word.correctlyPronounced)
      const mis = randomResults.filter((word) => !word.correctlyPronounced)

      setWellPronounced(well)
      setMispronounced(mis)
      setAccuracy((well.length / words.length) * 100)  // Calculate accuracy based on well-pronounced words
      
      setLoading(false)
    }, 3000);  // Loading for 3 seconds
  }, [])

  const generatePDF = () => {
    // Simulate PDF generation
    setTimeout(() => {
      setPdfUrl('/sample.pdf')
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Your Results</h1>
      <p className="text-center mb-8 text-gray-600">Great job completing the assessment! Here's how you did:</p>

      {loading ? (
        <div className="flex justify-center">
          <Loader className="h-12 w-12 text-blue-600 animate-spin" />
        </div>
      ) : (
        <div className="mb-8 p-6 border border-gray-200 rounded-lg shadow-md">
          <p className="text-4xl font-bold mb-4 text-center">Accuracy: {accuracy.toFixed(2)}%</p>
          <p className="text-center mb-4">You correctly pronounced {wellPronounced.length} out of {words.length} words.</p>

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
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg"
            >
              <RotateCcw className="mr-2 h-4 w-4" /> Start New Assessment
            </button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-6 border border-green-500 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Check className="mr-2 h-5 w-5 text-green-500" />
            <span className="text-xl font-bold">Well Pronounced</span>
          </div>
          <ul>
            {wellPronounced.map((word) => (
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
            {mispronounced.map((word) => (
              <li key={word.word} className="mb-2 flex items-center">
                <X className="mr-2 h-4 w-4 text-red-500" />
                {word.word} <span className="text-gray-500 ml-2">({word.ipa})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
