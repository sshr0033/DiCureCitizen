import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="brand">DCC</Link>
        <nav className="nav">
          <NavLink to="/quiz">Detect Spam</NavLink>
          <NavLink to="/trends">Discover More</NavLink>
          <NavLink to="/help">Get Help Near You</NavLink>
        </nav>
        <Link to="/quiz" className="btn primary pill">Detect Spam</Link>
      </div>
    </header>
  )
}
