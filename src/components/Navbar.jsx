import React ,{useState}from 'react'
import { NavLink, Link } from 'react-router-dom'
import "./Navbar.css";
import { Helmet } from 'react-helmet';
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }
  return (
<>
    <Helmet>
        <meta name="robots" content="noindex" />
        <link rel="icon" type="image/png" href="/path/to/your/favicon.png" />
      </Helmet>
    <nav>
      <Link className='title' to="/">Jewlery By Blucifer</Link>
      <div className={`menu ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={menuOpen ? "open":""}>
        <li><NavLink to="/">Products</NavLink></li>
        <li><NavLink to="/Register" >Register</NavLink></li>
        <li><NavLink to="/Login">Login</NavLink></li>
      </ul>
    </nav>
    </>
  )
}
