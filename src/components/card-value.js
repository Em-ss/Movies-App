import React from 'react';
import { Typography } from 'antd';

import './card.css';
const { Paragraph } = Typography;

export const CardValue = ({ item }) => {
  return (
    <>
      <img className="card-image" src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} />
      <div>
        <ul className="card-group">
          <li className="card-group-item">
            <span className="item">{item.original_title}</span>
          </li>
          <li className="card-group-item">
            <span className="item">{item.release_date}</span>
          </li>
          <li className="card-group-item">
            <span className="item">{item.original_title}</span>
          </li>
          <li className="card-group-item">
            <span className="item">
              <Paragraph ellipsis={{ rows: 5 }}>{item.overview}</Paragraph>
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

// CardValue.defaultProps = {
//   item:null
// };
