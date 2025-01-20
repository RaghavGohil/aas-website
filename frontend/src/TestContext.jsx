import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const TestContext = createContext()

export const TestProvider = ({ children }) => {

    const [currentTestItemIndex, setCurrentTestItemIndex] = useState(0)
    const [testData, setTestData] = useState([])
    //const [results, setResults] = useState({})

    useEffect(()=>{
      async function fetchTestData(){
        try{
          let res = await axios.get(import.meta.env.VITE_BACKEND_URL+'/api/test-data')
          setTestData(res.data) // contains the word, ipa and the image.
        }catch(err){
          console.log('Could not get the test data from the server.', err)
        }  
      }
      fetchTestData();
    },[])

    return (
        <TestContext.Provider value={{currentTestItemIndex, setCurrentTestItemIndex, testData}}>
            {children}
        </TestContext.Provider>
    );
};