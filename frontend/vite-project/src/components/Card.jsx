import React from 'react';
import '../styles/lightswind.css';

const Card = ({
    children,
    className = '',
    delay = 0,
    hover = true,
    animate = true,
    onClick,
    style: customStyle,
    ...props
}) => {
    const cardStyle = {
        padding: '24px',
        background: 'var(--col-card-bg)',
        borderRadius: 'var(--rad-lg)',
        position: 'relative',
        border: '1px solid rgba(255, 255, 255, 0.6)',
    };

    const animationClass = animate ? 'lw-slide-up' : '';
    const hoverClass = hover ? 'lw-card-hover lw-hover-lift' : '';

    // Custom delay style
    const style = {
        ...cardStyle,
        animationDelay: `${delay}ms`,
        ...customStyle
    };

    return (
        <div
            className={`lw-card ${animationClass} ${hoverClass} ${className}`}
            style={style}
            onClick={onClick}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
