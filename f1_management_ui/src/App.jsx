import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import DriversTeamPage from './components/DriversTeamPage';
import SponsorsPage from './components/SponsorsPage';
import RacesAwardsPage from './components/RacesAwardsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/drivers-teams" element={<DriversTeamPage />} />
      <Route path="/sponsors" element={<SponsorsPage />} />
      <Route path="/races-awards" element={<RacesAwardsPage />} />
    </Routes>
  );
}

export default App;