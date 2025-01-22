import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { handleError, handleSuccess } from './Utility'

export const TestContext = createContext()

export const TestProvider = ({ children }) => {

  const [hasStartedTest, setHasStartedTest] = useState(false)
  const [hasCompletedTest, setHasCompletedTest] = useState(false)
  const [currentTestItemIndex, setCurrentTestItemIndex] = useState(0)
  const [testData, setTestData] = useState({})
  //const [results, setResults] = useState({})
  const [blobUrls, setBlobUrls] = useState({}) // sets the blob urls which point to the memory

  const handleRestart = () => {
    //setResults({})
    setHasCompletedTest(false)
  }

  // start the test
  const startTest = async (callback) => {
    try{
      let res = await axios.post(
        import.meta.env.VITE_BACKEND_URL+'/api/test/start',
        {},
        {
          withCredentials: true
        }
      )
      handleSuccess('Test has been started successfully!')
      setHasStartedTest(true)
      callback()
    }catch(err){
      handleError(err)
    }
  }

  const submitUserInformation = async (userInformation, callback)  => {
    try{
      let res = await axios.post(
        import.meta.env.VITE_BACKEND_URL+'/api/test/user-information',
        {
          'age':userInformation.age,
          'location':userInformation.location
        },
        {
          withCredentials: true
        }
      )
      handleSuccess('User information was submitted!')
      setHasStartedTest(true)
      callback()
    }catch(err){
      handleError(err)
    }
  }

  const submitTest = async (callback) => {

    if(Object.keys(blobUrls).length !== testData.length){ // all test items should be filled 
      alert('Please record in all the test items.')
      return 
    } 

    let alertConfirm = confirm('Do you want to submit this test?') // confirm submit
    if(!alertConfirm) return

    try{
      let res = await axios.post(
        import.meta.env.VITE_BACKEND_URL+'/api/test/submit',
        {},
        {
          withCredentials: true
        }
      )    
      handleSuccess('Test was submitted!', res.data)
      callback()
    }catch(err){
      console.log(err)
      handleError(err)
    }
    
    //setIsComplete(true)
  }

  return (
      <TestContext.Provider value={{testData, setTestData, currentTestItemIndex, setCurrentTestItemIndex, blobUrls, setBlobUrls, startTest, hasCompletedTest, submitTest, submitUserInformation, hasStartedTest}}>
        {children}
      </TestContext.Provider>
  )
}