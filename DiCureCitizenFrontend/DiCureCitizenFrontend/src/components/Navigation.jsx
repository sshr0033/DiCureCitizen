import { Link, NavLink } from 'react-router-dom'

export default function Navigation() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="brand">DCC</Link>
        <nav className="nav">
          <NavLink to="/">Detect Spam</NavLink>
          <NavLink to="/trends">Discover More</NavLink>
        </nav>
        <Link to="/emergencyContacts" className="btn primary pill">Get Help</Link>
      </div>
    </header>
  )
}