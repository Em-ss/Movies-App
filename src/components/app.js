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

export class App extends Component {
  constructor() {
    super(), (this.querty = new Querty());
    this.state = {
      items: [],
      loading: true,
      error: false,
      network: false,
      page: 1,
      name: '',
      sessionId: '',
      check: true,
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
          items: items.results,
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
  // onChangeSearch(name) {
  //   this.updateData(this.state.page, name);
  // }
  componentDidMount() {
    this.querty.newSession().then((session) => {
      // console.log(session.guest_session_id);
      this.setState({
        sessionId: session.guest_session_id,
      });
    });
    // this.querty.newSession();/
    // this.updateData(this.state.page, this.state.name);
  }
  // componentDidUpdate() {
  //
  // }
  onChangeRated() {
    this.setState((prevState) => ({ check: !prevState.check }));
    this.updateData1(this.state.sessionId);
  }
  onChangeRated1() {
    this.setState((prevState) => ({ check: prevState.items }));
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
      <CardList items={this.state.items} loading={this.state.loading} />
    );
    // null;

    const contentError = this.state.error ? <ContentError /> : null;
    const content = !this.state.error ? cardlist : null;
    // console.log(this.state.sessionId);
    return (
      <div className="container">
        <Header onChangeRated={this.onChangeRated.bind(this)} onChangeRated1={this.onChangeRated1.bind(this)} />

        {this.state.network ? <Alert className="alert alert-net" message="Нет Сети" /> : null}
        {contentError}
        {content}
        <NetworkState onNetworkState={this.onNetworkState.bind(this)} />
      </div>
    );
  }
}
