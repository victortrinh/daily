import React, {
  createContext, Dispatch, ReactElement, useContext, useMemo, useState,
} from 'react';

type Props = {
  children: ReactElement;
}

type AppContextType = {
  mute: boolean;
  setMute?: Dispatch<React.SetStateAction<boolean>>;
}

const appContext: AppContextType = {
  mute: false,
};

const AppContext = createContext<AppContextType>(appContext);

export const AppProvider = ({ children }: Props) => {
  const initialMute = localStorage.getItem('mute');
  const [mute, setMute] = useState(initialMute ? JSON.parse(initialMute) : false);

  const value = useMemo(() => ({
    mute, setMute,
  }), [mute, setMute]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
