import './index.css'
import TestCarousel from './TestCarousel'
import Welcome from './Welcome';
import Results from './components/Results'
import UserInformation from './UserInformation'
import { TestProvider } from "./TestContext";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

export default function App(){
    return(
        <>
            <ToastContainer/>
            <TestProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Welcome/>} />    
                        <Route path='/test/user-information' element={<UserInformation/>}/>
                        <Route path='/test/attempt' element={<TestCarousel/>}/>
                        <Route path='/test/results' element={<Results/>}/>
                    </Routes> 
                </BrowserRouter>
            </TestProvider>
        </>
    )
}