import "./StudentLogin.css";
import { Link } from "react-router-dom";

export default function StudentLogin() {
  return (
    <div className="login-page">

      {/* TOP BAR */}
      <div className="login-top">
        <h3>Smart Mess</h3>
        <button className="demo-btn">Request Access</button>
      </div>

      {/* LOGIN CARD */}
      <div className="login-card">
        <h2>Student Login</h2>
        <p className="login-sub">
          Enter your details to access your mess account
        </p>

        <input type="text" placeholder="Roll No / Email" />
        <input type="password" placeholder="Password" />

        <div className="login-help">
          <span>Having trouble logging in?</span>
        </div>

        <button className="login-btn">Sign In</button>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="alt-login">
          <button>Google</button>
          <button>College ID</button>
        </div>

        <p className="login-footer">
         <a href="/register">New Student ?</a> <span>Contact Admin</span>
        </p>
      </div>

      {/* FOOTER */}
      <p className="copyright">
        © Smart Mess | Hostel Management System
      </p>

      {/* DECOR ELEMENTS */}
      <div className="shape left"></div>
      <div className="shape right"></div>

    </div>
  );
}
