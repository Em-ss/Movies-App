import React, { Component } from 'react';
import { Col, Spin } from 'antd';

import { CardValue } from './card-value';
import './card.css';

export class Card extends Component {
  render() {
    const { item, loading, updateData2, sessionId } = this.props;

    const spin = loading ? (
      <div className="card-spin">
        <Spin tip="Loading..." />
      </div>
    ) : null;
    const content = !loading ? <CardValue item={item} updateData2={updateData2} sessionId={sessionId} /> : null;

    return (
      <Col span={12}>
        <div className="card">
          {spin}
          {content}
        </div>
      </Col>
    );
  }
}
