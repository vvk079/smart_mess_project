import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ClipboardList, Utensils, User, CreditCard } from 'lucide-react';
import '../styles/lightswind.css';

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;

  if (path === '/login' || path === '/register') return null;

  const navStyle = {
    position: 'fixed',
    bottom: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '95%',
    maxWidth: '500px', /* Increased max-width */
    height: '80px', /* Increased height */
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(16px)',
    borderRadius: '50px',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    zIndex: 1000,
    boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
    border: '1px solid rgba(255,255,255,0.8)',
    padding: '0 20px'
  };

  const NavItem = ({ to, icon: Icon, label }) => {
    const isActive = path === to;

    return (
      <Link
        to={to}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          color: isActive ? 'var(--col-primary)' : '#999',
          position: 'relative',
          padding: '10px',
          width: '60px'
        }}
        className="lw-btn-hover"
      >
        <div style={{
          position: 'relative',
          zIndex: 2,
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: isActive ? 'scale(1.1) translateY(-5px)' : 'scale(1)',
        }}>
          <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
        </div>

        {isActive && (
          <span
            className="lw-fade-in"
            style={{
              position: 'absolute', bottom: '8px', width: '4px', height: '4px',
              borderRadius: '50%', background: 'var(--col-primary)'
            }}
          ></span>
        )}
      </Link>
    );
  };

  return (
    <>
      <nav style={navStyle} className="lw-slide-up">
        {path === '/' ? (
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', width: '100%', padding: '0 20px', justifyContent: 'center' }}>
            <span style={{ color: '#888', fontSize: '0.9rem' }}>Please <Link to="/login" style={{ color: 'var(--col-primary)', fontWeight: 'bold' }}>Login</Link> to view dashboard</span>
          </div>
        ) : (
          <>
            <NavItem to="/dashboard" icon={Home} label="Home" />
            <NavItem to="/menu" icon={Utensils} label="Menu" />
            <NavItem to="/attendance" icon={ClipboardList} label="Presence" />
            <NavItem to="/payment" icon={CreditCard} label="Pay" />
            <NavItem to="/profile" icon={User} label="Profile" />
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
