import './App.css';
import { Routes,Route,useLocation } from "react-router-dom";
import Coverpage from './pages/CoverPage.jsx';
import LoginPage from './pages/Login/Login.jsx';
import { AnimatePresence } from 'framer-motion'; 

const App = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location ={location} key={location.pathname}>
        <Route index element={<Coverpage />} />
        <Route path="/Login" element={<LoginPage />} />
      </Routes>
    </AnimatePresence> 
  );
};

export default App
