import './index.css'
import Test from './Test'
import { TestProvider } from "./TestContext";

export default function App(){
    return(
        <TestProvider>
            <Test/>
        </TestProvider>
    )
}