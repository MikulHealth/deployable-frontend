import logo from './assets/Whitelogo.png';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './components/pages/LandingPage';
import AboutPage from './components/pages/AboutPage';
import ConatactPage from './components/pages/ConatctPage'
import MedicRegPage from './components/pages/MedicRegPage'
import MedicRegPage2 from './components/pages/MedicRegPage2'
import VerifyNumber from './components/pages/VerifyNumber'
import MedicRegConfirmation from './components/pages/MedicConfirmationPage'
import CustomerReg from './components/pages/CustomerReg'
import Login from './components/pages/LoginPage'
function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/contact" element={<ConatactPage />}></Route>
        <Route path="/join" element={<MedicRegPage />}></Route>
        <Route path="/join-complete" element={<MedicRegPage2 />}></Route>
        <Route path="/verify-number" element={<VerifyNumber />}></Route>
        <Route path="/confirm-medic-reg" element={<MedicRegConfirmation />}></Route>
        <Route path="/customer-signUp" element={<CustomerReg />}></Route>
        <Route path="/login" element={<Login />}></Route>
        </Routes>
        </BrowserRouter>
        
    </div>
  );
}

export default App;
