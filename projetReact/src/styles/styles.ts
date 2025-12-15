//Page servant à centraliser les styles que je veux utiliser dans mon application
//Partiellement inspiré des concepts enseignés par Christiane Lagacé pendant son cours d'application mobile 2, section React Natif
export const appStyles = {
  //À noter que je souhaitais des styles s'alignant avec les interfaces visibles dans l'oeuvre originale.
  //Ces styles sont donc une suggestion de ChatGPT
  page: `min-h-screen
    bg-gradient-to-b from-black via-gray-900 to-blue-950
    text-white
    font-sans
    p-4`,
  titre: `text-3xl
    font-bold
    text-center
    mb-6
    text-blue-300
    drop-shadow-lg`,
  barreBouton: `px-4
  py-2
  bg-gradient-to-r from-purple-500 to-blue-400
  rounded-md
  text-white
  font-medium
  text-center
  shadow
  hover:from-purple-600 hover:to-blue-500
  transition-all
  duration-300`,
  barreNav: `bg-black/50
    border border-blue-500
    rounded-md
    px-3
    py-2
    text-white
    placeholder-gray-400
    focus:outline-none
    focus:ring-2
    focus:ring-blue-400
    transition
    duration-200`,
  elementListe: `bg-gradient-to-br from-black/70 via-blue-900 to-purple-800
    border border-blue-600
    rounded-2xl
    p-4
    m-2
    shadow-xl
    hover:shadow-2xl
    transition-shadow
    duration-300
    hover:scale-105
    transform
    cursor-pointer
    text-white
    text-sm
    flex
    flex-col
    gap-2`,
  texteElementListe: `text-sm
    text-blue-200
    opacity-80`,
  boutonGenerique: `px-3
    py-1.5
    bg-gradient-to-r from-purple-500 to-blue-400
    hover:from-purple-600 hover:to-blue-500
    text-white
    font-medium
    rounded-md
    shadow
    hover:shadow-lg
    transition-all
    duration-300
    cursor-pointer
    text-center
    select-none`,
  liste: `w-full
    p-4
    bg-black/60
    border border-blue-700
    rounded-3xl
    shadow-xl
    backdrop-blur-md
    flex
    flex-wrap
    gap-4
    justify-start
    transition-all
    duration-300`,
};
