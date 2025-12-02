import { useState } from 'react';
import { login } from './api';
import RegisterPage from './RegisterPage';

function LoginPage({ setToken }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [faildauth, setfaildauth] = useState('');
  const [emptyform, setemptyform] = useState();

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

  if (showRegister) {
    return <RegisterPage setToken={setToken} back={() => setShowRegister(false)} />;
  }

  return (
    <form onSubmit={handleLogin} className="space-y-5 max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow">

      <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>

      <div>
        <label className="mb-2 text-sm text-slate-900 font-medium block">Username</label>
        <div className="relative flex items-center">
          <input
            placeholder="Enter username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="px-4 py-3 pr-10 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border border-gray-200 focus:border-black outline-0 rounded-md transition-all"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 text-sm text-slate-900 font-medium block">Password</label>
        <div className="relative flex items-center">
          <input
            type="password"
            placeholder="Enter Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="px-4 py-3 pr-10 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border border-gray-200 focus:border-black outline-0 rounded-md transition-all"
          />
        </div>
      </div>

      {faildauth && <p className="text-red-500 text-sm">{faildauth}</p>}
      {emptyform && <p className="text-red-500 text-sm">{emptyform}</p>}

      <button
        type="submit"
        className="px-5 py-2.5 w-full cursor-pointer text-[15px] font-medium bg-black hover:bg-[#111] text-white rounded-md"
      >
        Login
      </button>

      <button
        type="button"
        onClick={() => setShowRegister(true)}
        className="w-full text-center text-sm text-blue-600 mt-2"
      >
        Create an account
      </button>
    </form>
  );
}

export default LoginPage;
