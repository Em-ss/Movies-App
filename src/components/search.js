import React, { Component } from 'react';
import { debounce } from 'lodash';
import './search.css';
export class Search extends Component {
  constructor() {
    super(),
      (this.state = {
        label: '',
      }),
      (this.debounceWrapper = debounce((a, b) => {
        this.props.updateData(a, b);
      }, 2000));
  }

  onLabelChange(e) {
    this.setState({
      label: e.target.value,
    });
  }

  onKeyDown() {
    this.debounceWrapper(1, this.state.label);
    // e.target.value = '';
  }

  //

  render() {
    return (
      <>
        <input
          className="input-search"
          placeholder="Type to search..."
          type="text"
          autoFocus
          onChange={this.onLabelChange.bind(this)}
          onKeyDown={this.onKeyDown.bind(this)}
          value={this.state.label}
        />
      </>
    );
  }
}
