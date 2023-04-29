import React, { createContext, useState } from 'react';

export const callContext = createContext({
  isCall: window.localStorage.getItem('isCall'),
  setIsCall: () => {},
  userName: '',
  setUserName: () => {},
  leadId: '',
  setLeadId: () => {},
  categories: [],
  setCategories: () => {},
  tags: [],
  setTags: () => {},
});

const CallContextProvider = ({ children }) => {
  const [isCall, setIsCall] = useState(window.localStorage.getItem('isCall'));
  const [userName, setUserName] = useState(window.localStorage.getItem('userName'));
  const [leadId, setLeadId] = useState(window.localStorage.getItem('leadId'));
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const passedValues = {
    isCall,
    userName,
    leadId,
    categories,
    tags,
    setIsCall,
    setUserName,
    setLeadId,
    setCategories,
    setTags,
  };
  return <callContext.Provider value={passedValues}>{children}</callContext.Provider>;
};

export default CallContextProvider;
