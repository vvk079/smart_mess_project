import React from 'react';

const Badge = ({ children, variant = 'neutral' }) => {
    const baseStyle = {
        padding: '4px 10px',
        borderRadius: 'var(--rad-full)',
        fontSize: '0.75rem',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
    };

    const variants = {
        success: {
            backgroundColor: '#e6f9e6',
            color: '#55b255',
        },
        warning: {
            backgroundColor: '#fff4e5',
            color: '#ff9800',
        },
        danger: {
            backgroundColor: '#ffe5e5',
            color: '#ff5555',
        },
        neutral: {
            backgroundColor: '#f0f0f0',
            color: '#888',
        },
        primary: {
            backgroundColor: 'var(--col-primary-light)',
            color: '#d66e84',
        }
    };

    return (
        <span style={{ ...baseStyle, ...variants[variant] }}>
            {children}
        </span>
    );
};

export default Badge;
