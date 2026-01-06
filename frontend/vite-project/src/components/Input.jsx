import React from 'react';
import '../styles/lightswind.css';

const Input = ({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    icon: Icon,
    style,
    ...props
}) => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        marginBottom: '16px',
        width: '100%',
    };

    const labelStyle = {
        fontSize: '0.9rem',
        fontWeight: '500',
        color: 'var(--col-text-muted)',
        marginLeft: '4px',
    };

    const wrapperStyle = {
        position: 'relative',
        width: '100%',
    };

    const defaultInputStyle = {
        width: '100%',
        padding: '12px 16px',
        paddingLeft: Icon ? '44px' : '16px',
        borderRadius: 'var(--rad-md)',
        backgroundColor: 'var(--col-surface)',
        border: '1px solid var(--col-border)',
        fontSize: '1rem',
        color: 'var(--col-text-main)',
    };

    return (
        <div style={containerStyle}>
            {label && <label style={labelStyle}>{label}</label>}
            <div style={wrapperStyle}>
                {Icon && <Icon size={18} style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--col-text-muted)',
                    pointerEvents: 'none',
                }} />}
                <input
                    className="lw-input-focus"
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    style={{ ...defaultInputStyle, ...style }}
                    {...props}
                />
            </div>
        </div>
    );
};

export default Input;
