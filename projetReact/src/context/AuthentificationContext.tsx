import axios from 'axios';
import { createContext, useState } from 'react';

export type AuthentificationContextType = {
  estConnecte: boolean;
  jeton: string;
  connexion: (email: string, motpasse: string) => Promise<boolean>;
  deconnexion: () => void;
};

export const AuthentificationContext =
  createContext<AuthentificationContextType>({
    estConnecte: false,
    jeton: '',
    connexion: () => new Promise<boolean>(() => false),
    deconnexion: () => {},
  });

export default function AuthentificationProvider(props: any) {
  const [estConnecte, setEstConnecte] = useState(false);
  const [jeton, setJeton] = useState('');

  async function connexion(email: string, motpasse: string) {
    return axios.post('', { email, motpasse }).then((reponse) => {
      const { jetonConnexion } = reponse.data;
      if (jetonConnexion) {
        setEstConnecte(true);
        setJeton(jetonConnexion);
        return true;
      } else {
        setEstConnecte(false);
        setJeton('');
        return false;
      }
    });
  }
  function deconnexion() {
    setJeton('');
    setEstConnecte(false);
  }

  const valeurs = { estConnecte, jeton, connexion, deconnexion };
  return (
    <AuthentificationContext.Provider value={valeurs}>
      {props.children}
    </AuthentificationContext.Provider>
  );
}
