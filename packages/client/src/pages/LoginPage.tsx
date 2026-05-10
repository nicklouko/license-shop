import type { ChangeEvent } from 'react';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { API_URL } from '../lib/config';

interface Inputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [inputs, setInputs] = useState<Inputs>({ email: '', password: '' });
  const { login } = useContext(AuthContext)!;
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  }

  async function handleSubmit() {
    if (!inputs.email || !inputs.password) {
      setError('Please fill in all fields');
      return;
    }
    if (!inputs.email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    if (inputs.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputs),
    });
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      setError(data.message);
      return;
    }
    login(data.token);
    navigate('/products');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow-sky-700 shadow-md">
        <h2 className="flex justify-center items-center text-3xl font-serif">Login</h2>
        <p className="text-sky-400 flex justify-center items-center my-2">Welcome back</p>
        <div className="my-4">
          <label className="text-gray-700 block">
            Email:
            <input
              className="w-full border border-sky-900 rounded-lg p-2 focus:outline-none focus:ring focus:ring-sky-300 mt-1"
              name="email"
              type="text"
              value={inputs.email}
              placeholder=" ✉"
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <div className="my-4">
          <label className="text-gray-700 block">
            Password:
            <input
              className="w-full border border-sky-900 rounded-lg p-2 focus:outline-none focus:ring focus:ring-sky-300 mt-1"
              name="password"
              type="password"
              value={inputs.password}
              placeholder=" 🔒"
              onChange={handleChange}
            ></input>
          </label>
        </div>
        <button
          className="w-full my-4 border border-sky-200 bg-orange-400 rounded-md font-semibold text-gray-600 p-1 hover:bg-orange-500 hover:cursor-pointer transition-colors duration-200"
          onClick={handleSubmit}
        >
          Log In
        </button>
        {error && <p className="text-red-500">{error}</p>}
        <p className="font-light text-sm mt-5">
          Don't have an account?{' '}
          <Link className="text-blue-500 underline" to="/register">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
