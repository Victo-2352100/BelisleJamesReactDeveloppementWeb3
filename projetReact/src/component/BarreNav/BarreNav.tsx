import { useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { LangueContext } from '../../context/LangueContext';
import { useNavigate } from 'react-router-dom';
import { AuthentificationContext } from '../../context/AuthentificationContext';

function BarreNav() {
  const { changerLangue } = useContext(LangueContext)!; //Besoin du ! parce que j'ai mis le null optionnel et je dois garantir qu'il n'est pas null
  const { estConnecte } = useContext(AuthentificationContext);
  const [naviguer, faireNaviguer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (naviguer) {
      navigate('/');
      faireNaviguer(false);
    }
  }, [naviguer]);
  return (
    <>
      <div className="align-middle bg-blue-600">
        <button
          onClick={() => {
            navigate('/');
          }}
        >
          <FormattedMessage id="app.barre.accueil" defaultMessage="Accueil" />
        </button>
        <a href="/liste">
          <FormattedMessage
            id="app.barre.liste"
            defaultMessage="Constellations"
          />
        </a>
        <button onClick={() => changerLangue('fr')}>
          <FormattedMessage
            id="app.barre.langue.francais"
            defaultMessage="Langue"
          />
        </button>
        <button onClick={() => changerLangue('en')}>
          <FormattedMessage
            id="app.barre.langue.anglais"
            defaultMessage="Langue"
          />
        </button>
        <a href="https://www.renaud-bray.com/Livres_Produit.aspx?id=4142013&def=Omniscient+reader%27s+viewpoint+%2301%2CUMI%2CSLEEPY-C%2C9782811689094">
          <button>
            <FormattedMessage
              id="app.barre.oeuvre"
              defaultMessage="Oeuvre en français"
            />
          </button>
        </a>
        <button
          onClick={() => {
            navigate('/connexion');
          }}
        >
          <FormattedMessage
            id={estConnecte ? 'app.barre.deconnexion' : 'app.barre.connexion'}
            defaultMessage="Connecter"
          />
        </button>
      </div>
    </>
  );
}

export default BarreNav;
