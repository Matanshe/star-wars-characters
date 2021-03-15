import React from 'react'

const CharactersContext = React.createContext({});
export const CharactersProvider = CharactersContext.Provider;
export const CharactersConsumer = CharactersContext.Consumer;


export default CharactersContext;