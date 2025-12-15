import { useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthentificationContext } from '../../context/AuthentificationContext';
import axios from 'axios';
import type {
  IConstellation,
  IIncarnation,
  Rang,
} from '../../model/Constellation';
import { appStyles } from '../../styles/styles';
import BarreNav from '../BarreNav/BarreNav';
import { ConstellationContext } from '../../context/ConstellationContext';

function ModifierConstellation() {
  const { id } = useParams();
  const { jeton } = useContext(AuthentificationContext);
  const IncarnationsVide: IIncarnation[] = [];
  //Section pour les erreurs. Ce sont des booléens pour s'assurer d'afficher les FormattedMessages appropriés
  const [erreurRequeteAPI, setErreurRequeteAPI] = useState(false);
  const [erreurNoms, setErreurNoms] = useState(false);
  const [erreurSignatures, setErreursSignatures] = useState(false);
  const [erreurDateIncarnation, setErreurDateIncarnation] = useState(false);
  const [erreurNbrIncarnations, setErreurNbrIncarnations] = useState(false);
  const [erreurStatIncarnations, setErreurStatIncarnations] = useState(false);
  const [erreurFablesConstellation, setErreurFablesConstellation] =
    useState(false);
  //Fin de la section des variables d'erreurs.

  //Section pour les variables d'état des valeurs de la constellation à modifier
  const [constellation, setConstellation] = useState<IConstellation | null>(
    null,
  );
  const { modifier } = useContext(ConstellationContext);
  const [alias, setAlias] = useState('');
  const [veritableNom, setVeritableNom] = useState('');
  const [signatures, setSignatures] = useState<string[]>([]); //Forcer la valeur à être un tableau de string (il pense que c'est un 'never' sinon.)
  const [affiliation, setAffiliation] = useState('');
  const [incarnations, setIncarnations] =
    useState<IIncarnation[]>(IncarnationsVide);
  const [nebuleuse, setNebuleuse] = useState('');
  const [fables, setFables] = useState<string[]>([]);
  const [rang, setRang] = useState<Rang>('Inférieur'); //Forcer la valeur à être un enum. Source: ChatGPT, généré le 11 décembre 2025
  const [dateIncarnation, setDateIncarnation] = useState(new Date());
  const [incarnee, setIncarnee] = useState(false);
  //Fun de la section des variables d'état des valeurs de constellation.
  //Pour aider à valider l'ENUM
  const rangsDisponibles: Rang[] = [
    'Inférieur',
    'Historique',
    'Mythologique',
    'Narratif',
    'Fable',
    'Externe',
  ];
  const { estConnecte } = useContext(AuthentificationContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!estConnecte) {
      navigate('/connexion');
    }
  }, [estConnecte]);
  const gererValidation = (): boolean => {
    //Gérer les erreurs dans les noms
    if (!alias.trim() || !veritableNom.trim() || !nebuleuse.trim()) {
      setErreurNoms(true);
    } else {
      setErreurNoms(false);
    }
    if (!signatures.length || (signatures.length == 1 && signatures[0] == '')) {
      setErreursSignatures(true);
    } else {
      setErreursSignatures(false);
    }
    if (fables.length < 3) {
      setErreurFablesConstellation(true);
    } else {
      setErreurFablesConstellation(false);
    }
    if (dateIncarnation.getTime() > Date.now()) {
      setErreurDateIncarnation(true);
    } else {
      setErreurDateIncarnation(false);
    }
    if (
      !constellation?.incarnations.length ||
      constellation.incarnations.length < 3
    ) {
      setErreurNbrIncarnations(true);
    } else {
      constellation.incarnations.forEach((incarnation) => {
        if (
          incarnation.niveau_agilite < 0 ||
          incarnation.niveau_agilite > 100 ||
          incarnation.niveau_endurance < 0 ||
          incarnation.niveau_endurance > 100 ||
          incarnation.niveau_force < 0 ||
          incarnation.niveau_force > 100 ||
          incarnation.niveau_mana < 0 ||
          incarnation.niveau_mana > 100 ||
          incarnation.niveau_volonte < 0 ||
          incarnation.niveau_volonte > 100
        ) {
          setErreurStatIncarnations(true);
        }
      });
    }
    /*const soumettreFormulaire = () => {
      if (gererValidation() && constellation != null) {
        modifier(constellation);
      }
    };*/
    return (
      erreurDateIncarnation &&
      erreurFablesConstellation &&
      erreurNbrIncarnations &&
      erreurNoms &&
      erreurSignatures &&
      erreurStatIncarnations
    );
  };
  useEffect(() => {
    axios
      .get(
        'https://https://constellationsapi-gaduewgrd6cbh9g6.canadacentral-01.azurewebsites.net/api/constellations/getById/' +
          id,
        {
          headers: {
            Authorization: `Bearer ${jeton}`,
          },
        },
      )
      .then((reponse) => {
        setConstellation(reponse.data);
        setSignatures(reponse.data.signatures); //S'assurer que les signatures ont ce qu'il faut, je crois
        setIncarnations(reponse.data.incarnation);
      })
      .catch((e) => {
        setErreurRequeteAPI(e);
      });
  }, [id]);
  let tabSignatures: string[] = constellation!.signatures;
  return (
    <div className={appStyles.page}>
      <BarreNav />
      {!constellation ? (
        <>
          <FormattedMessage
            id="app.formulaire.vide"
            defaultMessage="Aucune constellation trouvée"
          />
          <a href="/liste">
            <button>
              <FormattedMessage
                id="app.retour.liste"
                defaultMessage="Retour liste"
              />
            </button>
          </a>
        </>
      ) : (
        <>
          <div>
            <FormattedMessage
              id="app.modifier.titre"
              defaultMessage="Modifier"
            />
            <div className="top-1.5" />
            <label>
              {/*Source pour le label: https://www.w3schools.com/react/react_forms.asp */}
              <FormattedMessage
                id="app.formulaire.alias"
                defaultMessage="Alias:"
              />
              <input type="text" value={constellation.alias} />
            </label>
            <label>
              <FormattedMessage
                id="app.formulaire.veritableNom"
                defaultMessage="Véritable nom:"
              />
              <input type="text" value={constellation.veritable_nom} />
            </label>
            <label>
              <FormattedMessage
                id="app.formulaire.signatures"
                defaultMessage="Signatures (talents):"
              />
              {signatures.map(
                (
                  signature, //Pour montrer chaque signature de la constellation.
                  id,
                ) => (
                  <input
                    type="text"
                    value={signature}
                    onChange={(n) => {
                      const copieSignatures = [...signatures];
                      copieSignatures[id] = n.target.value; //Changer la signature correspondante
                      setSignatures(copieSignatures);
                    }}
                  />
                ),
              )}
            </label>
            <label>
              <FormattedMessage
                id="app.formulaire.affiliation"
                defaultMessage="Affiliation (optionnel)"
              />
              <input type="text" value={constellation.affiliation} />
            </label>
            <div>
              <FormattedMessage id="app.formulaire.listeIncarnations" />
              {incarnations.map((incarnation, incarnationId) => (
                <div>
                  <label>
                    <FormattedMessage
                      id="app.formulaire.incarnationNom"
                      defaultMessage="Nom incarnation"
                      values={{ numeroConstellation: id }}
                    />
                    <input
                      type="text"
                      value={incarnation.nom}
                      onChange={(e) => {
                        const copieIncarnations = [...incarnations];
                        copieIncarnations[incarnationId].nom = e.target.value;
                        setIncarnations(copieIncarnations);
                      }}
                    />
                  </label>
                  <label>
                    <FormattedMessage
                      id="app.formulaire.incarnationNvForce"
                      defaultMessage="Niveau force"
                      values={{ numeroConstellation: id }}
                    />
                    <input
                      type="number"
                      value={incarnation.niveau_force}
                      onChange={(e) => {
                        const copieIncarnations = [...incarnations];
                        copieIncarnations[incarnationId].niveau_force =
                          parseInt(e.target.value);
                        setIncarnations(copieIncarnations);
                      }}
                    />
                  </label>
                  <label>
                    <FormattedMessage
                      id="app.formulaire.incarnationNvEndurance"
                      defaultMessage="Niveau endurance"
                      values={{ numeroConstellation: id }}
                    />
                    <input
                      type="number"
                      value={incarnation.niveau_endurance}
                      onChange={(e) => {
                        const copieIncarnations = [...incarnations];
                        copieIncarnations[incarnationId].niveau_endurance =
                          parseInt(e.target.value);
                        setIncarnations(copieIncarnations);
                      }}
                    />
                  </label>
                  <label>
                    <FormattedMessage
                      id="app.formulaire.incarnationNvMana"
                      defaultMessage="Niveau mana"
                      values={{ numeroConstellation: id }}
                    />
                    <input
                      type="number"
                      value={incarnation.niveau_mana}
                      onChange={(e) => {
                        const copieIncarnations = [...incarnations];
                        copieIncarnations[incarnationId].niveau_mana = parseInt(
                          e.target.value,
                        );
                        setIncarnations(copieIncarnations);
                      }}
                    />
                  </label>
                  <label>
                    <FormattedMessage
                      id="app.formulaire.incarnationNvAgilite"
                      defaultMessage="Niveau agilite"
                      values={{ numeroConstellation: id }}
                    />
                    <input
                      type="number"
                      value={incarnation.niveau_agilite}
                      onChange={(e) => {
                        const copieIncarnations = [...incarnations];
                        copieIncarnations[incarnationId].niveau_agilite =
                          parseInt(e.target.value);
                        setIncarnations(copieIncarnations);
                      }}
                    />
                  </label>
                  <label>
                    <FormattedMessage
                      id="app.formulaire.incarnationNvVolonte"
                      defaultMessage="Niveau volonte"
                      values={{ numeroConstellation: id }}
                    />
                    <input
                      type="number"
                      value={incarnation.niveau_volonte}
                      onChange={(e) => {
                        const copieIncarnations = [...incarnations];
                        copieIncarnations[incarnationId].niveau_volonte =
                          parseInt(e.target.value);
                        setIncarnations(copieIncarnations);
                      }}
                    />
                  </label>
                  <label>
                    <FormattedMessage
                      id="app.formulaire.incarnationNbrPieces"
                      defaultMessage="Nombre pièces"
                      values={{ numeroConstellation: id }}
                    />
                    <input
                      type="number"
                      value={incarnation.nombre_pieces}
                      onChange={(e) => {
                        const copieIncarnations = [...incarnations];
                        copieIncarnations[incarnationId].nombre_pieces =
                          parseInt(e.target.value);
                        setIncarnations(copieIncarnations);
                      }}
                    />
                  </label>
                  <label>
                    <FormattedMessage
                      id="app.formulaire.incarnationListeFables"
                      defaultMessage="Fables (facultatif)"
                    />
                  </label>
                  <div>
                    {!incarnation.fables ? (
                      <label>
                        <FormattedMessage
                          id="app.formulaire.fableVide"
                          defaultMessage="Ajouter fable (facultatif)"
                        />
                        <input
                          type="text"
                          onChange={(e) => {
                            const copieIncarnations = [...incarnations];
                            const copieFables = [
                              //S'il n'y a aucune table/null, on met un vide
                              ...(copieIncarnations[incarnationId].fables ??
                                []),
                            ]; //S'il n'y a aucune fable, eh bien, on ajoute une table
                            copieFables.push(e.target.value);
                            copieIncarnations[incarnationId].fables =
                              copieFables;
                            setIncarnations(copieIncarnations);
                          }}
                        />
                      </label>
                    ) : (
                      <>
                        {incarnation.fables?.map((fable, fableId) => (
                          <label>
                            <FormattedMessage
                              id="app.formulaire.fableListe"
                              defaultMessage="Fable"
                            />
                            <input
                              type="text"
                              value={fable}
                              onChange={(e) => {
                                const copieIncarnations = [...incarnations];
                                const copieFables = [
                                  ...(copieIncarnations[incarnationId].fables ??
                                    []),
                                ]; //Pour voir s'il est undefined, react veut rien d'autre
                                copieFables[fableId] = e.target.value;
                                copieIncarnations[incarnationId].fables =
                                  copieFables;
                                setIncarnations(copieIncarnations);
                              }}
                            />
                          </label>
                        ))}
                      </>
                    )}
                  </div>
                  <label>
                    <FormattedMessage
                      id="app.incarnation.formulaire.morte"
                      defaultMessage="Incarnation morte?"
                    />
                    <input
                      type="checkbox"
                      checked={incarnation.mort}
                      onChange={(e) => {
                        const copieIncarnations = [...incarnations];
                        copieIncarnations[incarnationId].mort =
                          e.target.checked;
                        setIncarnations(copieIncarnations);
                      }}
                    />
                  </label>
                </div>
              ))}
            </div>
            <label>
              <FormattedMessage
                id="app.formulaire.nebuleuse"
                defaultMessage="Nebuleuse?"
              />
              <input
                type="text"
                value={nebuleuse}
                onChange={(e) => {
                  if (e.target.value == '' || !e.target.value) {
                    setNebuleuse('Aucune'); //Comme dit dans mon API, s'il n'y a aucune nébuleuse, dire "aucune".
                  } else {
                    setNebuleuse(e.target.value);
                  }
                }}
              />
            </label>
            <div>
              <label>
                <FormattedMessage
                  id="app.formulaire.listeFables"
                  defaultMessage="3 Fables minimum."
                />
                {fables.map((fable, id) => (
                  <>
                    <FormattedMessage
                      id="app.formulaire.fable"
                      defaultMessage="Fable"
                    />
                    <input
                      value={fable}
                      onChange={(e) => {
                        const copieFables = [...fables];
                        if (e.target.value.length < 3) {
                          copieFables[id] = '[ ' + e.target.value + ' ]';
                        } else {
                          copieFables[id] = e.target.value;
                        }
                      }}
                    />
                  </>
                ))}
              </label>
            </div>
            <label>
              <FormattedMessage
                id="app.formulaire.rang"
                defaultMessage="Rang"
              />
              <select>
                {rangsDisponibles.map(
                  (
                    rang, //On utilise le tableau de rangs pour la clé, la valeur et le texte des options
                  ) => (
                    <option key={rang} value={rang}>
                      {rang}
                    </option>
                  ),
                )}
              </select>
            </label>
            <label>
              <FormattedMessage
                id="app.formulaire.dateIncarnation"
                defaultMessage="Date de dernière incarnation"
              />
              <input
                type="date"
                max={
                  `${new Date().toLocaleString(
                    'en-CA',
                  )}` /*devrait donner le format nécessaire pour le HTML Source: https://www.geeksforgeeks.org/javascript/how-to-format-javascript-date-as-yyyy-mm-dd/*/
                }
              />
            </label>
            <label>
              <FormattedMessage
                id="app.formulaire.incarnee"
                defaultMessage="Incarnée?"
              />
              <input
                type="checkbox"
                checked={incarnee}
                onChange={(e) => {
                  setIncarnee(e.target.checked);
                }}
              />
            </label>
            {
              <div className="">
                {/* Section qui s'occupera d'afficher les erreurs si on en trouve. */}
              </div>
            }

            <button
              onClick={() => {
                /*soumettre() pas eu le temps de finir cette fonction*/
              }}
            >
              <FormattedMessage
                id="app.formulaire.confirmer"
                defaultMessage="Confirmer?"
              />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
export default ModifierConstellation;
