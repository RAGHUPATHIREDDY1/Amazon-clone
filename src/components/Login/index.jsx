import {useState} from 'react'
import {useNavigate, Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const navigate = useNavigate()

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    navigate('/', {replace: true})
  }

  const onSubmitFailure = errorMsg => {
    setShowSubmitError(true)
    setErrorMsg(errorMsg)
  }

  const submitForm = async event => {
    event.preventDefault()

    const userDetails = {
      username,
      password,
    }

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken !== undefined) {
    return <Navigate to="/" />
  }

  return (
    <div className="login-page">
      <div className="login-overlay">
        <form
          className="login-form"
          onSubmit={submitForm}
        >
          <h1 className="login-title">
            🎬 MOVIES
          </h1>

          <h2 className="welcome-text">
            Welcome Back
          </h2>

          <div className="input-container">
            <label className="login-label">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="login-input"
              placeholder="Enter username"
            />
          </div>

          <div className="input-container">
            <label className="login-label">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="login-input"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>

          {showSubmitError && (
            <p className="error-msg">
              {errorMsg}
            </p>
          )}

          <p className="demo-text">
            Demo Credentials
          </p>

          <p className="demo-credentials">
            Username: rahul <br />
            Password: rahul@2021
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login