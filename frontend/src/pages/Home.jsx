import panda from "../images/panda.jpg";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1>Hello from panda</h1>
      <img src={panda} alt="Panda was lost" />
    </div>
  )
}

export default Home
