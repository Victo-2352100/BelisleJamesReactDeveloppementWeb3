import { useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import BarreNav from '../BarreNav/BarreNav';
import { appStyles } from '../../styles/styles';
import axios from 'axios';
import { AuthentificationContext } from '../../context/AuthentificationContext';

function Connexion() {
  const [email, setEmail] = useState('');
  const [motPasse, setMotPasse] = useState('');
  const { estConnecte, deconnexion } = useContext(AuthentificationContext);
  async function connecter() {
    axios.get('');
  }
  function deconnecter() {
    deconnexion();
  }
  return (
    <div className={appStyles.page}>
      <BarreNav />
      {estConnecte ? (
        <>
          <p className={appStyles.titre}>
            <FormattedMessage
              id="app.connexion.deconnexion"
              defaultMessage="Déconnecter"
            />
          </p>
          <button
            className={appStyles.boutonGenerique}
            onClick={() => deconnecter()}
          >
            <FormattedMessage
              id="app.connexion.confirmer"
              defaultMessage="Confirmer?"
            />
          </button>
        </>
      ) : (
        <>
          <label>
            <FormattedMessage
              id="app.connexion.email"
              defaultMessage="Email:"
            />
            <input type="text" value={email} />
          </label>
          <label>
            <FormattedMessage
              id="app.connexion.motPasse"
              defaultMessage="Mot de passe:"
            />
            <input type="text" value={motPasse} />
          </label>
        </>
      )}
    </div>
  );
}
export default Connexion;
