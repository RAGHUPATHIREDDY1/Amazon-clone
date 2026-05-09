import {Link} from 'react-router-dom';
import Avatar from '../../assets/avatar.png';
import './index.css';
const Header = () => {
  return (
    <div className="header-container">
        <nav className="header-nav">
            <Link to="/" ><h2 className="header-title">MOVIES</h2></Link>
            <ul className="header-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/popular">Popular</Link></li>
           </ul>
           <ul className="header-search-avatar">
           <Link to="/login">
             <img src={Avatar} alt="Avatar" className="header-avatar" />
           </Link>
             </ul>
        </nav>
    </div>
  );
}
export default Header;