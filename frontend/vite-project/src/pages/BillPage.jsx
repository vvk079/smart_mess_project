import React, { useState } from "react";
import "./billPage.css";
import { useNavigate , Link} from "react-router-dom";

export default function BillPage() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  const billData = [
    { meal: "Breakfast", icon: "🍞", taken: 5, cost: 50, color: "breakfast" },
    { meal: "Lunch", icon: "🍛", taken: 2, cost: 80, color: "lunch" },
    { meal: "Dinner", icon: "🍲", taken: 0, cost: 100, color: "dinner" },
  ];

  const total = billData.reduce(
    (sum, item) => sum + item.taken * item.cost,
    0
  );

  return (
    <div className="bill-bg">
      <div className="bill-shell-single">

        {/* HEADER */}
        <div className="bill-header">
          <div>
            <h1>Your Monthly Bill</h1>
            <p>Meal-wise usage & charges</p>
          </div>

          {/* 3 DOT MENU */}
          <div className="menu-wrapper">
            <button className="dots" onClick={() => setOpenMenu(!openMenu)}>
              •••
            </button>

            {openMenu && (
              <div className="profile-dropdown big-dropdown">
                
                <button onClick={()=> navigate("/student/home")} className="dropdown-row">👤 Profile</button>
                <button className="dropdown-row">💳 Payments</button>
                <button className="dropdown-row active">🧾 Your Bill</button>
                <button className="dropdown-row">📦 Plans</button>

                <div className="dropdown-divider" />

                <button className="dropdown-row">❓ Help</button>
                <button className="dropdown-row">📜 Policies</button>
                <button className="dropdown-row logout">🚪 Sign out</button>
              </div>
            )}
          </div>
        </div>

        {/* BIG BILL CARD */}
        <div className="bill-card big-card">
          {billData.map((item) => (
            <div className={`bill-row ${item.color}`} key={item.meal}>
              <div className="bill-left">
                <span className="bill-icon">{item.icon}</span>
                <div>
                  <h3>{item.meal}</h3>
                  <p>
                    Taken: {item.taken} × ₹{item.cost}
                  </p>
                </div>
              </div>
              <div className="bill-amount">
                ₹{item.taken * item.cost}
              </div>
            </div>
          ))}

          <div className="bill-divider" />

          <div className="bill-total">
            <span>Total Amount</span>
            <span>₹{total}</span>
          </div>

          <button
            className="pay-now-btn big-pay"
            onClick={() => navigate("/student/payment")}
          >
            Pay Now →
          </button>
        </div>
      </div>
    </div>
  );
}
