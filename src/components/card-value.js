import React, { useState, useEffect } from 'react';
import { Typography, Rate } from 'antd';

import { AppContext } from './context-app';

import './card-value.css';

import './card.css';
const { Paragraph } = Typography;

const desc = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
export const CardValue = ({ item, updateData2, sessionId }) => {
  const [value, setValue] = useState(0);

  const style = item.rating
    ? (function () {
        if (item.rating < 3) {
          return { borderColor: '#E90000' };
        }
        if (3 <= item.rating && item.rating < 5) {
          return { borderColor: '#E97E00' };
        }
        if (5 <= item.rating && item.rating < 7) {
          return { borderColor: '#E9D100' };
        }
        if (7 <= item.rating) {
          return { borderColor: '#66E900' };
        }
      })()
    : (function () {
        if (value < 3) {
          return { borderColor: '#E90000' };
        }
        if (3 <= value && value < 5) {
          return { borderColor: '#E97E00' };
        }
        if (5 <= value && value < 7) {
          return { borderColor: '#E9D100' };
        }
        if (7 <= value) {
          return { borderColor: '#66E900' };
        }
      })();
  // const style = { borderColor: '#E90000' };

  useEffect(() => {
    value == 0 ? null : updateData2(item.id, sessionId, value);
  }, [value]);

  return (
    <AppContext.Consumer>
      {(val) => (
        <>
          <img className="card-image" src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} />
          <div>
            <ul className="card-group">
              <li className="card-group-item">
                <span className="item">
                  <Paragraph ellipsis={{ rows: 2 }}>{item.original_title}</Paragraph>
                </span>
              </li>
              <li className="card-group-item">
                <span className="item">{item.release_date}</span>
              </li>
              <li className="card-group-item">
                {val.map((key) => {
                  for (let bin of item.genre_ids) {
                    if (key.id === bin) {
                      return <span>{key.name}</span>;
                    }
                  }
                })}
              </li>
              <li className="card-group-item">
                <span className="item">
                  <Paragraph ellipsis={{ rows: 4 }}>{item.overview}</Paragraph>
                </span>
              </li>
              <li className="card-group-item">
                <span className="item">
                  {item.rating ? (
                    <Rate disabled allowHalf count={7} defaultValue={item.rating} />
                  ) : (
                    <Rate tooltips={desc} allowHalf count={7} onChange={setValue} value={value} />
                  )}
                  {/* {value ? <span className="ant-rate-text"></span> : ''} */}
                </span>
              </li>
              <li className="card-group-item-rating" style={style}>
                <span className="item">{item.rating ? item.rating : value}</span>
              </li>
            </ul>
          </div>
        </>
      )}
    </AppContext.Consumer>
  );
};

// CardValue.defaultProps = {
//   item:null
// };
