import { FormattedMessage } from 'react-intl';
import type { IConstellation } from '../../model/Constellation';
import Constellation from '../Constellation/Constellation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { appStyles } from '../../styles/styles';
import BarreNav from '../BarreNav/BarreNav';

function ListeConstellations() {
  const [constellations, setConstellations] = useState<IConstellation[]>([]);
  const [erreurRequeteAPI, setErreurRequeteAPI] = useState(false);
  useEffect(() => {
    axios
      .get(
        'https://https://constellationsapi-gaduewgrd6cbh9g6.canadacentral-01.azurewebsites.net/api/constellations/toutes',
      )
      .then((reponse) => {
        setConstellations(reponse.data.constellations);
      })
      .catch((e: string) => {
        setErreurRequeteAPI(true);
        console.log(e);
      });
  }, []);
  return (
    <div className={appStyles.page}>
      <BarreNav />
      {!erreurRequeteAPI ? (
        <>
          <FormattedMessage
            id="app.liste.titre"
            defaultMessage="Liste des constellations"
          />
          <div className={appStyles.liste}>
            {constellations.map((constellation) => (
              <Constellation {...constellation} />
            ))}
          </div>
        </>
      ) : (
        <>
          <FormattedMessage
            id="app.liste.erreurListe"
            defaultMessage="Erreur pour liste"
          />
        </>
      )}
    </div>
  );
}
export default ListeConstellations;
