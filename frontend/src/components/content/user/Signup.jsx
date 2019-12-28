import React, { Component } from "react";

export default class Signup extends Component {
  render() {
    return (
      <div>
        <button
          onClick={e => this.setState({ loginOpen: true })}
          className="btn btn-outline-light my-2 my-sm-0"
          id="loginModal"
          tabIndex={-1}
          role="dialog"
        >
          Signin
        </button>
      </div>
    );
  }
}
