import { useState } from "react";
import { signin } from "./Firebase";
import { Link, useNavigate } from "react-router";
import{signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from './Firebase'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
     signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setError('');
          setIsError(false);
          navigate("/expense-tracker")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setIsError(true)
          setError(error.message)
        });
    
  };

  return (
    <div className="signup">
      <label className="heading">Login</label>
        <form onSubmit={handleSubmit} className="form">
          <div className="input">
            <label>
              Email
              </label>
              {/* <div className="inputfield"> */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              {/* </div> */}
            
          </div>
          <div className="input">
            <label>
              Password
              </label>
              {/* <div className="inputfield"> */}
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              {/* </div> */}
           
          </div>
          <div className="submit">
            <input type="submit" value="Login" />
          </div>
        </form>
        {isError?<p className="error">{error}</p>:""}
        <div className="link">

        <Link to="/signup"> Create an account</Link>

        </div>
      </div>
  );
};

export default Login;
