import "./studentRegister.css";

export default function StudentRegister() {
  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h2>
          Let’s Get <span>Started</span>
        </h2>
        <p>Create your Smart Mess student account</p>

        <form>
          <div className="form-grid">
            <div className="input-group">
              <label>First Name</label>
              <input type="text" placeholder="Rahul" />
            </div>

            <div className="input-group">
              <label>Last Name</label>
              <input type="text" placeholder="Sharma" />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="rahul@gmail.com" />
            </div>

            <div className="input-group">
              <label>Phone</label>
              <input type="text" placeholder="+91 98765 43210" />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="********" />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="********" />
            </div>
          </div>

          <div className="checkbox-group">
            <input type="checkbox" />
            <span>
              I agree to the <b>Terms</b> and <b>Privacy Policy</b>
            </span>
          </div>

          <button className="register-btn">Create Account</button>

          <p className="login-text">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}
