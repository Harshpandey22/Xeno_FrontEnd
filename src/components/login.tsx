import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating loading for Google OAuth
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('authToken', 'your-auth-token'); // Set token
      onLogin();
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  const signIn = (response: any) => {
    if (response.credential) {
      console.log('Google OAuth Response:', response);
      onLogin();
      navigate('/dashboard');
    }
  };

  const handleGoogleError = () => {
    console.error('Google OAuth Error');
    alert('Google login failed. Please try again.');
  };

  return (
    <GoogleOAuthProvider clientId="270451792556-ki8n3k2mlnqurtf1qe059bso0uo15rq1.apps.googleusercontent.com">
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Section: Login Forms */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 space-y-8">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome Back</h1>
              <p className="mt-2 text-gray-600">Sign in to access your dashboard</p>
            </div>

            {/* Traditional Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign in with</span>
              </div>
            </div>

            {/* Google Login Button */}
            {loaded ? (
              <GoogleLogin
                onSuccess={signIn}
                onError={handleGoogleError} // Use `onError` instead of `onFailure`
                useOneTap
                shape="rectangular"
                theme="filled_blue"
                width="100%"
              />
            ) : (
              <div className="mt-6 flex justify-center text-gray-500">
                Loading Google login...
              </div>
            )}
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="hidden lg:block w-full lg:w-1/2 bg-gray-100">
          <div className="h-full flex items-center justify-center p-8">
            <img
              src="https://images.unsplash.com/photo-1460467820054-c87ab43e9b59?q=80&w=1967&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Login Illustration"
              className="object-cover w-full max-w-2xl rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
