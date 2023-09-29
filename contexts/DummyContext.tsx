import React, { createContext, useState, useContext } from 'react';

const DummyListContext = createContext();

export const DummyListProvider = ({ children }) => {
  const [dummyList, setDummyList] = useState([
    {
      id: 1,
      lat: -37.78825,
      lon: 175.389350,
      title: 'Cabbages',
      description: 'Fresh Cabbages - Free to Share!',
      distance: 0.2
    },
    {
      id: 2,
      lat: -37.78825,
      lon: 175.489350,
      title: 'Apples',
      description: 'Fresh and crisp apples',
      distance: 0.5
    },
    {
      id: 3,
      lat: -37.68825,
      lon: 175.289350,
      title: 'Bananas',
      description: 'Ripe and yellow bananas',
      distance: 0.5
    },
    {
      id: 4,
      lat: -37.88825,
      lon: 175.289350,
      title: 'Oranges',
      description: 'Juicy and sweet oranges',
      distance: 0.5
    },
    {
      id: 5,
      lat: -37.68825,
      lon: 175.389350,
      title: 'Strawberries',
      description: 'Plump and red strawberries',
      distance: 0.5
    },
    {
      id: 6,
      lat: -37.68825,
      lon: 175.489350,
      title: 'Grapes',
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
