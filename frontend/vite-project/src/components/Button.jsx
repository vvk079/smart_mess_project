import React from 'react';
import '../styles/lightswind.css';

const Button = ({
    children,
    variant = 'primary',
    onClick,
    className = '',
    type = 'button',
    fullWidth = false,
    icon: Icon,
    style,
    ...props
}) => {
    const baseStyle = {
        padding: '10px 20px',
        borderRadius: 'var(--rad-md)',
        fontSize: '0.95rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        width: fullWidth ? '100%' : 'auto',
        // border: 'none', // Removed to allow variants to control border
    };

    const variants = {
        primary: {
            backgroundColor: 'var(--col-primary)',
            color: '#fff',
            border: 'none',
            boxShadow: '0 4px 12px rgba(255, 183, 197, 0.4)',
        },
        secondary: {
            backgroundColor: 'var(--col-lavender)',
            color: 'var(--col-text-main)',
            border: 'none',
        },
        outline: {
            backgroundColor: 'transparent',
            border: '2px solid var(--col-primary)',
            color: 'var(--col-primary)',
        },
        ghost: {
            backgroundColor: 'transparent',
            color: 'var(--col-text-muted)',
            border: 'none',
        },
        danger: {
            backgroundColor: '#FF6B6B',
            color: 'white',
            border: 'none',
        }
    };

    const combinedStyle = { ...baseStyle, ...variants[variant], ...style };

    return (
        <button
            type={type}
            className={`lw-btn-hover ${className}`}
            style={combinedStyle}
            onClick={onClick}
            {...props}
        >
            {Icon && <Icon size={18} strokeWidth={2.5} />}
            {children}
        </button>
    );
};

export default Button;
