import "../styles/home.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <h2 className="logo">Smart Mess</h2>

       <div className="nav-actions">
  <Link to="/login">
                  <button className="btn-outline">Login</button>
              </Link>
             <Link to="/register">
              <button className="btn-primary">Get Started</button>
              </Link>
</div>

      </div>
    </nav>
  );
}

export default Navbar;
