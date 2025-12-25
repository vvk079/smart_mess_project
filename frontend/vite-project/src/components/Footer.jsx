export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* BRAND */}
        <div className="footer-brand">
          <h3>Smart Mess</h3>
          <p>
            A smart hostel mess management system that ensures fairness,
            transparency, and convenience for students.
          </p>
        </div>

        {/* LINKS */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="/login">Login</a>
          <a href="/register">Get Started</a>
          <a href="/menu">Today’s Menu</a>
          <a href="/complaints">Complaints</a>
        </div>

        {/* ROLES */}
        <div className="footer-links">
          <h4>For Users</h4>
          <a href="/student">Students</a>
          <a href="/admin">Admin</a>
          <a href="/staff">Mess Staff</a>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Smart Mess. All rights reserved.
      </div>
    </footer>
  );
}


