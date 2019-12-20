import React, { Component } from "react";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleLogin(event) {
    this.props.login(this.state.username, this.state.password);
  }

  render() {
    return (
      <div className="container">
        <h1>Login</h1>

        <div class="form-group">
          <label>Username</label>
          <input
            type="text"
            onChange={event => this.handleChange(event)}
            className="form-control"
            name="username"
          ></input>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input
            type="text"
            onChange={event => this.handleChange(event)}
            className="form-control"
            name="password"
          ></input>
        </div>

        <button onClick={_ => this.handleLogin()} className="btn btn-primary">
          Login
        </button>
      </div>
    );
  }
}

export default Login;
