import  { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    const [username ,setUsername] = useState("");
    const [password ,setPassword] = useState("");
    const [confirmPassword ,setConfirmPassword] = useState("");
    const [email ,setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) =>{
        event.preventDefault();

        if(password !== confirmPassword){
            alert("Invalid Password");
        }
      
        axios.post('http://localhost:8000/api/signup', {username,password,email} )
        .then(result => {console.log(result)
          navigate("/signin")
        })
        .catch(err => console.log(err))

        if(password === confirmPassword){
          alert("SignUp successfully")
        }
        
    }


  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="" aria-placeholder="abc@gmail.com">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="" aria-placeholder="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="" placeholder="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
        <div className="link-container">
        <Link to="/signin">Already have an account? Sign In</Link>
      </div>      
      
      </form>

    </div>
  )
}

export default SignUp;
