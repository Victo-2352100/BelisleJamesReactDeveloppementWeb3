import { useContext, useState } from 'react';
import './App.css';
import Accueil from '../Accueil/Accueil';
import ConstellationProvider, {
  ConstellationContext,
} from '../../context/ConstellationContext';
import AuthentificationProvider from '../../context/AuthentificationContext';
import { LangueProvider } from '../../context/LangueContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ModifierConstellation from '../ModifierContellasion/ModifierConstellation';
import ListeConstellations from '../Liste/ListeConstellations';
import Connexion from '../Connexion/Connexion';

function App() {
  return (
    <LangueProvider>
      <AuthentificationProvider>
        <ConstellationProvider>
          <BrowserRouter>
            {/*Ça me fait une erreur comme quoi je ne peux aller chercher null. J'ai essayé d'effacer chacune des trois routes, sans résultat.
             L'erreur est à la ligne <BrowserRouter> 
             useRef est la source de l'erreur (reading 'useRef'), ce qui semble fait dans le browserrouter, mais je ne sais comment y remédier.*/}
            <Routes>
              <Route path="/" element={<Accueil />} />
              <Route path="/liste" element={<ListeConstellations />} />
              <Route path="/modifier/:id" element={<ModifierConstellation />} />
              <Route path="/connexion" element={<Connexion />} />
            </Routes>
          </BrowserRouter>
        </ConstellationProvider>
      </AuthentificationProvider>
    </LangueProvider>
  );
}

export default App;
