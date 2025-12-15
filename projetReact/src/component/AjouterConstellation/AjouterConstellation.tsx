import { useContext, useEffect } from 'react';
import { AuthentificationContext } from '../../context/AuthentificationContext';
import { useNavigate } from 'react-router-dom';
import { appStyles } from '../../styles/styles';
import BarreNav from '../BarreNav/BarreNav';
import { FormattedMessage } from 'react-intl';

function AjouterConstellation() {
  const { estConnecte, deconnexion } = useContext(AuthentificationContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!estConnecte) {
      navigate('/connexion');
    }
  }, [estConnecte]);

  return (
    <div className={appStyles.page}>
      <BarreNav />
      <p>
        <FormattedMessage
          id="app.ajout.titre"
          defaultMessage="Page incomplète :/"
        />
      </p>
    </div>
  );
}
export default AjouterConstellation;
