import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { isUserLoggedIn, login } = useAuth();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login(email, password);
  }

  useEffect(() => {
    if (isUserLoggedIn) navigate('/');
  }, [isUserLoggedIn, navigate]);

  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-1/3 max-w-[400px]">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            className="border border-gray-400 p-2 mb-4"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border border-gray-400 p-2 mb-4"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-blue-500 text-white p-2 rounded" type="submit">
            Login
          </button>
        </form>

        <div className="mt-4 flex flex-wrap gap-2">
          <p>Don't have an account?</p>
          <Link to="/register" className="text-blue-500">
            Sign up here!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
