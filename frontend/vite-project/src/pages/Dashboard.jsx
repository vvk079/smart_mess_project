import React from 'react';
import confetti from 'canvas-confetti';
import { useLocation } from 'react-router-dom';
import { MoreHorizontal, User, Users, CreditCard, Settings, HelpCircle, MessageCircle, LogOut } from 'lucide-react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { SidebarProvider, useSidebar, SidebarContainer, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarSeparator } from '../components/Sidebar';
import '../styles/lightswind.css';
import '../styles/dashboard.css';
import api from '../api/axios';

// Wrapper component to provide context
const DashboardWrapper = () => (
    <SidebarProvider>
        <Dashboard />
    </SidebarProvider>
);

const Dashboard = () => {
    const { setExpanded } = useSidebar();
    const location = useLocation();
    const isDemo = location.pathname.startsWith('/demo');
    const [user, setUser] = React.useState(null);
    const [bookings, setBookings] = React.useState([]);
    const [attendanceSummary, setAttendanceSummary] = React.useState({ Breakfast: 0, Lunch: 0, Dinner: 0, Total: 0 });
    const [voteCounts, setVoteCounts] = React.useState({});
    const [myVote, setMyVote] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [bookingLoading, setBookingLoading] = React.useState(null);
    const [votingLoading, setVotingLoading] = React.useState(false);

    const fetchData = async () => {
        try {
            const [profileRes, bookingRes, voteCountRes, myVoteRes, attendanceRes] = await Promise.all([
                api.get('/user/profile'),
                api.get('/user/booking/my'),
                api.get('/vote/counts'),
                api.get('/vote/my'),
                api.get('/user/attendance/summary')
            ]);
            setUser(profileRes.data);
            setBookings(bookingRes.data.bookings || []);
            setVoteCounts(voteCountRes.data.voteCounts || {});
            setMyVote(myVoteRes.data.vote?.mealOption || null);
            setAttendanceSummary(attendanceRes.data || { Breakfast: 0, Lunch: 0, Dinner: 0, Total: 0 });
        } catch (err) {
            console.error("Failed to fetch data", err);
            // Redirect to login on 401/403
            if (err.response?.status === 401 || err.response?.status === 403) {
                window.location.href = '/login';
            }
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (isDemo) {
            // Set mock data for demo mode
            setUser({ fullName: 'Demo Student', email: 'demo@smartmess.com' });
            setBookings([
                { mealType: 'Breakfast', date: new Date().toISOString().split('T')[0], bookingStatus: 'Booked' },
                { mealType: 'Dinner', date: new Date().toISOString().split('T')[0], bookingStatus: 'Booked' }
            ]);
            setAttendanceSummary({ Breakfast: 18, Lunch: 15, Dinner: 20, Total: 53 });
            setLoading(false);
        } else {
            fetchData();
        }
    }, [isDemo]);

    const handleBook = async (mealType) => {
        if (isDemo) {
            alert("This is a demo! Meal booking is simulated.");
            return;
        }
        setBookingLoading(mealType);
        try {
            const today = new Date().toISOString().split('T')[0];
            await api.post('/user/booking', {
                date: today,
                mealType
            });
            // Refresh data
            fetchData();
            alert(`${mealType} booked and attendance marked!`);
        } catch (err) {
            alert(err.response?.data?.message || `Failed to book ${mealType}`);
        } finally {
            setBookingLoading(null);
        }
    };

    const handleVote = async (mealOption) => {
        if (isDemo) {
            alert("This is a demo! Voting is simulated.");
            setMyVote(mealOption);
            return;
        }
        if (myVote) return;
        setVotingLoading(true);
        try {
            await api.post('/vote', { mealOption });

            // Trigger Confetti
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FFD54F', '#FF8A65', '#BA68C8']
            });

            setMyVote(mealOption);
            // Refresh counts
            const res = await api.get('/vote/counts');
            setVoteCounts(res.data.voteCounts || {});
        } catch (err) {
            alert(err.response?.data?.message || "Failed to vote");
        } finally {
            setVotingLoading(false);
        }
    };

    const isBooked = (mealType) => {
        const today = new Date().toISOString().split('T')[0];
        return bookings.some(b => b.mealType === mealType && b.date === today && b.bookingStatus === 'Booked');
    };

    const getVoteStats = (option) => {
        const count = voteCounts[option] || 0;
        const total = Object.values(voteCounts).reduce((a, b) => a + b, 0);
        const percent = total > 0 ? Math.round((count / total) * 100) : 0;
        return { count, percent };
    };

    if (loading) {
        return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
    }

    return (
        <div style={{ background: 'linear-gradient(135deg, #FFEBEE 0%, #F8E1F4 100%)', minHeight: '100vh', paddingBottom: '140px', position: 'relative', overflowX: 'hidden' }}>

            {/* Sidebar Component */}
            <SidebarContainer>
                <SidebarHeader>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={20} />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 'bold' }}>{user?.fullName || 'Student'}</h4>
                        <p style={{ fontSize: '0.75rem', color: '#888' }}>{user?.email || 'Student Account'}</p>
                    </div>
                </SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem icon={Users}>Community</SidebarMenuItem>
                    <SidebarMenuItem icon={CreditCard} onClick={() => window.location.href = '/payment'}>Payments</SidebarMenuItem>
                    <SidebarMenuItem icon={CreditCard}>Subscription <span style={{ marginLeft: 'auto', fontSize: '0.6rem', background: '#FFD700', padding: '2px 6px', borderRadius: '4px' }}>PRO</span></SidebarMenuItem>
                    <SidebarMenuItem icon={Settings}>Settings</SidebarMenuItem>
                    <SidebarSeparator />
                    <SidebarMenuItem icon={HelpCircle}>Help Center</SidebarMenuItem>
                    <SidebarMenuItem icon={MessageCircle}>Live Chat</SidebarMenuItem>
                    <SidebarMenuItem icon={LogOut} onClick={() => {
                        api.post('/auth/student/logout').finally(() => window.location.href = '/login');
                    }}>Sign Out</SidebarMenuItem>
                </SidebarMenu>
            </SidebarContainer>

            <div className="dashboard-container" style={{ position: 'relative', zIndex: 1 }}>

                {/* Header */}
                <div className="dashboard-header lw-slide-up lw-mobile-padding-sm" style={{ flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ flex: 1, minWidth: '280px' }}>
                        <h1 className="welcome-text" style={{ fontSize: '2rem', color: '#333', marginBottom: '4px', fontWeight: '800' }}>Welcome, {user?.fullName?.split(' ')[0] || 'Student'} 👋</h1>
                        <p className="welcome-subtext" style={{ color: '#666', fontSize: '1rem' }}>Here's your mess overview</p>
                    </div>
                    <button
                        onClick={() => setExpanded(e => !e)}
                        style={{
                            background: 'transparent', padding: '12px', cursor: 'pointer',
                            borderRadius: '50%', transition: 'background 0.2s',
                        }}
                        className="lw-btn-hover"
                    >
                        <MoreHorizontal color="#333" size={32} />
                    </button>
                </div>

                <div className="dashboard-grid">
                    {/* Left Column */}
                    <div className="lw-slide-up lw-delay-100">
                        {/* 1. Today's Meals */}
                        <div className="bento-card">
                            <h3 style={{ marginBottom: '16px', color: '#444', fontSize: '1.2rem', fontWeight: '700' }}>Today's Meals</h3>
                            <div className="meals-row">
                                <MealCard
                                    type="Breakfast"
                                    time="8:00 - 9:30 AM"
                                    booked={isBooked('Breakfast')}
                                    onBook={() => handleBook('Breakfast')}
                                    loading={bookingLoading === 'Breakfast'}
                                />
                                <MealCard
                                    type="Lunch"
                                    time="1:00 - 2:30 PM"
                                    booked={isBooked('Lunch')}
                                    onBook={() => handleBook('Lunch')}
                                    loading={bookingLoading === 'Lunch'}
                                />
                                <MealCard
                                    type="Dinner"
                                    time="8:00 - 9:30 PM"
                                    booked={isBooked('Dinner')}
                                    onBook={() => handleBook('Dinner')}
                                    loading={bookingLoading === 'Dinner'}
                                />
                            </div>
                        </div>

                        {/* 2. Attendance List (Sub-grid layout) */}
                        <div className="bento-card">
                            <h3 style={{ marginBottom: '16px', color: '#444', fontSize: '1.2rem', fontWeight: '700' }}>Attendance</h3>

                            {/* Row of stats */}
                            <div className="lw-mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '30px' }}>
                                <AttendanceBlock meal="Breakfast" status={isBooked('Breakfast') ? 'Booked' : 'Absent'} count={`${attendanceSummary.Breakfast}/31`} check={isBooked('Breakfast')} />
                                <AttendanceBlock meal="Lunch" status={isBooked('Lunch') ? 'Booked' : 'Absent'} count={`${attendanceSummary.Lunch}/31`} check={isBooked('Lunch')} />
                                <AttendanceBlock meal="Dinner" status={isBooked('Dinner') ? 'Booked' : 'Absent'} count={`${attendanceSummary.Dinner}/31`} check={isBooked('Dinner')} />
                            </div>

                            {/* Menu List */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <MenuPill icon="🥐" label="Breakfast: Tea and Bread" />
                                <MenuPill icon="🍛" label="Lunch: chole Bhature" />
                                <MenuPill icon="🥘" label="Dinner: Chole and Roti" />
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lw-slide-up lw-delay-200" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        {/* 3. Attendance Widget */}
                        <div className="bento-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                <h3 style={{ color: '#444', fontSize: '1.2rem', fontWeight: '700', margin: 0 }}>Attendance</h3>
                                <div style={{ fontSize: '0.8rem', color: '#888', background: '#F5F5F5', padding: '4px 12px', borderRadius: '20px' }}>This Month: {Math.round((attendanceSummary.Total / 93) * 100)}%</div>
                            </div>

                            <div className="attendance-info-wrap">
                                {/* Progress Bars */}
                                <div className="attendance-full-card">
                                    <ProgressRow label="Breakfast" percent={Math.round((attendanceSummary.Breakfast / 31) * 100)} color="#AED581" />
                                    <ProgressRow label="Lunch" percent={Math.round((attendanceSummary.Lunch / 31) * 100)} color="#64B5F6" />
                                    <ProgressRow label="Dinner" percent={Math.round((attendanceSummary.Dinner / 31) * 100)} color="#E57373" />
                                </div>

                                {/* Chart */}
                                <div className="circular-chart" style={{ width: '130px', height: '130px', flexShrink: 0 }}>
                                    <svg viewBox="0 0 36 36" className="circular-chart-svg">
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f5f5f5" strokeWidth="2.5" />
                                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#FFA726" strokeWidth="2.5" strokeDasharray={`${Math.round((attendanceSummary.Total / 93) * 100)}, 100`} strokeLinecap="round" />
                                    </svg>
                                    <div className="chart-overlay">
                                        <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#333' }}>{attendanceSummary.Total}/93</div>
                                        <div style={{ fontSize: '0.7rem', color: '#888', fontWeight: '600' }}>Meals</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 4. Voting Widget */}
                        <div className="bento-card">
                            <h3 style={{ color: '#444', marginBottom: '2px', fontSize: '1.2rem', fontWeight: '700' }}>Meal Voting</h3>
                            <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '16px' }}>Vote for Tomorrow's Dinner</p>

                            <VoteItem
                                name="Chole Bhature"
                                stats={getVoteStats('Chole Bhature')}
                                color="#FFD54F"
                                active={myVote === 'Chole Bhature'}
                                onClick={() => handleVote('Chole Bhature')}
                                disabled={!!myVote || votingLoading}
                            />
                            <VoteItem
                                name="Dum Aloo"
                                stats={getVoteStats('Dum Aloo')}
                                color="#FF8A65"
                                active={myVote === 'Dum Aloo'}
                                onClick={() => handleVote('Dum Aloo')}
                                disabled={!!myVote || votingLoading}
                            />
                            <VoteItem
                                name="Kadhai Paneer"
                                stats={getVoteStats('Kadhai Paneer')}
                                color="#BA68C8"
                                active={myVote === 'Kadhai Paneer'}
                                onClick={() => handleVote('Kadhai Paneer')}
                                disabled={!!myVote || votingLoading}
                            />

                            {myVote && (
                                <div style={{
                                    marginTop: '20px', padding: '12px', background: '#F0F9FF',
                                    borderRadius: '12px', color: '#0369A1', fontSize: '0.85rem',
                                    textAlign: 'center', fontWeight: '600'
                                }}>
                                    ✨ You voted for {myVote}!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Navbar isDemo={isDemo} />
        </div>
    );
};


// --- Sub Components ---

const AttendanceBlock = ({ meal, status, count, check }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ color: '#888', fontSize: '0.9rem', fontWeight: '500' }}>{meal}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#333' }}>{status}</span>
            <div style={{
                width: '20px', height: '20px', borderRadius: '50%',
                background: check ? '#81C784' : '#E57373', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem'
            }}>
                {check ? '✓' : '✖'}
            </div>
        </div>
        <div style={{ fontSize: '0.8rem', color: '#666', fontWeight: '600' }}>{count} Meals</div>
    </div>
);

const MenuPill = ({ icon, label }) => (
    <div className="menu-pill">
        <span style={{ fontSize: '1.2rem' }}>{icon}</span>
        <span style={{ fontSize: '1rem', fontWeight: '600', color: '#444' }}>{label}</span>
    </div>
);

const ProgressRow = ({ label, percent, color }) => (
    <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.8rem' }}>🍽</div>
                <span style={{ fontSize: '0.95rem', color: '#555', fontWeight: '500' }}>{label}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.8rem', color: '#AAA', fontWeight: '600' }}>✔ {percent > 0 ? percent + '%' : ''}</span>
            </div>
        </div>
        <div className="progress-track" style={{ background: '#F5F5F5' }}>
            <div className="progress-thumb" style={{ width: `${percent}%`, background: color }}></div>
        </div>
    </div>
);

const VoteItem = ({ name, stats, color, active, onClick, disabled }) => (
    <div
        className={`vote-item ${active ? 'active' : ''}`}
        onClick={!disabled ? onClick : undefined}
        style={{
            cursor: disabled ? 'default' : 'pointer',
            opacity: disabled && !active ? 0.7 : 1,
            padding: '12px',
            borderRadius: '12px',
            transition: 'all 0.2s ease',
            background: active ? `${color}15` : 'transparent',
            border: active ? `1px solid ${color}50` : '1px solid transparent',
            overflow: 'hidden'
        }}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', marginBottom: '8px' }}>
            <span style={{ fontWeight: '600', color: '#444' }}>
                {name} {active && '✨'}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#888' }}>{stats.count} Votes</span>
        </div>
        <div className="progress-bar-bg" style={{ height: '8px', background: '#F5F5F5', borderRadius: '4px', overflow: 'hidden' }}>
            <div className="progress-bar-fill" style={{
                width: `${stats.percent}%`,
                background: color,
                height: '100%',
                borderRadius: '4px',
                transition: 'width 0.5s cubic-bezier(0.1, 0.7, 1.0, 0.1)'
            }}></div>
        </div>
        <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#aaa', marginTop: '4px' }}>{stats.percent}%</div>
    </div>
);


const MealCard = ({ type, time, booked, onBook, loading }) => {
    const cardClass = `meal-status-card meal-card-${type.toLowerCase()}`;

    return (
        <div className={cardClass} style={{ display: 'flex', flexDirection: 'column', height: 'auto', minHeight: '140px' }}>
            <div style={{ flex: 1 }}>
                <h4 style={{ color: '#333', fontSize: '1.2rem', fontWeight: '700' }}>{type}</h4>
                <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '4px' }}>{time}</p>
            </div>

            <div style={{ marginTop: '16px' }}>
                {booked ? (
                    <span className="meal-badge badge-active" style={{ background: '#E8F5E9', color: '#2E7D32', border: '1px solid #C8E6C9', padding: '6px 12px', fontSize: '0.8rem', fontWeight: '700' }}>✓ Booked</span>
                ) : (
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={onBook}
                        disabled={loading}
                        style={{
                            fontSize: '0.8rem',
                            padding: '8px 16px',
                            borderRadius: '10px',
                            background: 'white',
                            color: '#333',
                            border: '1px solid #ddd',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}
                    >
                        {loading ? '...' : 'Book Now'}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default DashboardWrapper;
