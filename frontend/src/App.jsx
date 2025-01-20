import './index.css'
import Test from './Test'
import { TestProvider } from "./TestContext";
import axios from 'axios'

axios.defaults.headers.post['credentials'] = 'include'

export default function App(){
    return(
        <TestProvider>
            <Test/>
        </TestProvider>
    )
}