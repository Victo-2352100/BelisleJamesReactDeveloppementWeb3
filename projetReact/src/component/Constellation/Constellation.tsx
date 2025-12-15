import { useEffect, useState } from 'react';
import type { IConstellation } from '../../model/Constellation';
import { FormattedMessage } from 'react-intl';
import { appStyles } from '../../styles/styles';

//Pour afficher une seule constellation dans la liste
function Constellation(props: IConstellation) {
  const [etendue, setEtendue] = useState(false);
  let nbrPieces = 0;
  useEffect(() => {
    props.incarnations.map((incarnation) => {
      nbrPieces += incarnation.nombre_pieces;
    });
  }, []);
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
