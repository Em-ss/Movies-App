import React from 'react';

export const Header = ({ onChangeRated, onChangeRated1 }) => {
  return (
    <>
      <button onClick={onChangeRated1}>Search</button>
      <button onClick={onChangeRated}>Rated</button>
    </>
  );
};
