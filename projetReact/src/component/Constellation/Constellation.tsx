import { useContext, useEffect, useState } from 'react';
import type { IConstellation } from '../../model/Constellation';
import { FormattedMessage } from 'react-intl';
import { appStyles } from '../../styles/styles';
import axios from 'axios';
import { AuthentificationContext } from '../../context/AuthentificationContext';
import { useNavigate } from 'react-router-dom';

//Pour afficher une seule constellation dans la liste
function Constellation(props: IConstellation) {
  const [etendue, setEtendue] = useState(false);
  const [erreurSuppression, setErreurSuppression] = useState(false);
  const { estConnecte } = useContext(AuthentificationContext);
  let nbrPieces = 0;
  useEffect(() => {
    props.incarnations.map((incarnation) => {
      nbrPieces += incarnation.nombre_pieces;
    });
  }, []);
  function supprimer() {
    axios
      .delete(
        'https://https://constellationsapi-gaduewgrd6cbh9g6.canadacentral-01.azurewebsites.net/api/constellations/delete/' +
          props._id,
      )
      .then((resultat) => {
        const navigate = useNavigate();
        navigate('/liste');
      })
      .catch((e) => {
        setErreurSuppression(true);
      });
  }
  return (
    <>
      {!etendue ? (
        <div className={appStyles.elementListe}>
          <p className={appStyles.texteElementListe}>
            <FormattedMessage
              id="app.liste.resume"
              defaultMessage={props.alias}
              values={{
                alias: props.alias,
                pieces: nbrPieces,
                nbrFables: props.fables.length,
              }}
            />
          </p>
          <button onClick={() => setEtendue(true)}>
            <FormattedMessage
              id="app.element.etendre"
              defaultMessage="Étendre"
            />
          </button>
          {!erreurSuppression ? (
            <>
              <button
                onClick={() => {
                  supprimer();
                }}
              >
                <FormattedMessage
                  id="app.element.supprimer"
                  defaultMessage="Supprimer constellation?"
                />
              </button>
            </>
          ) : (
            <>
              <FormattedMessage
                id="app.element.erreurSuppression"
                defaultMessage="Suppression échouée"
              />
            </>
          )}
        </div>
      ) : (
        <div className={appStyles.elementListe}>
          <a href={appStyles.texteElementListe}>
            <a href={'/modifier:' + props._id} className={appStyles.liste}>
              <FormattedMessage
                id="app.element.modifier"
                defaultMessage="Modifier"
              />
            </a>
          </a>
        </div>
      )}
    </>
  );
}
export default Constellation;
