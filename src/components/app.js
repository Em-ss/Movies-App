import React, { Component } from 'react';
import { Alert, Pagination } from 'antd';

import 'antd/dist/antd.css';
import './app.css';
import { CardList } from './card-list.js';
import { ContentError } from './error.js';
import { Querty } from './querty';
import { NetworkState } from './network-state.js';
import { Search } from './search.js';

export class App extends Component {
  constructor() {
    super(), (this.querty = new Querty());
    this.state = {
      items: [1],
      loading: true,
      error: false,
      network: false,
      page: 1,
      name: 'a',
    };
  }

  onError() {
    this.setState({
      error: true,
    });
    // console.log('e');
  }

  updateData(page, name) {
    this.querty
      .getAllMovies(page, name)
      .then((items) => {
        // console.log(items.results)
        this.setState({
          items: items.results,
          loading: false,
          page: page,
          name: name,
        });
      })
      .catch(this.onError.bind(this));
  }
  onNetworkState() {
    this.setState((prevState) => ({ network: !prevState.network }));
  }
  onChange(page) {
    this.updateData(page, this.state.name);
  }
  // onChangeSearch(name) {
  //   this.updateData(this.state.page, name);
  // }
  componentDidMount() {
    this.updateData(this.state.page, this.state.name);
  }
  // componentDidUpdate() {
  //   this.updateData(this.state.page, this.state.name);
  // }

  render() {
    const contentError = this.state.error ? <ContentError /> : null;
    const content = !this.state.error ? (
      <CardList
        items={this.state.items}
        loading={this.state.loading}
        pagination={<Pagination current={this.state.page} onChange={this.onChange.bind(this)} total={50} />}
      />
    ) : null;

    return (
      <div className="container">
        <Search updateData={this.updateData.bind(this)} />
        {this.state.network ? <Alert className="alert alert-net" message="Нет Сети" /> : null}
        {contentError}
        {content}
        <NetworkState onNetworkState={this.onNetworkState.bind(this)} />
      </div>
    );
  }
}
