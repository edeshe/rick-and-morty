import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import LugaresPage from './components/pages/lugaresPage';
import EpisodiosPage from './components/pages/episodiosPage';
import PersonajesPage from './components/pages/personajesPage';
import NavBarExample from './layouts/navbar';
import PersonajePage from './components/pages/personajePage';
import LugarPage from './components/pages/lugarPage';
import EpisodioPage from './components/pages/episodioPage';
import { useState, useEffect } from "react";

function App() {
  const [pagina, updatePagina] = useState(1);

  return (
    <div className="App">

      <BrowserRouter>
      <Routes>
        <Route path='/' element={ <NavBarExample /> }>
          <Route index element={ <PersonajesPage /> } />
          <Route path='lugares' element={ <LugaresPage /> } />
          <Route path='episodios' element={ <EpisodiosPage /> } />
          <Route path='personaje/:id' element={ <PersonajePage /> } />
          <Route path='lugar/:id' element={ <LugarPage /> } />
          <Route path='episodio/:id' element={ <EpisodioPage /> } />
        </Route>
      </Routes> 
      </BrowserRouter>

    </div>
  );
  // <Route path='*' element={ <Navigate replace to="/"/> }/>
}

export default App;
