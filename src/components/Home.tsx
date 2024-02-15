import { Link } from "react-router-dom";

const Home = () => (
<main className="container">
  <h1>Quote editor</h1>
  <p>A blazing fast quote editor built with Hotwire</p>

  <Link to="/quotes" className="btn btn--primary">View quotes</Link>
</main>
);

export default Home;
