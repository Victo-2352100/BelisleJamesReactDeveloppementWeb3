import fr from '../lang/fr.json';
import en from '../lang/en.json';
import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
//Contexte inspiré d'une suggestion de ChatGPT (1 Décembre 2025), mais avec les apprentissages fait en classe

const languesTraduction = { fr, en }; //Pour me débarasser du problème de pas pouvoir transférer mes JSON, je prends un tableau
interface LangueContextType {
  locale: 'fr' | 'en';
  messages: any;
  changerLangue: (locale: 'fr' | 'en') => void;
}

export const LangueContext = React.createContext<LangueContextType | null>(
  null,
);

export const LangueProvider = (props: any) => {
  const [locale, setLocale] = useState<'fr' | 'en'>('fr'); //Faut que je reste consistent avec mes restrictions
  const [messages, setMessages] = useState(languesTraduction['fr']);

  //Dans typescript, je peux forcer ma variable à n'avoir que deux valeurs. Ici, donc, "fr" ou "en"
  const changerLangue = (nvLocale: 'fr' | 'en') => {
    setLocale(nvLocale);
    setMessages(languesTraduction[nvLocale]);
  };

  return (
    <LangueContext.Provider value={{ locale, messages, changerLangue }}>
      <IntlProvider locale={locale} messages={messages}>
        {props.children}
      </IntlProvider>
    </LangueContext.Provider>
  );
};
