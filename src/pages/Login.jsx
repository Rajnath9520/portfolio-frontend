import React, { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../services/authAPI";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await authAPI.login(form.email, form.password);

      if (res.success) {
        login(res.token, res.user); 
        navigate("/admin");
      } else {
        alert(res.message || "Invalid email or password");
      }
    } catch (error) {
      alert(error.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">

        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Only for Admin
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-gray-300 text-sm mb-2 block">Email</label>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-blue-400">
              <Mail size={18} className="text-gray-300" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-2 block">Password</label>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-blue-400">
              <Lock size={18} className="text-gray-300" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
          >
            Login
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
