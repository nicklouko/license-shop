import type { ChangeEvent } from 'react';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

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
    const res = await fetch('http://localhost:3000/auth/login', {
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
    <div>
      <input
        name="email"
        type="text"
        value={inputs.email}
        placeholder="email"
        onChange={handleChange}
      ></input>
      <input
        name="password"
        type="password"
        value={inputs.password}
        placeholder="password"
        onChange={handleChange}
      ></input>
      <button onClick={handleSubmit}>Log In</button>
      {error && <p>{error}</p>}
    </div>
  );
}
