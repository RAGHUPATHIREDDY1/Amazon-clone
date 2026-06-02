import {useNavigate} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="not-found-page">
      <Header />

      <div className="not-found-container">
        <h1 className="error-code">404</h1>

        <h2 className="error-title">
          Page Not Found
        </h2>

        <p className="error-description">
          The page you are looking for does not exist
          or has been moved.
        </p>

        <button
          type="button"
          className="home-button"
          onClick={() => navigate('/')}
        >
          Go To Home
        </button>
      </div>
    </div>
  )
}

export default NotFound