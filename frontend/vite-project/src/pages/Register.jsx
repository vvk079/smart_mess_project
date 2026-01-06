import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import '../styles/lightswind.css';
import api from '../api/axios';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        rollNo: '',
        course: '',
        batch: '',
        studentType: 'Regular',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await api.post('/auth/student/register', formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
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
            background: 'linear-gradient(135deg, #E6E6FA 0%, #FFF0F5 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Decorative Background Images */}
            <img
                src="/salad-bowl.png"
                alt=""
                style={{
                    position: 'absolute',
                    top: '-50px',
                    left: '-50px',
                    width: '320px',
                    opacity: 0.6,
                    transform: 'rotate(-15deg)',
                    pointerEvents: 'none'
                }}
                className="lw-mobile-hide"
            />
            <img
                src="/mess-hall.png"
                alt=""
                style={{
                    position: 'absolute',
                    bottom: '-20px',
                    right: '-20px',
                    width: '450px',
                    opacity: 0.5,
                    transform: 'rotate(5deg)',
                    pointerEvents: 'none'
                }}
                className="lw-mobile-hide"
            />

            <Card className="lw-scale-in lw-mobile-padding-sm" style={{ width: '100%', maxWidth: '700px', padding: '60px', position: 'relative', zIndex: 1, boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '12px', fontWeight: '800' }}>Create Account</h2>
                    <p style={{ color: '#666', fontSize: '1.1rem' }}>Join SmartMess today</p>
                </div>

                <form onSubmit={handleRegister}>
                    {error && (
                        <div style={{ marginBottom: '20px', color: 'red', textAlign: 'center' }}>
                            {error}
                        </div>
                    )}
                    <div className="lw-mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '10px' }}>
                        <Input
                            label="Full Name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="John Doe"
                            icon={User}
                            style={{ padding: '16px' }}
                            required
                        />
                        <Input
                            label="Roll Number"
                            name="rollNo"
                            value={formData.rollNo}
                            onChange={handleChange}
                            placeholder="12345"
                            icon={User}
                            style={{ padding: '16px' }}
                        />
                    </div>

                    <div className="lw-mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '10px' }}>
                        <Input
                            label="Course"
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            placeholder="B.Tech"
                            icon={Mail}
                            style={{ padding: '16px' }}
                        />
                        <Input
                            label="Batch"
                            name="batch"
                            value={formData.batch}
                            onChange={handleChange}
                            placeholder="2022-26"
                            icon={Mail}
                            style={{ padding: '16px' }}
                        />
                    </div>

                    <div className="lw-mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '10px' }}>
                        <Input
                            label="Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="9876543210"
                            icon={Phone}
                            style={{ padding: '16px' }}
                            required
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '0.9rem', color: '#666', fontWeight: '600' }}>Student Type</label>
                            <select
                                name="studentType"
                                value={formData.studentType}
                                onChange={handleChange}
                                style={{
                                    padding: '16px',
                                    borderRadius: '12px',
                                    border: '1px solid #ddd',
                                    fontSize: '1rem',
                                    background: 'white',
                                    outline: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="Regular">Regular</option>
                                <option value="Hosteler">Hosteler</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                        <Input
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="student@college.edu"
                            icon={Mail}
                            style={{ padding: '16px' }}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
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

                    <Button fullWidth type="submit" disabled={loading} style={{ marginTop: '10px', padding: '16px', fontSize: '1.1rem', borderRadius: '16px' }}>
                        {loading ? 'Registering...' : 'Register'}
                    </Button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '1rem', color: '#666' }}>
                    Already have an account? <span onClick={() => navigate('/login')} style={{ color: 'var(--col-primary)', fontWeight: '700', cursor: 'pointer' }}>Login</span>
                </div>
            </Card>
        </div>
    );
};

export default Register;
