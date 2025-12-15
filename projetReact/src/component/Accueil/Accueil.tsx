import { FormattedMessage } from 'react-intl';
import { appStyles } from '../../styles/styles';
import BarreNav from '../BarreNav/BarreNav';

function Accueil() {
  return (
    <div className={appStyles.page}>
      <BarreNav />
      <FormattedMessage id="app.titre" defaultMessage="Titre application" />
    </div>
  );
}
export default Accueil;
