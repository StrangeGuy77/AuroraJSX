import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
  state = {
    isOpen: false
  };

  render(props) {
    return (
      <div>
        <button
          className="btn btn-outline-light mr-sm-2"
          data-toggle="modal"
          data-target="#loginModal"
        >
          Signup
        </button>
        <div className="modal fade" id="loginModal" tabIndex={-1} role="dialog">
          <div className="modal-dialog modal-md-2" role="document">
            <div className="moda-content">
              <div className="modal-header">
                <h5 className="modal-title" id="loginModalLabel">
                  Login
                </h5>
                <button
                  className="close"
                  type="button"
                  onClick={e => this.setState({ isOpen: false })}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="email-addon">
                        <i className="fas fa-at"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      aria-label="Username"
                      aria-describedby="email-addon"
                      id="loginModalEmail"
                      name="loginModalEmail"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="password-addon">
                      <i className="fas-fa-key"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="password-addon"
                    id="loginModalPassword"
                    name="loginModalPassword"
                    required
                  />
                </div>
                <div className="form-group">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <p
                        style={
                          {
                            color: "#dc143c"
                          } /* Red color as this is the alert section, only used for failed login attempts*/
                        }
                      >
                        {""}
                      </p>
                      <hr />
                    </div>
                    <p>Aren't you registered yet? {""}</p> <br />
                    <Link to="/signup"> Signup here</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
