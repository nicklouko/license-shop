import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import NavbarLink from './NavbarLink';

export default function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext)!;

  return (
    <nav className="w-full bg-sky-700 px-8 py-2 flex items-center justify-between">
      <div>
        <p className="text-white font-bold text-xl">LicenseShop</p>
      </div>
      <div className="flex gap-4 ">
        <NavbarLink to="/products" name="Products" />
        {isAuthenticated ? (
          <span className="flex gap-4">
            <NavbarLink to="/dashboard" name="Dashboard" />
            <button
              className="font-semibold text-black hover:cursor-pointer hover:text-red-500"
              onClick={logout}
            >
              Log out
            </button>
          </span>
        ) : (
          <span className="flex gap-4">
            <NavbarLink to="/login" name="Login" />
            <NavbarLink to="/register" name="Register" />
          </span>
        )}
      </div>
    </nav>
  );
}
