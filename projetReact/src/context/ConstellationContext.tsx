import axios from 'axios';
import React, { useState } from 'react';

interface IIncarnation {
  nom: string;
  niveau_force: number;
  niveau_endurance: number;
  niveau_mana: number;
  niveau_agilite: number;
  niveau_volonte: number;
  nombre_pieces: number;
  fables?: [string]; //Une incarnation peut n'avoir aucune fable à son nom.
  //Une fable est un exploit notable dans le star-stream,
  //très rare chez les Incarnations
  mort: boolean;
}

interface IConstellation {
  _id?: string;
  alias: string;
  veritable_nom: string;
  signatures: string[];
  affiliation?: string;
  incarnations: IIncarnation[];
  nebuleuse: string;
  //Minimum 3 fables par constellation
  fables: string[];
  //Permet de faire un enum sur typescript pour que ça convienne
  //au Schéma qui confondait mon enum avec celui de javascript.
  //^Source: https://www.typescriptlang.org/docs/handbook/enums.html
  rang: //Niveau d'influence/d'origine de la constellation
  | 'Inférieur' //Prettier a formatté ainsi
    | 'Historique'
    | 'Mythologique'
    | 'Narratif'
    | 'Fable'
    | 'Externe';
  date_derniere_incarnation: Date;
  incarnee: boolean;
}

export type ConstellationContextType = {
  toutesConstellations: IConstellation[];
  setToutesConstellations: (constellations: IConstellation[]) => void;
  modifier: (constellation: IConstellation) => Promise<boolean>;
};

const ConstellationsVide: IConstellation[] = [];

export const ConstellationContext =
  React.createContext<ConstellationContextType>({
    toutesConstellations: ConstellationsVide,
    setToutesConstellations: () => {},
    modifier: () => new Promise<boolean>(() => false),
  });

export default function ConstellationProvider(props: any) {
  const [toutesConstellations, setToutesConstellations] =
    useState(ConstellationsVide);

  async function modifier(constellation: IConstellation) {
    return axios
      .put(
        'https://https://constellationsapi-gaduewgrd6cbh9g6.canadacentral-01.azurewebsites.net/api/constellations/update',
        {
          id: constellation._id,
          alias: constellation.alias,
          veritable_nom: constellation.veritable_nom,
          signatures: constellation.signatures,
          affiliation: constellation.affiliation,
          incarnations: constellation.incarnations,
          nebuleuse: constellation.nebuleuse,
          fables: constellation.fables,
          rang: constellation.rang,
          date_derniere_incarnation: constellation.date_derniere_incarnation,
          incarnee: constellation.incarnee,
        },
      )
      .then((reponse) => {
        return true;
      })
      .catch((e) => {
        return false;
      });
  }

  const valeurs = {
    toutesConstellations,
    setToutesConstellations,
    modifier,
  };

  return (
    <>
      <ConstellationContext.Provider value={valeurs}>
        {props.children}
      </ConstellationContext.Provider>
    </>
  );
}
