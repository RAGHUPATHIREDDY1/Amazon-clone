import {Link, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import Avatar from '../../assets/Avatar.png';
import './index.css';

const Header = () => {
  const navigate = useNavigate();
  const jwtToken = Cookies.get('jwt_token');

  const onClickLogout = () => {
    Cookies.remove('jwt_token');
    navigate('/login');
  };

  return (
    <div className="header-container">
        <nav className="header-nav">
            <Link to="/" ><h2 className="header-title">MOVIES</h2></Link>
            <ul className="header-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/popular">Popular</Link></li>
                <li><Link to="/top-rated">Top Rated</Link></li>
                <li><Link to="/originals">Originals</Link></li>
           </ul>
           <ul className="header-search-avatar">
           {jwtToken === undefined ? (
             <Link to="/login">
               <img src={Avatar} alt="Avatar" className="header-avatar" />
             </Link>
           ) : (
             <>
               <img src={Avatar} alt="Avatar" className="header-avatar" />
               <button type="button" className="logout-button" onClick={onClickLogout}>Logout</button>
             </>
           )}
             </ul>
        </nav>
    </div>
  );
}
export default Header;