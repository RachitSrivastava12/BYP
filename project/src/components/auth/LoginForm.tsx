import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, UserPlus } from 'lucide-react';

const API = "http://localhost:3000";

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Store both token and userId
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        navigate('/dashboard');
      } else {
        // Handle login error
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Basic client-side validation
      if (!email || !password) {
        alert('Please enter both email and password');
        return;
      }

      // Password strength check (optional but recommended)
      if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
      }

      const response = await fetch(`${API}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Registration successful! You can now log in.');
        setIsRegistered(true);
      } else {
        // Handle registration error
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error registering:', error);
      alert('An error occurred. Please try again later.');
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {isRegistered === null ? (
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Are you already registered?
            </h2>
            <div className="mt-6 flex justify-around">
              <button
                onClick={() => setIsRegistered(true)}
                className="py-3 px-6 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
              >
                Yes, I am
              </button>
              <button
                onClick={() => setIsRegistered(false)}
                className="py-3 px-6 bg-gray-300 text-gray-900 font-medium rounded-md hover:bg-gray-400"
              >
                No, I need to register
              </button>
            </div>
          </div>
        ) : isRegistered ? (
          <>
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    required
                    className="appearance-none rounded-none relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Sign in
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Create an account
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleRegistration}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    required
                    className="appearance-none rounded-none relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <UserPlus className="h-5 w-5 mr-2" />
                  Create Account
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}