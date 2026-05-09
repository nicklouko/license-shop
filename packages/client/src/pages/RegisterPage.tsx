import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface Inputs {
  email: string;
  password: string;
}

export default function RegisterPage() {
  const [inputs, setInputs] = useState<Inputs>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit() {
    const res = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    });
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      setError(data.message);
      return;
    }
    navigate('/login');
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const name = e.target.name;
    setInputs((values) => ({ ...values, [name]: value }));
  }

  return (
    <div>
      <input
        name="email"
        value={inputs.email}
        type="text"
        placeholder="email"
        onChange={handleChange}
      ></input>
      <input
        name="password"
        value={inputs.password}
        type="password"
        placeholder="password"
        onChange={handleChange}
      ></input>
      <button onClick={handleSubmit}>Register</button>
      {error && <p>{error}</p>}
    </div>
  );
}
