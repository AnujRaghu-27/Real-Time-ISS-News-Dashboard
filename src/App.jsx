import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UnifiedDashboard from './pages/UnifiedDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UnifiedDashboard />} />
          <Route path="*" element={<UnifiedDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
