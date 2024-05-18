import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signupimg from '../../assets/signUp.png';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        formData
      );
  
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      console.log("Login successful:", user);
      localStorage.setItem("isFirstTimeUser",false)
      navigate("/MainPage")

    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    
    <div className="max-h-screen flex bg-blue-100">
      
      
      <div className="w-1/2 bg-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-blue-700">Sign In</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign in
                </button>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-sm text-gray-600">Or</div>
              </div>
           

              <div className="mt-4">
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <FontAwesomeIcon icon={faGoogle} className="h-6 w-6 mr-2" />
                  Sign in with Google
                </button>
              </div>

              <div className="mt-4 text-center">
                <span className="text-sm text-gray-600">Don't have an account? </span>
                <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">Sign up</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-blue-300 flex justify-center items-center">
        <img src={signupimg} alt="Logo" className="mx-auto h-screen" />
      </div>
    </div>
  );
}

export default Login;
