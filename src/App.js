import React, { Component } from 'react';
import './App.css';

import Table from './table.js';

import Pusher from 'pusher-js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { rows: [] };


    this.pusher = new Pusher('b71f22139e38f9a3801d', {
      cluster: 'ap2',
      encrypted: true,
    });
    this.channel = this.pusher.subscribe('products');

    this.channel.bind('insert', this.insert);
    this.channel.bind('update', this.update);
    this.channel.bind('delete', this.delete);


    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {

  }

  insert(data) {
    this.setState(prevState => ({
      rows: [data, ...prevState.rows]
    }));
  }

  update(data) {
    this.setState(prevState => ({
      rows: prevState.rows.map(el =>
        el.id === data.id ? data : el
      )
    }));
  }

  delete(id) {
    this.setState(prevState => ({
      rows: prevState.rows.filter(el => el.id !== String(id))
    }));
  }

  render() {
    return (
      <div className="App">
        <Table rows={this.state.rows} />
      </div>
    )
  }
}

export default App;