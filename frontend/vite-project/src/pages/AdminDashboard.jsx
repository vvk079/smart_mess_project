import React from 'react';
import { Users, Utensils, AlertCircle } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import '../styles/lightswind.css';

const AdminDashboard = () => {
    return (
        <div style={{ padding: '20px', minHeight: '100vh', background: 'var(--col-bg)' }}>
            {/* Admin Header */}
            <div className="lw-slide-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', color: 'var(--col-text-main)' }}>Admin Panel</h1>
                    <p style={{ color: 'var(--col-text-muted)' }}>Manage your mess efficiently</p>
                </div>
                <Button variant="secondary" onClick={() => window.location.href = '/login'}>Logout</Button>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <StatCard title="Total Students" value="450" icon={Users} color="#6A5ACD" delay={0} />
                <StatCard title="Meals Served" value="1,240" icon={Utensils} color="#FF7F50" delay={100} />
                <StatCard title="Complaints" value="12" icon={AlertCircle} color="#FF6B6B" delay={200} />
            </div>

            {/* Menu Management Mock */}
            <section className="lw-slide-up lw-delay-300" style={{ marginBottom: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3>Today's Menu</h3>
                    <Button variant="primary">Edit Menu</Button>
                </div>
                <Card>
                    <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--col-border)' }}>
                        <h4 style={{ color: 'var(--col-primary)', marginBottom: '8px' }}>Breakfast</h4>
                        <p>Idli, Vada, Sambar, Chutney</p>
                    </div>
                    <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--col-border)' }}>
                        <h4 style={{ color: 'var(--col-primary)', marginBottom: '8px' }}>Lunch</h4>
                        <p>Rice, Dal Fry, Jeera Aloo, Curd</p>
                    </div>
                    <div>
                        <h4 style={{ color: 'var(--col-primary)', marginBottom: '8px' }}>Dinner</h4>
                        <p>Chapati, Mix Veg Curry, Kheer</p>
                    </div>
                </Card>
            </section>
        </div>
    );
};

const StatCard = ({ title, value, icon: Icon, color, delay }) => (
    <Card delay={delay} className="lw-hover-lift" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{
            width: '40px', height: '40px', borderRadius: '12px', background: `${color}20`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: color
        }}>
            <Icon size={20} />
        </div>
        <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 'bold' }}>{value}</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--col-text-muted)' }}>{title}</p>
        </div>
    </Card>
);

export default AdminDashboard;
