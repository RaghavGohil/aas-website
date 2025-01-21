import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const TestContext = createContext()

export const TestProvider = ({ children }) => {

  const [hasStartedTest, setHasStartedTest] = useState(false)
  const [hasCompletedTest, setHasCompletedTest] = useState(false)
  const [currentTestItemIndex, setCurrentTestItemIndex] = useState(0)
  const [testData, setTestData] = useState([])
  //const [results, setResults] = useState({})
  const [blobUrls, setBlobUrls] = useState({}) // sets the blob urls which point to the memory

  const handleRestart = () => {
    //setResults({})
    setHasCompletedTest(false)
  }

  // start the test
  const startTest = async () => {
    try{
      let res = await axios.post(
        import.meta.env.VITE_BACKEND_URL+'/api/test/start',
        {},
        {
          withCredentials: true
        }
      )
      console.log('Test has been started successfully!!!', res.data)
      setHasStartedTest(true)
    }catch(err){
      console.log('Test could not be started.', err) 
    }
  }

  useEffect(()=>{
    async function fetchTestData(){
      try{
        let res = await axios.get(import.meta.env.VITE_BACKEND_URL+'/api/test/data')
        setTestData(res.data) // contains the word, ipa and the image.
      }catch(err){
        console.log('Could not get the test data from the server.', err)
      }  
    }
    fetchTestData()
  },[])

  const submitTest = async () => {

    if(Object.keys(blobUrls).length !== testData.length){ // all test items should be filled 
      alert('Please record in all the test items.')
      return 
    } 

    let alertConfirm = confirm('Do you want to submit this test?') // confirm submit
    if(!alertConfirm) return

   
    let res = await axios.post(
      import.meta.env.VITE_BACKEND_URL+'/api/test/submit',
      {},
      {
        withCredentials: true
      }
    )    
    console.log(res.data)
    //setIsComplete(true)
  }

  return (
      <TestContext.Provider value={{currentTestItemIndex, setCurrentTestItemIndex, testData, blobUrls, setBlobUrls, startTest, hasCompletedTest, submitTest, hasStartedTest}}>
          {children}
      </TestContext.Provider>
  )
}