import React, { createContext, useState, useContext } from 'react';

const DummyListContext = createContext();

export const DummyListProvider = ({ children }) => {
  const [dummyList, setDummyList] = useState([
    {
      id: 1,
      name: 'Apples',
      description: 'Fresh and crisp apples'
    },
    {
      id: 2,
      name: 'Bananas',
      description: 'Ripe and yellow bananas'
    },
    {
      id: 3,
      name: 'Oranges',
      description: 'Juicy and sweet oranges'
    },
    {
      id: 4,
      name: 'Strawberries',
      description: 'Plump and red strawberries'
    },
    {
      id: 5,
      name: 'Grapes',
      description: 'Seedless green grapes'
    },
  ]);

  const addToList = (item) => {
    setDummyList([...dummyList, item]);
  };

  return (
    <DummyListContext.Provider value={{ dummyList, addToList }}>
      {children}
    </DummyListContext.Provider>
  );
};

export const useDummyList = () => {
  return useContext(DummyListContext);
};
