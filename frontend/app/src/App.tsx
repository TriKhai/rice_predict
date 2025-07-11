import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PredictPage from './pages/Predict/PredictPage';
import MainPage from './pages/MainPage';
import HomePage from './pages/Home/HomePage';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route element={<MainPage />}>
              <Route path="/home" element={<HomePage />} /> 
              <Route path="/predict" element={<PredictPage />} /> 
          </Route>

          <Route path="*" element={<Navigate to="/home" replace />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
