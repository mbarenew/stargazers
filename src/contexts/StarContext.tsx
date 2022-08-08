import React, {createContext, useContext, useState} from 'react';

interface ContextProps {
  owner: string;
  saveOwner: (str: string) => void;
  repo: string;
  saveRepo: (str: string) => void;
}

const defaultState: ContextProps = {
  owner: '',
  saveOwner: () => {},
  repo: '',
  saveRepo: () => {},
};

const StarContext = createContext<ContextProps>(defaultState);

export const useContextStar = () => useContext(StarContext);

export const StarProvider = ({children}: any) => {
  const [owner, saveOwner] = useState('');
  const [repo, saveRepo] = useState('');

  return (
    <StarContext.Provider value={{owner, saveOwner, repo, saveRepo}}>
      {children}
    </StarContext.Provider>
  );
};
