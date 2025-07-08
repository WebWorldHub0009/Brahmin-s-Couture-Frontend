import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import api from '../../utils/axiosConfig';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border">
        {/* Header */}
        <div className="text-center mb-6">
          <FaSignInAlt className="mx-auto text-3xl text-[#B02E0C]" />
          <h2 className="text-2xl font-semibold text-gray-800 mt-2">Login to Your Account</h2>
          <p className="text-sm text-gray-500">Welcome back! Please login to continue.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B02E0C] transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B02E0C] transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#B02E0C] text-white py-2 rounded-md hover:bg-[#961b00] transition text-sm font-medium"
          >
            Login
          </button>
        </form>

        {/* Message */}
        {message && (
          <p className="text-center text-sm mt-4 text-red-500">{message}</p>
        )}

        {/* Signup Redirect */}
        <p className="text-center text-sm mt-6 text-gray-600">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="text-[#B02E0C] hover:underline font-medium"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
