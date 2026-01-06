import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, ArrowRight, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react';
import Button from '../components/Button';
import '../styles/lightswind.css';
import '../styles/landing_overrides.css';

const Landing = () => {
    const navigate = useNavigate();

    // Intersection Observer for scroll animations
    const observerRef = useRef(null);
    useEffect(() => {
        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-trigger');
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => observerRef.current.observe(el));

        return () => observerRef.current.disconnect();
    }, []);

    return (
        <div style={{ fontFamily: 'var(--font-family)', background: '#FAF9F6', overflowX: 'hidden' }}>

            {/* Navbar */}
            <nav style={{
                padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                position: 'fixed', top: 0, width: '100%', zIndex: 100, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ background: 'var(--col-primary)', padding: '6px', borderRadius: '8px', color: 'white' }}>
                        <ChefHat size={20} />
                    </div>
                    <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#333' }}>SmartMess</span>
                </div>
                <div>
                    <Button variant="ghost" className="lw-shimmer-hover" onClick={() => navigate('/login')}>Login</Button>
                    <Button variant="primary" onClick={() => navigate('/register')}>Get Started</Button>
                </div>
            </nav>

            {/* SECTION 1: HERO */}
            <section style={{
                minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '140px 20px 80px', position: 'relative',
                background: 'linear-gradient(135deg, #FFF0F5 0%, #ffe5ea 100%)'
            }}>
                <div style={{ maxWidth: '1280px', width: '100%', display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '80px', alignItems: 'center' }}>

                    {/* Left: Text */}
                    <div className="lw-slide-up" style={{ zIndex: 2 }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px',
                            background: 'white', borderRadius: '30px', color: '#D81B60', fontSize: '0.9rem', fontWeight: '700', marginBottom: '24px',
                            boxShadow: '0 4px 12px rgba(216, 27, 96, 0.1)'
                        }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#D81B60' }}></span>
                            Smart Hostel Mess Management
                        </div>
                        <h1 style={{
                            fontSize: '5.5rem', lineHeight: '1.05', marginBottom: '24px',
                            color: '#1a1a1a', letterSpacing: '-0.02em', fontWeight: '900'
                        }}>
                            Your Entire <br />Mess Life. <br /><span style={{ color: 'var(--col-primary)', textDecoration: 'underline', textDecorationColor: '#FFB7C5', textDecorationThickness: '6px' }}>Simplified.</span>
                        </h1>
                        <p style={{ fontSize: '1.35rem', color: '#555', marginBottom: '40px', lineHeight: '1.6', maxWidth: '550px', fontWeight: '500' }}>
                            Stop carrying cash and coupons. Keep track of your meals, attendance, and menu in seconds.
                        </p>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <Button variant="primary" style={{ padding: '16px 36px', fontSize: '1.1rem', borderRadius: '40px' }} onClick={() => navigate('/register')}>
                                Get Started
                            </Button>
                            <Button variant="outline" className="lw-shimmer" style={{ padding: '16px 36px', fontSize: '1.1rem', borderRadius: '40px', background: 'white', border: '1px solid #eee' }} onClick={() => navigate('/dashboard')}>
                                View Demo
                            </Button>
                        </div>
                    </div>

                    {/* Right: Mockup Image */}
                    <div className="lw-slide-right lw-delay-200" style={{ position: 'relative' }}>
                        <img
                            src="/dashboard-mockup-real.png"
                            alt="SmartMess Dashboard"
                            style={{
                                width: '100%', borderRadius: '24px',
                                boxShadow: '0 40px 80px rgba(0,0,0,0.12)',
                                transform: 'perspective(1000px) rotateY(-5deg) rotateX(2deg)',
                                transition: 'transform 0.5s ease'
                            }}
                            className="hero-mockup"
                        />

                        {/* Decorative Blob */}
                        <div style={{
                            position: 'absolute', top: '-15%', right: '-15%', width: '400px', height: '400px',
                            background: 'radial-gradient(circle, #ffcbd1 0%, rgba(255,255,255,0) 70%)', zIndex: -1, opacity: 0.5
                        }}></div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: DASHBOARD PREVIEW */}
            <section style={{ padding: '100px 20px', background: '#FFF0F5' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 className="animate-on-scroll lw-fade-in" style={{ fontSize: '3.5rem', marginBottom: '16px', fontWeight: '800' }}>Your Mess, In Your Pocket.</h2>
                        <p className="animate-on-scroll lw-fade-in lw-delay-100" style={{ color: '#777', fontSize: '1.4rem' }}>Everything a student needs, just one tap away.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
                        <WidgetCard title="Live Menu" icon="🍕" delay="0">
                            Check what's cooking in real-time. Rated by students.
                        </WidgetCard>
                        <WidgetCard title="Digital Attendance" icon="📱" delay="100">
                            Mark presence with a QR scan. No more registers.
                        </WidgetCard>
                        <WidgetCard title="Meal Voting" icon="🗳️" delay="200">
                            Vote for Sunday specials. Democracy in dining.
                        </WidgetCard>
                    </div>
                </div>
            </section>

            {/* SECTION 3: PROBLEM SOLUTION */}
            <section style={{ padding: '120px 20px', background: '#fff' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '80px', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                        <h2 className="animate-on-scroll lw-slide-up" style={{ fontSize: '3rem', marginBottom: '40px', lineHeight: '1.1', fontWeight: '800' }}>
                            From Mess Chaos to <span style={{ color: 'var(--col-primary)' }}>Clarity.</span>
                        </h2>

                        <StepItem number="1" title="The Problem" text="Food wastage, manual registers, and unhappy students." />
                        <StepItem number="2" title="The Solution" text="SmartMess brings everything online. Efficient and transparent." />
                        <StepItem number="3" title="The Result" text="30% less food waste and 100% happy feedback." />
                    </div>

                    <div className="animate-on-scroll lw-scale-in" style={{ flex: 1 }}>
                        <div style={{ background: '#FAF9F6', padding: '50px', borderRadius: '40px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px' }}>
                                <TrendingUp size={48} color="var(--col-success)" />
                                <div>
                                    <h4 style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>Efficiency Up</h4>
                                    <p style={{ color: '#888', fontSize: '1.1rem' }}>By 45% this month</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                                <ShieldCheck size={48} color="var(--col-primary)" />
                                <div>
                                    <h4 style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>Zero Errors</h4>
                                    <p style={{ color: '#888', fontSize: '1.1rem' }}>In attendance logging</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer style={{ padding: '80px 20px', background: '#FAFAFA', borderTop: '1px solid #eee', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '24px', opacity: 0.6 }}>
                    <ChefHat size={32} />
                    <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>SmartMess</span>
                </div>
                <p style={{ color: '#999', fontSize: '1rem' }}>&copy; 2026 SmartMess Project. Built for hostels with ❤️.</p>
            </footer>

            <style>{`
                .animate-trigger.lw-slide-up { animation: lwSlideUp 0.8s forwards; }
                .animate-trigger.lw-fade-in { animation: lwFadeIn 1s forwards; }
                .animate-trigger.lw-scale-in { animation: lwScaleIn 0.6s forwards; }
                .hero-mockup:hover { transform: translateY(0) rotate(0) !important; }
            `}</style>
        </div>
    );
};

const WidgetCard = ({ title, icon, children, delay }) => (
    <div className="animate-on-scroll lw-slide-up" style={{
        background: 'white', padding: '40px', borderRadius: '30px',
        boxShadow: '0 15px 40px rgba(0,0,0,0.06)', animationDelay: `${delay}ms`
    }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '24px' }}>{icon}</div>
        <h3 style={{ marginBottom: '12px', fontSize: '1.5rem', fontWeight: '700' }}>{title}</h3>
        <p style={{ color: '#888', lineHeight: '1.6', fontSize: '1.1rem' }}>{children}</p>
    </div>
);

const StepItem = ({ number, title, text }) => (
    <div className="animate-on-scroll lw-slide-up" style={{ display: 'flex', gap: '24px', marginBottom: '40px' }}>
        <div style={{
            width: '50px', height: '50px', borderRadius: '50%', background: 'var(--col-lavender)', fontSize: '1.2rem',
            color: 'var(--col-primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0
        }}>
            {number}
        </div>
        <div>
            <h4 style={{ fontSize: '1.3rem', marginBottom: '8px', fontWeight: '700' }}>{title}</h4>
            <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: '1.6' }}>{text}</p>
        </div>
    </div>
);

export default Landing;
