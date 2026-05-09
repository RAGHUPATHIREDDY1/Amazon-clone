import {useState} from 'react'
import {useNavigate, Navigate} from 'react-router'
import Cookies from 'js-cookie'
import Header from "../Header";
import "./index.css";
  const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()
  const onChangeUsername = (e) => {
    setUsername(e.target.value)
  }
  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }
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
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
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
    <>
        <Header />
        <div className="login-container">
            <form onSubmit={submitForm} className="login-form">
                <h2>Login</h2>
                <label className="login-label" htmlFor="username">Username</label>
                <input
                 className="login-input"
                  type="text" 
                  id="username" 
                  value={username}
                  onChange={onChangeUsername}
                  placeholder="Username" required />
                <label className="login-label" htmlFor="password">Password</label>  
                <input
                 className="login-input"
                  type="password" 
                  id="password"
                  value={password}
                  onChange={onChangePassword}
                  placeholder="Password" 
                  required />
                <button className="login-button" type="submit">Login</button>
            </form>
        </div>
    </>
  );
}
export default Login;