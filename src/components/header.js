import React from 'react';
import './header.css';
export const Header = ({ onChangeRated2, onChangeRated1, btn }) => {
  const btn1 = btn ? 'btn search' : 'search';
  const btn2 = btn ? 'rated' : 'btn rated';
  return (
    <div className="header">
      <button className={btn1} onClick={onChangeRated1}>
        Search
      </button>
      <button className={btn2} onClick={onChangeRated2}>
        Rated
      </button>
    </div>
  );
};
