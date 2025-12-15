/*
 * Fichier servant à unifier la gestion des modèles
 */
export interface IIncarnation {
  nom: string;
  niveau_force: number;
  niveau_endurance: number;
  niveau_mana: number;
  niveau_agilite: number;
  niveau_volonte: number;
  nombre_pieces: number;
  fables?: string[]; //Une incarnation peut n'avoir aucune fable à son nom.
  //Une fable est un exploit notable dans le star-stream,
  //très rare chez les Incarnations
  mort: boolean;
}

export interface IConstellation {
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
export type Rang =
  | 'Inférieur'
  | 'Historique'
  | 'Mythologique'
  | 'Narratif'
  | 'Fable'
  | 'Externe';
