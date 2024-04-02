import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Popular from './Components/Popular';
import AnimeItem from './Components/AnimeItem';
import React from 'react';


function App() {
 
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Popular />} />
      <Route path="/anime/:id" element={<AnimeItem />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
