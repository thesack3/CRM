import React, { createContext, useState } from 'react';

export const callContext = createContext({
  isCall: window.localStorage.getItem('isCall'),
  setIsCall: () => {},
  userName: '',
  setUserName: () => {},
  leadId: '',
  setLeadId: () => {},
});

const CallContextProvider = ({ children }) => {
  const [isCall, setIsCall] = useState(window.localStorage.getItem('isCall'));
  const [userName, setUserName] = useState(window.localStorage.getItem('userName'));
  const [leadId, setLeadId] = useState(window.localStorage.getItem('leadId'));

  const passedValues = {
    isCall,
    userName,
    leadId,
    setIsCall,
    setUserName,
    setLeadId,
  };
  return <callContext.Provider value={passedValues}>{children}</callContext.Provider>;
};

export default CallContextProvider;
