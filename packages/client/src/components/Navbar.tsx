import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export default function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext)!;

  return (
    <nav>
      <NavLink to="/products">Products</NavLink>
      {isAuthenticated ? (
        <span>
          <NavLink to="/dashboard">Dasboard</NavLink>
          <button onClick={logout}>Log out</button>
        </span>
      ) : (
        <span>
          <NavLink to="/login">Log in</NavLink>
          <NavLink to="/register">Register</NavLink>
        </span>
      )}
    </nav>
  );
}
