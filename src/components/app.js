import React, { Component } from 'react';
import { Alert, Pagination } from 'antd';

import 'antd/dist/antd.css';
import './app.css';
import { CardList } from './card-list.js';
import { ContentError } from './error.js';
import { Querty } from './querty';
import { NetworkState } from './network-state.js';
import { Search } from './search.js';
import { Header } from './header.js';
import { AppContext } from './context-app';

export class App extends Component {
  constructor() {
    super(), (this.querty = new Querty());
    this.state = {
      items: [],
      itemsRated: [],
      loading: true,
      error: false,
      network: false,
      page: 1,
      name: '',
      sessionId: '',
      check: true,
      oneSession: true,
      btn: true,
      getId: [],
    };
  }

  onError() {
    this.setState({
      error: true,
    });
    // console.log('e');
  }

  updateData(page, name) {
    this.querty.getAllMovies(page, name).then((items) => {
      // console.log(items.results)
      this.setState({
        items: items.results,
        loading: false,
        page: page,
        name: name,
      });
    });
    // .catch(this.onError.bind(this));
  }
  updateData1(sessionId) {
    this.querty
      .getRatedMovies(sessionId)
      .then((items) => {
        // console.log(items.results)
        this.setState({
          itemsRated: items.results,
          loading: false,
        });
        console.log(items);
      })
      .catch(this.onError.bind(this));
  }
  updateData2(id, sessionId, star) {
    this.querty
      .setRatedMovie(id, sessionId, star)
      .then((items) => {
        console.log(items);
        console.log('dobavleno');
      })
      .catch(this.onError.bind(this));
  }
  onNetworkState() {
    this.setState((prevState) => ({ network: !prevState.network }));
  }
  onChange(page) {
    this.updateData(page, this.state.name);
  }

  componentDidMount() {
    this.querty.newSession().then((session) => {
      this.setState({
        sessionId: session.guest_session_id,
      });
    });
    this.querty.getId().then((value) => {
      this.setState({
        getId: value.genres,
      });
    });
  }

  onChangeRated2() {
    this.updateData1(this.state.sessionId);
    this.setState({ check: false, oneSession: false, btn: false });
  }
  onChangeRated1() {
    this.setState({ check: true, btn: true });
    this.updateData(this.state.page, this.state.name);
  }

  render() {
    const cardlist = this.state.check ? (
      <>
        <Search updateData={this.updateData.bind(this)} />
        <CardList
          items={this.state.items}
          loading={this.state.loading}
          updateData2={this.updateData2.bind(this)}
          sessionId={this.state.sessionId}
          pagination={<Pagination current={this.state.page} onChange={this.onChange.bind(this)} total={50} />}
        />
      </>
    ) : (
      <CardList items={this.state.itemsRated} loading={this.state.loading} />
    );

    const contentError = this.state.error ? <ContentError /> : null;
    const content = !this.state.error ? cardlist : null;

    return (
      <AppContext.Provider value={this.state.getId}>
        <div className="container">
          <Header
            onChangeRated2={this.onChangeRated2.bind(this)}
            onChangeRated1={this.onChangeRated1.bind(this)}
            btn={this.state.btn}
          />

          {this.state.network ? <Alert className="alert alert-net" message="Нет Сети" /> : null}
          {contentError}
          {content}
          <NetworkState onNetworkState={this.onNetworkState.bind(this)} />
        </div>
      </AppContext.Provider>
    );
  }
}
