import React, { createContext, useState, useContext } from 'react';

const DummyListContext = createContext();

export const DummyListProvider = ({ children }) => {
  const [dummyList, setDummyList] = useState([
    {
      name: 'Cabbages',
      description: 'Fresh Cabbages - Free to Share!',
      distance: 0.2
    },
    {
      name: 'Apples',
      description: 'Fresh and crisp apples',
      distance: 0.5
    },
    {
      name: 'Bananas',
      description: 'Ripe and yellow bananas',
      distance: 0.5
    },
    {
      name: 'Oranges',
      description: 'Juicy and sweet oranges',
      distance: 0.5
    },
    {
      name: 'Strawberries',
      description: 'Plump and red strawberries',
      distance: 0.5
    },
    {
      name: 'Grapes',
      description: 'Seedless green grapes',
      distance: 0.5
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
