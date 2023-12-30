import { Link } from "react-router-dom"

function Header() {
  return <nav className="header purple darken-3">
    <div className="navbar nav-wrapper">
      <Link to="/" className="brand-logo" style={{fontSize: '2.4rem'}}>React Shop</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/about">About</Link></li>
      </ul>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/contacts">Contacts</Link></li>
      </ul>
    </div>
  </nav>
}

export { Header }