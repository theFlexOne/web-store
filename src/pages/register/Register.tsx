import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth/useAuth';

const initialFormData = Object.freeze({
  email: '',
  password: '',
  passwordConfirmation: '',
});

const Register = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { signup, isUserLoggedIn } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    try {
      const newUser = await signup(formData.email, formData.password);
      console.log(newUser);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.name;
    const value = e.target.value;

    setFormData({
      ...formData,
      [input]: value,
    });
  }

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate('/');
    }
  }, [isUserLoggedIn, navigate]);

  return (
    <div className="h-full flex justify-center items-center">
      <div className="w-1/2 max-w-[500px]">
        <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
        <div className="flex gap-10">
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col">
              {errors['username'] && (
                <p className="text-red-500 text-sm">{errors['username']}</p>
              )}
              <input
                className="border border-gray-400 p-2 mb-4"
                type="email"
                name="email"
                placeholder="Email"
                defaultValue={formData.email}
                onChange={handleChange}
              />
              <input
                className="border border-gray-400 p-2 mb-4"
                type="password"
                name="password"
                placeholder="Password"
                defaultValue={formData.password}
                onChange={handleChange}
              />
              <input
                className="border border-gray-400 p-2 mb-4"
                type="password"
                name="passwordConfirmation"
                placeholder="Confirm Password"
                defaultValue={formData.passwordConfirmation}
                onChange={handleChange}
              />
              <button
                className="bg-blue-500 text-white p-2 rounded mt-4"
                type="submit"
              >
                Sign Up
              </button>
            </form>
            <div className="mt-4 flex flex-wrap gap-2 justify-end">
              <p>Already have an account?</p>
              <Link to="/login" className="text-blue-500">
                Login here!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

function validateForm(formData: typeof initialFormData) {
  const errors: { [key: string]: string } = {};

  if (!formData.email) {
    errors['email'] = 'Email is required';
  }

  if (!formData.password) {
    errors['password'] = 'Password is required';
  }

  if (!formData.passwordConfirmation) {
    errors['passwordConfirmation'] = 'Password confirmation is required';
  }

  if (formData.password !== formData.passwordConfirmation) {
    errors['password'] = 'Passwords do not match';
    errors['passwordConfirmation'] = 'Passwords do not match';
  }

  return errors;
}
