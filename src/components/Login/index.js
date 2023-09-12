import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showLoginError: false, error: ''}

  inputUsername = event => {
    this.setState({username: event.target.value})
  }

  inputPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    const {history} = this.props
    history.replace('/')
  }

  onLoginFail = errorMsg => {
    this.setState({
      showLoginError: true,
      error: errorMsg,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onLoginFail(data.error_msg)
    }
  }

  render() {
    const {username, password, showLoginError, error} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <form onSubmit={this.onSubmitForm} className="login-form-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <label htmlFor="username" className="form-label">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            onChange={this.inputUsername}
            value={username}
            placeholder="Username"
            className="input-box"
          />
          <label htmlFor="password" className="form-label">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            onChange={this.inputPassword}
            value={password}
            placeholder="Password"
            className="input-box"
          />
          <button type="submit" className="submit-btn">
            Login
          </button>
          {showLoginError && <p className="error-message">*{error}</p>}
        </form>
      </div>
    )
  }
}

export default Login
