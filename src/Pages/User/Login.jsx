import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import useNavigate
import api from '../../utils/axiosConfig'; // ✅ centralized axios instance

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // ✅ initialize

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const { data } = await api.post('/users/login', form);

      if (data.success) {
        setMessage('Login successful!');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // ✅ Redirect based on role
        if (data.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }

      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (err) {
      setMessage('Something went wrong');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full px-3 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
        >
          Login
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-center text-red-500">{message}</p>}
    </div>
  );
};

export default Login;
