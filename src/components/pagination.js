import React, { useState } from 'react';
import 'antd/dist/antd.css';
const [current, setCurrent] = useState(3);
import { Pagination } from 'antd';

export const PaginationFn = () => {
  const onChange = (page) => {
    console.log(page);
    setCurrent(page);
  };
  return <Pagination current={current} onChange={onChange} total={50} />;
};
