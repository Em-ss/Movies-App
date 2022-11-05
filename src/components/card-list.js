import React from 'react';
import { Row } from 'antd';

import 'antd/dist/antd.css';
import './card-list.css';
import { Card } from './card.js';

export const CardList = ({ items, loading, pagination }) => {
  console.log(items);
  const elements = items.map((item) => {
    return <Card key={item.id} item={item} loading={loading} />;
  });
  const content1 = items[0] ? null : <div className="conteiner-notFound">Ничего не найдено</div>;
  return (
    <div className="container">
      {content1}
      <Row gutter={[24, 24]}>{elements}</Row>
      <div className="container-search">{pagination}</div>
    </div>
  );
};
