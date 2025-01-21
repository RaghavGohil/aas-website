import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const TestContext = createContext()

export const TestProvider = ({ children }) => {

  const [currentTestItemIndex, setCurrentTestItemIndex] = useState(0)
  const [testData, setTestData] = useState([])
  //const [results, setResults] = useState({})
  const [showWelcome, setShowWelcome] = useState(true)
  const [blobUrls, setBlobUrls] = useState({}) // sets the blob urls which point to the memory
  const [isComplete, setIsComplete] = useState(false)

  const handleRestart = () => {
    //setResults({})
    setIsComplete(false)
    setShowWelcome(true)
  }

  // start the test
  const startTest = async () => {
    try{
      let res = await axios.post(
        import.meta.env.VITE_BACKEND_URL+'/api/start-test',
        {},
        {
          withCredentials: true
        }
      )
      console.log('Test has been started successfully!!!', res.data)
      setShowWelcome(false)
    }catch(err){
      console.log('Test could not be started.', err) 
    }
  }

  const submitTest = async () => {

    if(Object.keys(blobUrls).length !== testData.length){ // all test items should be filled 
      alert('Please record in all the test items.')
      return 
    } 

    let alertConfirm = confirm('Do you want to submit this test?') // confirm submit
    if(!alertConfirm) return

   
    let res = axios.post(
      import.meta.env.VITE_BACKEND_URL+'/api/submit-test',
      {},
      {
        withCredentials: true
      }
    )    

    console.log(res)

  }

  useEffect(()=>{
    async function fetchTestData(){
      try{
        let res = await axios.get(import.meta.env.VITE_BACKEND_URL+'/api/test-data')
        setTestData(res.data) // contains the word, ipa and the image.
      }catch(err){
        console.log('Could not get the test data from the server.', err)
      }  
    }
    fetchTestData()
  },[])

  return (
      <TestContext.Provider value={{currentTestItemIndex, setCurrentTestItemIndex, testData, blobUrls, setBlobUrls, startTest, showWelcome, isComplete, submitTest}}>
          {children}
      </TestContext.Provider>
  )
}