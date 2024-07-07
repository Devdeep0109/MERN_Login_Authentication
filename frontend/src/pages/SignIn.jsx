import { useState } from "react";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
        // Add logic to handle sign-in
    axios.post("http://localhost:8000/api/signin",{email,password})
    .then(result => {
      console.log(result);
      if(result.status == 200){
        Cookies.set("token", result.data )
        navigate("/home")
      }
      else{
        alert(result.data)
      }
  })
    .catch(err => alert(err))
  };

  return (
    <div className="signin-container">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <div className="link-container">
        <Link to="/">Already have an account? Sign Up</Link>
      </div> 
    </div>
  );
};

export default SignIn;
