import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from './pages/Game/Game';
import Start from './pages/Start/Start';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start/>} />
        <Route path="/game" element={<Game/>} />
      </Routes>
    </Router>
  );
}

export default App;
