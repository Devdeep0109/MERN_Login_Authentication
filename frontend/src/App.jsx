import { Route ,Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />
      </Routes>
    </div>
    
  )
}

export default App
