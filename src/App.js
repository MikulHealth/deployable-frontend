import logo from './assets/Whitelogo.png';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './components/pages/LandingPage';
import AboutPage from './components/pages/AboutPage';
import ConatactPage from './components/pages/ConatctPage'
function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/contact" element={<ConatactPage />}></Route>
        </Routes>
        </BrowserRouter>
        
    </div>
  );
}

export default App;
