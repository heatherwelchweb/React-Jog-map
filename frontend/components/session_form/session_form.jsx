import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.guestLogin = this.guestLogin.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.props.history.push('/home');
    }
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.state;
    this.props.processForm({user});
  }

  guestLogin(e) {
    const user = { username: 'guest', password: 'password' };
    this.props.guestLogin({user});
  }

  navLink() {
    if (this.props.formType === 'login') {
      return <Link to="/signup">Sign Up</Link>;
    } else {
      return <Link to="/login">Log In</Link>;
    }
  }

  renderErrors() {
    return(
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="login-form-container">
        <form onSubmit={this.handleSubmit} className="login-form-box">

          <p>or {this.navLink()}</p>
          {this.renderErrors()}

          <div className="login-form">
            <button className='login guest-login'
                    onClick={this.guestLogin}>Login as Guest</button>

            <br/>

            <div className="or-divider">
              <span className="horizontal-line"></span>
              <span id="or-divider-text">or</span>
              <span className="horizontal-line"></span>
            </div>

            <br/>

            <label for="username">
              <input id="username" type="text"
                value={this.state.username}
                onChange={this.update('username')}
                className="login-input"
                placeholder="Username"
              />
            </label>

            <br/>

            <label for="password">
              <input id="password" type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="login-input"
                placeholder="Password"
              />
            </label>

            <br/>

            <input className='login' type="submit" value="Login" />
          </div>

        </form>
      </div>
    );
  }
}

export default withRouter(SessionForm);
