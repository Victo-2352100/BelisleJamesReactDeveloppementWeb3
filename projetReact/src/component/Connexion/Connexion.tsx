import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import BarreNav from '../BarreNav/BarreNav';
import { appStyles } from '../../styles/styles';

function Connexion() {
  const [email, setEmail] = useState('');
  const [motPasse, setMotPasse] = useState('');
  return (
    <div className={appStyles.page}>
      <BarreNav />
      <label>
        <FormattedMessage id="app.connexion.email" defaultMessage="Email:" />
        <input type="text" value={email} />
      </label>
      <label>
        <FormattedMessage
          id="app.connexion.motPasse"
          defaultMessage="Mot de passe:"
        />
        <input type="text" value={motPasse} />
      </label>
    </div>
  );
}
export default Connexion;
