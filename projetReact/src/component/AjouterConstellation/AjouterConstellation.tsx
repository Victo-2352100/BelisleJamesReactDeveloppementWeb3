import { useContext, useEffect } from 'react';
import { AuthentificationContext } from '../../context/AuthentificationContext';
import { useNavigate } from 'react-router-dom';
import { appStyles } from '../../styles/styles';
import BarreNav from '../BarreNav/BarreNav';

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
    </div>
  );
}
export default AjouterConstellation;
