import { NavLink } from 'react-router-dom';

export default function NavbarLink({ to, name }: { to: string; name: string }) {
  return (
    <NavLink
      className={({ isActive }) =>
        `font-semibold ${isActive ? 'text-white hover:text-white' : 'text-black hover:text-cyan-950'}`
      }
      to={to}
    >
      {name}
    </NavLink>
  );
}
