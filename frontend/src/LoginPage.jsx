import { useState } from 'react';
import { login } from './api';
import RegisterPage from './RegisterPage';

function LoginPage({ setToken }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [faildauth, setfaildauth] = useState('');
  const [emptyform, setemptyform] = useState()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      
      const response = await login(user, pass);
      setToken(response.data.token);
      console.log('Token:', response.data.token);
      if (!user || !pass) {
        setemptyform("please fill in all fields");
        return;
      }
      
    } catch (error) {
      console.error('Login failed:', error);
      setfaildauth("password or username incorrect");
    } 

  };

  if (showRegister) return <RegisterPage setToken={setToken} back={() => setShowRegister(false)} />;

  return (
    <form onSubmit={handleLogin}>
      <input placeholder="usersname" value={user} onChange={(e) => setUser(e.target.value)} />
      <input placeholder="password" type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
      <button type="submit">Login</button>
      {faildauth && <p style={{ color: 'red' }}>{faildauth}</p>}
      {emptyform && <p style={{ color: 'red' }}>{emptyform}</p>}
      <button type="button" onClick={() => setShowRegister(true)}>Register</button>
    </form>
  );
}

export default LoginPage;
