import React, { Component } from 'react';

export default class extends Component {
  onClick() {
    window.app.login();
  }

  render() {
    const { url } = this.props;
    return (
      <button className="btn btn-primary" onClick={this.onClick}>Create from Facebook</button>
    );
  }
}
