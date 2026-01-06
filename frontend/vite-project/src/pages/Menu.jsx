import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Leaf, Beef } from 'lucide-react'; // Beef as non-veg icon placeholder
import Card from '../components/Card';
import Badge from '../components/Badge';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import '../styles/lightswind.css';

const Menu = () => {
    const [selectedDay, setSelectedDay] = useState('Today');

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDayIndex = new Date().getDay();

    const menuItems = {
        Breakfast: [
            { name: 'Masala Dosa', type: 'veg' },
            { name: 'Sambar & Chutney', type: 'veg' },
            { name: 'Omelette', type: 'non-veg' },
        ],
        Lunch: [
            { name: 'Veg Biryani', type: 'veg' },
            { name: 'Chicken Curry', type: 'non-veg' },
            { name: 'Raita', type: 'veg' },
        ],
        Dinner: [
            { name: 'Chapati', type: 'veg' },
            { name: 'Dal Tadka', type: 'veg' },
            { name: 'Jeera Rice', type: 'veg' },
        ]
    };

    return (
        <div style={{ paddingBottom: '90px', minHeight: '100vh' }}>
            <div style={{ padding: '20px', background: 'white', position: 'sticky', top: 0, zIndex: 10, boxShadow: 'var(--shadow-sm)' }}>
                <h2 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>Weekly Menu</h2>

                {/* Date Selector */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <Button variant="ghost"><ChevronLeft size={20} /></Button>
                    <span style={{ fontWeight: '600' }}>January 2026</span>
                    <Button variant="ghost"><ChevronRight size={20} /></Button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', overflowX: 'auto', gap: '8px', paddingBottom: '4px' }}>
                    {days.map((day, idx) => {
                        const active = idx === currentDayIndex;
                        return (
                            <div
                                key={day}
                                className={active ? 'lw-pulse' : ''}
                                style={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '45px',
                                    padding: '8px 4px', borderRadius: '12px',
                                    background: active ? 'var(--col-primary)' : 'var(--col-surface)',
                                    color: active ? 'white' : 'var(--col-text-muted)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <span style={{ fontSize: '0.75rem' }}>{day}</span>
                                <span style={{ fontWeight: 'bold' }}>{10 + idx}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div style={{ padding: '20px' }}>
                {Object.entries(menuItems).map(([category, items], sectionIdx) => (
                    <div key={category} className="lw-slide-up" style={{ animationDelay: `${sectionIdx * 100}ms`, marginBottom: '24px' }}>
                        <h3 style={{ marginBottom: '12px', fontSize: '1.1rem', color: 'var(--col-text-main)', borderLeft: '3px solid var(--col-primary)', paddingLeft: '8px' }}>
                            {category}
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                            {items.map((item, idx) => (
                                <Card key={idx} hover={true} style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontWeight: '500' }}>{item.name}</span>
                                    <Badge variant={item.type === 'veg' ? 'success' : 'danger'}>
                                        {item.type === 'veg' ? <Leaf size={12} /> : <Beef size={12} />}
                                        {item.type === 'veg' ? 'Veg' : 'Non-Veg'}
                                    </Badge>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <Navbar />
        </div>
    );
};

export default Menu;
