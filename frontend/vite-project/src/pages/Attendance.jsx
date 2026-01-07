import React from 'react';
import { useLocation } from 'react-router-dom';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Navbar from '../components/Navbar';
import '../styles/lightswind.css';

const Attendance = () => {
    const location = useLocation();
    const isDemo = location.pathname.startsWith('/demo');
    // Mock data for attendance
    // For new users, starting with empty attendance history
    const attendanceHistory = [];

    const getStatusVariant = (status) => {
        if (status === 'Present') return 'success';
        if (status === 'Absent') return 'danger';
        return 'neutral';
    };

    return (
        <div style={{ paddingBottom: '90px', minHeight: '100vh', background: 'var(--col-bg)' }}>
            <div style={{ padding: '16px 20px', background: 'white', borderRadius: '0 0 24px 24px', boxShadow: 'var(--shadow-sm)' }}>
                <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Attendance Log</h2>
                <p style={{ color: 'var(--col-text-muted)', fontSize: '0.85rem' }}>Track your daily meals</p>
            </div>

            <div style={{ padding: '20px' }}>
                {attendanceHistory.length === 0 ? (
                    <Card className="lw-card-compact" style={{ textAlign: 'center', color: '#888' }}>
                        No attendance records found yet.
                    </Card>
                ) : attendanceHistory.map((item, index) => (
                    <Card key={index} delay={index * 100} className="lw-hover-lift lw-card-compact" style={{ marginBottom: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid var(--col-border)', paddingBottom: '8px' }}>
                            <span style={{ fontWeight: 'bold' }}>{item.date}</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--col-text-muted)' }}>2026</span>
                        </div>
                        <div className="lw-mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center' }}>
                            {['Breakfast', 'Lunch', 'Dinner'].map((meal) => (
                                <div key={meal} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--col-text-muted)' }}>{meal}</span>
                                    <Badge variant={getStatusVariant(item[meal.toLowerCase()])}>
                                        {item[meal.toLowerCase() === 'breakfast' ? 'breakfast' : meal.toLowerCase() === 'lunch' ? 'lunch' : 'dinner'].substring(0, 1)}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>
            <Navbar isDemo={isDemo} />
        </div>
    );
};

export default Attendance;
