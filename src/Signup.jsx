import { useState } from "react";
import { credentials } from "./Firebase";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import {auth} from './Firebase';
import {createUserWithEmailAndPassword} from "firebase/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]= useState("");
  const [isError,setIsError] = useState(false)
  
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setError('');
          setIsError(false);
          navigate("/login")
          // ...
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
      <label className="heading">Create an account</label>
      <form onSubmit={handleSubmit} className="form">
        <div className="input">
          <label>Email</label>
          {/* <div className="inputfield"> */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          {/* </div> */}
        </div>
        <div className="input">
          <label>Password</label>
          {/* <div className="inputfield"> */}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          {/* </div> */}
        </div>
        <div className="submit">
          <input type="submit" value="Sign up" />
        </div>
      </form>
      {error!==''?<p className="error">{error}</p>:""}
      <div className="link">
        <Link to="/login">Already have an account</Link>
      </div>
    </div>
  );
};

export default Signup;
