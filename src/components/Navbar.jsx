import { NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { count } = useCart()
  const { isLoggedIn, user, logout } = useAuth()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 sticky-top">
      <NavLink className="navbar-brand" to="/">Kiln</NavLink>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto gap-3 align-items-lg-center">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/menu">Menu</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/about">About</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/contact">Contact</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/cart">Cart ({count})</NavLink>
          </li>

          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <span className="nav-link text-light">Hi, {user.name}</span>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={logout}
                >
                  Log out
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">Log in</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/signup">Sign up</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}