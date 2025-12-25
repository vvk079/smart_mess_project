import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";
import "../styles/home.css";
import Footer from "../components/Footer"; 
import { Link } from "react-router-dom";


export default function Home() {
  return (
    <>
      <Navbar />

      {/* FIRST VIEW */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-left">
            <h1>
              Smart Mess <br />
              <span>Management System</span>
            </h1>

            <p>
              Book meals, manage attendance, handle complaints and payments —
              all in one smart platform.
            </p>

            <div className="hero-buttons">
              <Link to="/register">
              <button className="btn-primary">Get Started</button>
              </Link>
              
              <Link to="/login">
                  <button className="btn-outline">Login</button>
              </Link>
            </div>
          </div>

          

          <div className="hero-right">
            <div className="mock-box">Dashboard Preview</div>
          </div>
        </div>
      </section>

      {/* SECOND VIEW (SCROLL) */}
      <section className="student-why">
  <div className="student-why-inner">

    <h2>Why Students Need Smart Mess</h2>
    <p className="student-why-sub">
      Hostel mess life is not just about food. It’s about fairness,
      convenience, and not paying for meals you never ate.
      Smart Mess is built keeping students in mind.
    </p>

    <div className="student-cards">
      <div className="student-card">
        <div className="student-icon">🍽️</div>
        <h4>Book Only What You Eat</h4>
        <p>
          Many times students are absent or skip meals, but attendance is still
          marked. With Smart Mess, students book meals in advance, so only
          consumed meals are counted.
        </p>
      </div>

      <div className="student-card">
        <div className="student-icon">✅</div>
        <h4>Fair & Automatic Attendance</h4>
        <p>
          Attendance is directly linked to meal booking. If a student books
          and takes a meal, attendance is marked automatically — no arguments,
          no manual mistakes.
        </p>
      </div>

      <div className="student-card">
        <div className="student-icon">📝</div>
        <h4>Complaints That Actually Matter</h4>
        <p>
          Students can raise complaints or give feedback digitally.
          Every issue is tracked and resolved instead of being ignored.
        </p>
      </div>
    </div>

  </div>
</section> 

     <section className="how-smart-mess">
  <div className="how-smart-inner">

    {/* LEFT CONTENT */}
    <div className="how-left">
      <h2>From Mess Chaos to Clarity in 3 Steps</h2>

      <div className="how-step">
        <div className="step-icon">🍽️</div>
        <div>
          <h4>1. Book Your Meal</h4>
          <p>
            Students book breakfast, lunch, or dinner before the cutoff time using the Smart Mess app.
          </p>
        </div>
      </div>

      <div className="how-step">
        <div className="step-icon">✅</div>
        <div>
          <h4>2. Attendance Gets Marked</h4>
          <p>
            If you book and take the meal, attendance is marked automatically. No manual register, no arguments.
          </p>
        </div>
      </div>

      <div className="how-step">
        <div className="step-icon">💰</div>
        <div>
          <h4>3. Pay Only What You Eat</h4>
          <p>
            Monthly bills are calculated based on actual meals consumed — no paying for skipped meals.
          </p>
        </div>
      </div>
    </div>

    {/* RIGHT PREVIEW CARD */}
    <div className="how-right">
      <div className="preview-box">
        <div className="preview-header">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>

        <div className="preview-content">
          <h5>Today’s Status</h5>

          <div className="preview-row">
            <span>🍳 Breakfast</span>
            <span className="status done">Booked</span>
          </div>

          <div className="preview-row">
            <span>🍛 Lunch</span>
            <span className="status pending">Not Booked</span>
          </div>

          <div className="preview-row">
            <span>🍽️ Dinner</span>
            <span className="status done">Booked</span>
          </div>

          <div className="preview-footer">
            Attendance: <strong>Auto-Marked</strong>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>
 
 {/* all your views */}
      <Footer />


    </>
  );
}
