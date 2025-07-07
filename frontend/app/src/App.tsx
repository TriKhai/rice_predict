import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home'
import PredictPage from './pages/Predict/PredictPage';

function App() {

  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} />*/}
        <Route path="/predict" element={<PredictPage />} /> 
        </Routes>
      </Router>
    </>
  )
}

export default App
