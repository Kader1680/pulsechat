import { useState } from 'react';
import { register, login } from './api';

function RegisterPage({ setToken, back }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    await register(user, pass);
    // Auto login after registration
    const { data } = await login(user, pass);
    localStorage.setItem('tk', data.token);
    setToken(data.token);
  };

  return (
    <form onSubmit={handleRegister}>
      <input placeholder="Username" value={user} onChange={(e) => setUser(e.target.value)} />
      <input placeholder="Password" type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
      <button type="submit">Register</button>
      <button type="button" onClick={back}>Back to Login</button>
    </form>
  );
}

export default RegisterPage;
