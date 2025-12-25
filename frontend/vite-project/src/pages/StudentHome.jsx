import React from 'react';
import './studentHome.css';
import './homesidebar.css';
import  { useState , useRef } from 'react';
import { useNavigate } from "react-router-dom";


export default function MessDashboard() {
     const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(false);
     const btnRef = useRef(null);

  const rect = btnRef.current?.getBoundingClientRect();

  return (
    <>
    <div className="student-bg">
      <div className="student-shell">
        
        {/* Header */}
        <div className="student-header">
          <div>
            <h1>Welcome, Rahul 👋</h1>
            <p>Here's your mess overview</p>
          </div>
            <div className="menu-wrapper">
    <button
      className="dots"
      onClick={() => setOpenMenu(prev => !prev)}
    >
      •••
    </button>

    {openMenu && (
  <div className="profile-dropdown">
    
    <button className="dropdown-row active">
      <span className="icon">👤</span>
      <span>Profile</span>
    </button>

    <button className="dropdown-row">
      <span className="icon">💳</span>
      <span>Payments</span>
    </button>

    <button className="dropdown-row"
    onClick={() => navigate("/student/paybill")}>
      <span className="icon">🧾</span>
      <span>Your Bill</span>
    </button>

    <button className="dropdown-row">
      <span className="icon">📦</span>
      <span>Plans</span>
    </button>

    <div className="dropdown-divider" />

    <button className="dropdown-row">
      <span className="icon">❓</span>
      <span>Help</span>
    </button>

    <button className="dropdown-row">
      <span className="icon">📜</span>
      <span>Policies</span>
    </button>

    <button className="dropdown-row logout">
      <span className="icon">🚪</span>
      <span>Sign out</span>
    </button>

  </div>
)}

  </div>
            
        
        </div>

        
         {/* rest UI */}

            {/* ✅ DROPDOWN OUTSIDE ALL CONTAINERS */}
     
        {/* Building Illustration */}
        <div className="building-img">
          <svg viewBox="0 0 200 180" className="building-svg">
            <defs>
              <linearGradient id="buildingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e5b3c5" />
                <stop offset="100%" stopColor="#d89cb5" />
              </linearGradient>
            </defs>
            <rect x="50" y="40" width="100" height="120" fill="url(#buildingGrad)" rx="4" />
            <rect x="45" y="30" width="110" height="15" fill="#c088a3" rx="2" />
            <rect x="85" y="15" width="15" height="20" fill="#c088a3" rx="2" />
            <ellipse cx="70" cy="60" rx="8" ry="12" fill="#4a4a6e" />
            <ellipse cx="100" cy="60" rx="8" ry="12" fill="#4a4a6e" />
            <ellipse cx="130" cy="60" rx="8" ry="12" fill="#4a4a6e" />
            <ellipse cx="70" cy="90" rx="8" ry="12" fill="#4a4a6e" />
            <ellipse cx="100" cy="90" rx="8" ry="12" fill="#4a4a6e" />
            <ellipse cx="130" cy="90" rx="8" ry="12" fill="#4a4a6e" />
            <ellipse cx="70" cy="120" rx="8" ry="12" fill="#4a4a6e" />
            <ellipse cx="100" cy="120" rx="8" ry="12" fill="#4a4a6e" />
            <ellipse cx="130" cy="120" rx="8" ry="12" fill="#4a4a6e" />
            <path d="M 90 140 Q 90 135 95 135 L 105 135 Q 110 135 110 140 L 110 160 L 90 160 Z" fill="#4a4a6e" />
            <circle cx="30" cy="155" r="12" fill="#c4a5b8" />
            <rect x="28" y="155" width="4" height="15" fill="#8b7088" />
            <circle cx="170" cy="155" r="12" fill="#c4a5b8" />
            <rect x="168" y="155" width="4" height="15" fill="#8b7088" />
            <rect x="0" y="100" width="50" height="80" fill="#d4b5c8" opacity="0.4" />
            <rect x="150" y="80" width="50" height="100" fill="#d4b5c8" opacity="0.4" />
            <circle cx="25" cy="80" r="20" fill="#d4b5c8" opacity="0.3" />
            <circle cx="175" cy="60" r="25" fill="#d4b5c8" opacity="0.3" />
          </svg>
        </div>

        {/* Layout Container */}
        <div className="layout-container">
          
          {/* LEFT COLUMN */}
          <div className="left-column">
            
            {/* Today's Meals Card */}
            <div className="card meals-card">
              <h2>Today's Meals</h2>
              
              <div className="meal-row">
                <div className="meal-card done">
                  <h3>Breakfast</h3>
                  <p>8:00 - 9:30 AM</p>
                  <span className="status-badge">done</span>
                </div>

                <div className="meal-card booked">
                  <h3>Lunch</h3>
                  <p>1:00 - 2:30 PM</p>
                  <span className="status-badge">booked</span>
                </div>

                <div className="meal-card closed">
                  <h3>Dinner</h3>
                  <p>8:00 - 9:30 PM</p>
                  <span className="status-badge">closed</span>
                </div>
              </div>
            </div>

            {/* Attendance Grid Card */}
            <div className="card attendance-card">
              <h2>Attendance</h2>
              
              <div className="attendance-grid-row">
                <div className="attendance-col">
                  <h3>Breakfast</h3>
                  <div className="attendance-status">
                    <span>Present</span>
                    <span className="check-icon">✓</span>
                  </div>
                  <p className="meal-count">5/30 Meals</p>
                </div>

                <div className="attendance-col">
                  <h3>Lunch</h3>
                  <div className="attendance-status">
                    <span>Present</span>
                    <span className="check-icon">✓</span>
                  </div>
                  <p className="meal-count">2/30 Meals</p>
                </div>

                <div className="attendance-col">
                  <h3>Dinner</h3>
                  <div className="attendance-status absent">
                    <span>Present</span>
                    <span className="check-icon absent">✓</span>
                  </div>
                  <p className="meal-count">0/30 Meals</p>
                </div>
              </div>

              <div className="menu-section">
                <div className="menu-item">
                  <span className="menu-emoji">🥘</span>
                  <span className="menu-text"><strong>Breakfast:</strong> Aloo Paratha</span>
                </div>
                <div className="menu-item">
                  <span className="menu-emoji">🍛</span>
                  <span className="menu-text"><strong>Lunch:</strong> Rajma Chawal</span>
                </div>
                <div className="menu-item">
                  <span className="menu-emoji">🍲</span>
                  <span className="menu-text"><strong>Dinner:</strong> Paneer Butter Masala</span>
                </div>
              </div>
            </div>

            {/* Today's Menu Card */}
            <div className="card menu-card">
              <h2>Today's Menu</h2>
              
              <div className="menu-list">
                <div className="menu-item-large">
                  <span className="menu-emoji-large">🥘</span>
                  <span className="menu-text-large"><strong>Breakfast:</strong> Aloo Paratha</span>
                </div>
                <div className="menu-item-large">
                  <span className="menu-emoji-large">🍛</span>
                  <span className="menu-text-large"><strong>Lunch:</strong> Rajma Chawal</span>
                </div>
                <div className="menu-item-large">
                  <span className="menu-emoji-large">🍲</span>
                  <span className="menu-text-large"><strong>Dinner:</strong> Paneer Butter Masala</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="right-column">
            
            {/* Attendance Stats Card */}
            <div className="card attendance-stats-card compact">
  <h2>Attendance</h2>

  <div className="attendance-row">
    {/* Breakfast */}
    <div className="attendance-mini">
      <div className="mini-left">
        <div className="icon-badge breakfast-badge">🍞</div>
        <span className="meal-name">Breakfast</span>
      </div>
      <div className="mini-right">
        <span className="check-mark">✓</span>
        <span className="count">5%</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill breakfast-fill" style={{ width: '17%' }} />
      </div>
    </div>

    {/* Lunch */}
    <div className="attendance-mini">
      <div className="mini-left">
        <div className="icon-badge lunch-badge">👁️</div>
        <span className="meal-name">Lunch</span>
      </div>
      <div className="mini-right">
        <span className="check-mark">✓</span>
        <span className="count">2/30</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill lunch-fill" style={{ width: '7%' }} />
      </div>
    </div>

    {/* Dinner */}
    <div className="attendance-mini">
      <div className="mini-left">
        <div className="icon-badge dinner-badge">🍲</div>
        <span className="meal-name">Dinner</span>
      </div>
      <div className="mini-right">
        <span className="check-mark">✓</span>
        <span className="count">0/30</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill dinner-fill" style={{ width: '0%' }} />
      </div>
    </div>
  </div>

  {/* Circle stays same */}
  <div className="circle-stats">
    <div className="circle-wrapper">
      <svg className="circle-svg" width="160" height="160" viewBox="0 0 180 180">
        <circle cx="90" cy="90" r="70" fill="none" stroke="#f1f1f5" strokeWidth="18"/>
        <circle
          cx="90"
          cy="90"
          r="70"
          fill="none"
          stroke="#ffb88c"
          strokeWidth="18"
          strokeDasharray="440"
          strokeDashoffset="402"
          strokeLinecap="round"
          transform="rotate(-90 90 90)"
        />
      </svg>
      <div className="circle-content">
        <div className="circle-value">7/90</div>
        <div className="circle-label">Meals</div>
      </div>
    </div>
    <div className="month-percent">This Month: 86%</div>
  </div>
</div>


            {/* Meal Voting Card */}
            <div className="card voting-card">
              <h2>Meal Voting</h2>
              <p className="subtitle">Vote for Tomorrow's Dinner</p>
              <p className="vote-description">Cast your vote to decide tomorrow's dinner.</p>
              
              <div className="vote-item">
                <div className="vote-header">
                  <div className="vote-option">
                    <span className="vote-emoji">🥘</span>
                    <span className="vote-name">Chole Bhature</span>
                  </div>
                  <div className="vote-stats">
                    <span className="vote-count">47 Votes</span>
                  </div>
                </div>
                <div className="vote-bar-container">
                  <div className="vote-bar">
                    <div className="vote-fill" style={{width: '45%'}}></div>
                  </div>
                  <span className="vote-percent">45%</span>
                </div>
              </div>

              <div className="vote-item">
                <div className="vote-header">
                  <div className="vote-option">
                    <span className="vote-emoji">🍲</span>
                    <span className="vote-name">Dum Aloo</span>
                  </div>
                  <div className="vote-stats">
                    <span className="vote-count">35 Votes</span>
                  </div>
                </div>
                <div className="vote-bar-container">
                  <div className="vote-bar">
                    <div className="vote-fill" style={{width: '35%'}}></div>
                  </div>
                  <span className="vote-percent">35%</span>
                </div>
              </div>

              <div className="vote-item">
                <div className="vote-header">
                  <div className="vote-option">
                    <span className="vote-emoji">🍲</span>
                    <span className="vote-name">Kadhai Paneer</span>
                  </div>
                  <div className="vote-stats">
                    <span className="vote-count">20 Votes</span>
                  </div>
                </div>
                <div className="vote-bar-container">
                  <div className="vote-bar">
                    <div className="vote-fill" style={{width: '20%'}}></div>
                  </div>
                  <span className="vote-percent">20%</span>
                </div>
              </div>

              <button className="vote-btn">Vote Now</button>
            </div>

          </div>

        </div>

      </div>
    </div>

  
    </>
    
  );
}