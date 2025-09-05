import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Navigation() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="brand">
        <img src={logo} alt="Logo" className="logo-icon"/></Link>
        <nav className="nav">
          <NavLink to="/">Detect Spam</NavLink>
          <NavLink to="/trends">Discover More</NavLink>
        </nav>
        <Link to="/emergencyContacts" className="btn primary pill">Get Help</Link>
      </div>
    </header>
  )
}