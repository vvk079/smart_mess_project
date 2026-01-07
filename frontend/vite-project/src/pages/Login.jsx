import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import '../styles/lightswind.css';
import api from '../api/axios';

const Login = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('student'); // student | admin
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showWakingUp, setShowWakingUp] = useState(false);

    React.useEffect(() => {
        let timer;
        if (loading) {
            timer = setTimeout(() => setShowWakingUp(true), 3000);
        } else {
            setShowWakingUp(false);
        }
        return () => clearTimeout(timer);
    }, [loading]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const endpoint = role === 'student' ? '/auth/student/login' : '/auth/admin/login';
            const response = await api.post(endpoint, formData);

            // Assuming successful login returns user data or token
            // If handling tokens manually, save to localStorage here

            navigate(role === 'admin' ? '/admin' : '/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            background: 'linear-gradient(135deg, #FFF0F5 0%, #E6E6FA 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Decorative Background Images */}
            <img
                src="/food-bowl.png"
                alt=""
                style={{
                    position: 'absolute',
                    bottom: '-40px',
                    left: '-40px',
                    width: '300px',
                    opacity: 0.6,
                    transform: 'rotate(15deg)',
                    pointerEvents: 'none'
                }}
                className="lw-mobile-hide"
            />
            <img
                src="/mess-building.png"
                alt=""
                style={{
                    position: 'absolute',
                    top: '-60px',
                    right: '-60px',
                    width: '400px',
                    opacity: 0.4,
                    transform: 'rotate(-5deg)',
                    pointerEvents: 'none'
                }}
                className="lw-mobile-hide"
            />

            <Card className="lw-scale-in lw-mobile-padding-sm" style={{ width: '100%', maxWidth: '600px', padding: '60px', position: 'relative', zIndex: 1, boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '12px', fontWeight: '800' }}>Welcome Back</h2>
                    <p style={{ color: '#666', fontSize: '1.1rem' }}>Please sign in to continue</p>
                </div>

                {/* Role Toggle */}
                <div style={{
                    display: 'flex',
                    background: '#f5f5f5',
                    padding: '6px',
                    borderRadius: '50px',
                    marginBottom: '32px',
                    border: '1px solid #eee'
                }}>
                    {['student', 'admin'].map((r) => (
                        <button
                            key={r}
                            onClick={() => setRole(r)}
                            style={{
                                flex: 1,
                                padding: '12px',
                                borderRadius: '50px',
                                background: role === r ? 'white' : 'transparent',
                                color: role === r ? 'var(--col-primary)' : '#888',
                                boxShadow: role === r ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
                                fontWeight: '700',
                                textTransform: 'capitalize',
                                transition: 'all 0.3s ease',
                                fontSize: '1rem'
                            }}
                        >
                            {r}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleLogin}>
                    {error && (
                        <div style={{ marginBottom: '20px', color: 'red', textAlign: 'center' }}>
                            {error}
                        </div>
                    )}
                    <div style={{ marginBottom: '20px' }}>
                        <Input
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={role === 'student' ? "student@college.edu" : "admin@college.edu"}
                            icon={Mail}
                            style={{ padding: '16px' }}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            icon={Lock}
                            style={{ padding: '16px' }}
                            required
                        />
                    </div>

                    <div style={{ textAlign: 'right', marginBottom: '32px' }}>
                        <a href="#" style={{ fontSize: '0.9rem', color: 'var(--col-primary)', fontWeight: '600' }}>Forgot password?</a>
                    </div>

                    <Button fullWidth type="submit" disabled={loading} style={{ padding: '16px', fontSize: '1.1rem', borderRadius: '16px' }}>
                        {loading ? 'Signing In...' : 'Sign In'} <ArrowRight size={20} />
                    </Button>

                    {showWakingUp && (
                        <p style={{ marginTop: '12px', fontSize: '0.85rem', color: '#666', textAlign: 'center' }} className="lw-fade-in">
                            The server is waking up, please wait (this can take up to 30-60s on first load)...
                        </p>
                    )}
                </form>

                <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '1rem', color: '#666' }}>
                    Don't have an account? <span onClick={() => navigate('/register')} style={{ color: 'var(--col-primary)', fontWeight: '700', cursor: 'pointer' }}>Register</span>
                </div>
            </Card>
        </div>
    );
};

export default Login;
