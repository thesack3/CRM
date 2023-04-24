import React, { createContext, useState } from 'react';

export const callContext = createContext({
  isCall: window.localStorage.getItem('isCall'),
  setIsCall: () => {},
  userName: '',
  setUserName: () => {},
});

const CallContextProvider = ({ children }) => {
  const [isCall, setIsCall] = useState(window.localStorage.getItem('isCall'));
  const [userName, setUserName] = useState(window.localStorage.getItem('userName'));

  const passedValues = {
    isCall,
    userName,
    setIsCall,
    setUserName,
  };
  return <callContext.Provider value={passedValues}>{children}</callContext.Provider>;
};

export default CallContextProvider;
