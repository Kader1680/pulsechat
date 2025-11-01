import { useState } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ChatPage from './ChatPage';

function App() {
  const [token, setToken] = useState(localStorage.getItem('tk'));

  const handleLogout = () => {
    localStorage.removeItem('tk');
    setToken('');
  };

  if (!token) return <LoginPage setToken={setToken} />;

  return <ChatPage token={token} onLogout={handleLogout} />;
}

export default App;


