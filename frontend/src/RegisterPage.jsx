import { useState } from 'react';
import { register, login } from './api';

function RegisterPage({ setToken, back }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    await register(user, pass);

    const { data } = await login(user, pass);
    localStorage.setItem('tk', data.token);
    setToken(data.token);
  };

  return (
    <form onSubmit={handleRegister} className="space-y-5 max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow">

      <h1 className="text-2xl font-semibold text-center mb-4">Welcome To Pushslak</h1>

      <div>
        <label className="mb-2 text-sm text-slate-900 font-medium block">First Name</label>
        <input
          placeholder="Enter username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border border-gray-200 focus:border-black outline-0 rounded-md transition-all"
        />
      </div>

      <div>
        <label className="mb-2 text-sm text-slate-900 font-medium block">Last Name</label>
        <input
          placeholder="Enter username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border border-gray-200 focus:border-black outline-0 rounded-md transition-all"
        />
      </div>


      <div>
        <label className="mb-2 text-sm text-slate-900 font-medium block">Username</label>
        <input
          placeholder="Enter username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border border-gray-200 focus:border-black outline-0 rounded-md transition-all"
        />
      </div>

      <div>
        <label className="mb-2 text-sm text-slate-900 font-medium block">Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border border-gray-200 focus:border-black outline-0 rounded-md transition-all"
        />
      </div>

      <button
        type="submit"
        className="px-5 py-2.5 w-full cursor-pointer text-[15px] font-medium bg-black hover:bg-[#111] text-white rounded-md"
      >
        Register
      </button>

      <button
        type="button"
        onClick={back}
        className="w-full text-center text-sm text-blue-600 mt-2"
      >
        Back to Login
      </button>
    </form>
  );
}

export default RegisterPage;
