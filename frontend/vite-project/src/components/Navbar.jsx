import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, ClipboardList, Utensils, User, CreditCard } from 'lucide-react';
import '../styles/lightswind.css';

const Navbar = ({ isDemo = false }) => {
  const location = useLocation();
  const path = location.pathname;
  const isDemoMode = isDemo || path.startsWith('/demo');

  if (path === '/login' || path === '/register') return null;

  const navStyle = {
    position: 'fixed',
    bottom: '20px',
    left: '0',
    right: '0',
    margin: '0 auto',
    width: '90%',
    maxWidth: '420px',
    height: '64px',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(20px)',
    borderRadius: '32px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 2000,
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    border: '1px solid rgba(255,255,255,0.8)',
    padding: '0 8px',
    overflow: 'hidden'
  };

  const NavItem = ({ to, icon: Icon }) => {
    const navigate = useNavigate();
    const linkTo = isDemoMode ? (to === '/dashboard' ? '/demo' : `/demo${to}`) : to;
    const isActive = path === linkTo;

    const handleClick = (e) => {
      if (isDemoMode && to === '/payment') {
        e.preventDefault();
        navigate('/login');
      }
    };

    return (
      <Link
        to={linkTo}
        onClick={handleClick}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          color: isActive ? 'var(--col-primary)' : '#999',
          position: 'relative',
          padding: '8px',
          flex: 1,
          minWidth: 0,
          textDecoration: 'none',
          transition: 'all 0.2s ease'
        }}
        className="lw-btn-hover"
      >
        <div style={{
          position: 'relative',
          zIndex: 2,
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: isActive ? 'scale(1.1) translateY(-3px)' : 'scale(1)',
        }}>
          <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
        </div>

        {isActive && (
          <span
            className="lw-fade-in"
            style={{
              position: 'absolute', bottom: '6px', width: '4px', height: '4px',
              borderRadius: '50%', background: 'var(--col-primary)'
            }}
          ></span>
        )}
      </Link>
    );
  };

  return (
    <nav style={navStyle} className="lw-slide-up">
      {path === '/' ? (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', width: '100%', padding: '0 10px', justifyContent: 'center', textAlign: 'center' }}>
          <span style={{ color: '#888', fontSize: '0.8rem' }}>Please <Link to="/login" style={{ color: 'var(--col-primary)', fontWeight: 'bold' }}>Login</Link> to view dashboard</span>
        </div>
      ) : (
        <>
          <NavItem to="/dashboard" icon={Home} />
          <NavItem to="/menu" icon={Utensils} />
          <NavItem to="/attendance" icon={ClipboardList} />
          <NavItem to="/payment" icon={CreditCard} />
          <NavItem to="/profile" icon={User} />
        </>
      )}
    </nav>
  );
};

export default Navbar;
