import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import Cookies from 'js-cookie'
import Avatar from '../../assets/Avatar.png'
import SearchBar from '../Search'
import './index.css'

const Header = ({moviesList = [], onSearch}) => {
  const [showMenu, setShowMenu] = useState(false)

  const navigate = useNavigate()
  const jwtToken = Cookies.get('jwt_token')

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  }

  return (
    <div className="header-container">
      <nav className="header-nav">
        <Link to="/" className="logo-link">
          <h2 className="header-title">🎬 MOVIES</h2>
        </Link>

        <ul className="header-links">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/popular">Popular</Link>
          </li>

          <li>
            <Link to="/top-rated">Top Rated</Link>
          </li>

          <li>
            <Link to="/originals">Originals</Link>
          </li>
        </ul>

        <div className="right-section">
          <SearchBar
            moviesList={moviesList}
            onSearch={onSearch}
          />

          <div className="avatar-container">
            <img
              src={Avatar}
              alt="profile"
              className="header-avatar"
              onClick={() => setShowMenu(!showMenu)}
            />

            {showMenu && jwtToken && (
              <div className="profile-menu">
                <button
                  type="button"
                  className="logout-button"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header