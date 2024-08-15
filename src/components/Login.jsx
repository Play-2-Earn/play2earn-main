import React, { useState } from 'react';
import axios from 'axios';
import { Pointer } from 'lucide-react';
// import SignUpPopup from './Signup';
// import { BrowserRouter as Link} from 'react-router-dom';

const LoginPopup = ({ isOpen, onClose, innSignUpLink, innForgetPasswordLink}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    axios.post('http://localhost:5002/api/users/log_in', { email, password })
      .then(result => {
        console.log(result)
        if (result.data === "success") {
          onClose();
          alert('Welcome to play2earn')
        }
        else {
          alert('user is not exist')
        }
      }
      )
      .catch(err => console.log(err))
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white backdrop-blur-lg rounded-[20px] shadow-lg p-6 max-w-sm w-full border border-gray-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Login</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">&times;</button>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
              placeholder="example@gmail.com"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              style={{
                width: 'calc(100% - 0.5rem)',
                backgroundColor: '#d5dbdb30',
                borderBottom: '1px solid rgba(193, 199, 205, 1)'
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input
              placeholder="Enter your password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

              style={{
                width: 'calc(100% - 0.5rem)',
                backgroundColor: '#d5dbdb30',
                borderBottom: '1px solid rgba(193, 199, 205, 1)'
              }}
            />

          </div>
          <div className="mb-4 text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full mb-3"
            >
              Login
            </button>
            <a onClick={() => innForgetPasswordLink()} className="text-blue-500" >Forgot password?</a>
          </div>
        </form>
        <div className="flex items-center justify-center mb-4">
          <span className="text-gray-600">OR</span>
        </div>
        {/* clientId={clientId} onSuccess={onSuccess} onFailure={onFailure} cookiePolicy={'single_host_origin'} isSignedIn={true}  */}

        <div className="flex justify-between items-center">
          <span>Don't have an account? <a onClick={() => innSignUpLink()} className="text-blue-500">Sign up</a></span>
        </div>
      </div>
    </div>
  );
};
export default LoginPopup;
