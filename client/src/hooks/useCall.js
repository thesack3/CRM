import React, { createContext, useState } from 'react';

export const callContext = createContext({
  isCall: window.localStorage.getItem('isCall'),
  setIsCall: () => {},
});

const CallContextProvider = ({ children }) => {
  const [isCall, setIsCall] = useState(window.localStorage.getItem('isCall'));

  const passedValues = {
    isCall,
    setIsCall,
  };
  return <callContext.Provider value={passedValues}>{children}</callContext.Provider>;
};

export default CallContextProvider;
