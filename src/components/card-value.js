import React, { useState } from 'react';
import { Typography, Rate } from 'antd';

// import 'antd/dist/antd.css';

import './card.css';
const { Paragraph } = Typography;

const desc = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
export const CardValue = ({ item, updateData2, sessionId }) => {
  const [value, setValue] = useState(0);

  const onChangeValue = () => {
    console.log(value);
    updateData2(item.id, sessionId, value);
  };

  // componentDidUpdate(){
  //
  // }
  // useEffect(() => {
  //   console.log(sessionId);
  //   updateData2(item.id, sessionId, value);
  // }, [value]);

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
              <Paragraph ellipsis={{ rows: 4 }}>{item.overview}</Paragraph>
            </span>
          </li>
          <li className="card-group-item" onClick={onChangeValue}>
            <span className="item">
              <Rate tooltips={desc} allowHalf count={7} onChange={setValue} value={value} defaultValue={0} />
              {value ? <span className="ant-rate-text"></span> : ''}
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
