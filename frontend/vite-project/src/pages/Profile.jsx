import React from 'react';
import { User, Mail, Phone, Home, LogOut, Edit2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import '../styles/lightswind.css';
import api from '../api/axios';

const Profile = () => {
    const [user, setUser] = React.useState(null);
    const location = useLocation();
    const isDemo = location.pathname.startsWith('/demo');
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/user/profile');
                setUser(res.data);
            } catch (err) {
                console.error("Failed to fetch profile", err);
            } finally {
                setLoading(false);
            }
        };

        if (isDemo) {
            setUser({
                fullName: 'Demo Student',
                email: 'demo@smartmess.com',
                studentType: 'Regular',
                rollNo: '2026-DEMO-01',
                course: 'Computer Science',
                batch: '2022-2026'
            });
            setLoading(false);
        } else {
            fetchProfile();
        }
    }, [isDemo]);

    if (loading) {
        return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
    }

    return (
        <div style={{ paddingBottom: '90px', minHeight: '100vh', background: '#F9FAFB' }}>
            <div style={{ padding: '24px 20px 16px', background: 'linear-gradient(180deg, #E0F2FE 0%, rgba(249, 250, 251, 0) 100%)', textAlign: 'center' }}>
                <div className="lw-scale-in" style={{
                    width: '80px', height: '80px', borderRadius: '50%', background: 'white',
                    margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '4px solid white'
                }}>
                    <User size={40} color="#0EA5E9" />
                </div>
                <h2 className="lw-slide-up" style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1F2937' }}>{user?.fullName || 'Student'}</h2>
                <div className="lw-slide-up lw-delay-100" style={{
                    display: 'inline-block', margin: '4px 0', padding: '4px 12px',
                    background: '#F0F9FF', borderRadius: '20px',
                    fontSize: '0.8rem', color: '#0369A1', fontWeight: '700'
                }}>
                    {user?.studentType || 'Regular'} • {user?.rollNo || 'N/A'}
                </div>
            </div>

            <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto' }}>
                <Card className="lw-slide-up lw-delay-200 lw-card-compact" style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#374151' }}>Personal Information</h3>
                        <Button variant="ghost" className="lw-btn-hover" style={{ padding: '6px' }}><Edit2 size={16} /></Button>
                    </div>

                    <InfoRow icon={Mail} label="Email Address" value={user?.email || 'N/A'} />
                    <InfoRow icon={Phone} label="Academic Course" value={user?.course || 'No Course listed'} />
                    <InfoRow icon={Home} label="Batch / Year" value={user?.batch || 'No Batch listed'} />
                </Card>

                <Button fullWidth variant="outline" icon={LogOut} onClick={() => {
                    api.post('/auth/student/logout').finally(() => window.location.href = '/login');
                }} style={{ borderRadius: '12px', padding: '12px', fontSize: '0.9rem' }}>
                    Sign Out
                </Button>
            </div>
            <Navbar isDemo={isDemo} />
        </div>
    );
};

const InfoRow = ({ icon: Icon, label, value }) => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{
            width: '36px', height: '36px', borderRadius: '10px', background: 'var(--col-surface)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px',
            color: 'var(--col-text-muted)', flexShrink: 0
        }}>
            <Icon size={18} />
        </div>
        <div className="info-row-text">
            <p style={{ fontSize: '0.8rem', color: 'var(--col-text-muted)' }}>{label}</p>
            <p style={{ fontWeight: '500', color: 'var(--col-text-main)' }}>{value}</p>
        </div>
    </div>
);

export default Profile;
