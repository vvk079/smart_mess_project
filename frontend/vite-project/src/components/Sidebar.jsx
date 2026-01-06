import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { Home, UtensilsCrossed, Calendar, User, Settings, LogOut, Menu, X, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import "../styles/sidebar.css";

// --- Context ---
const SidebarContext = createContext(undefined);

export function SidebarProvider({ children, defaultExpanded = false }) {
    const [expanded, setExpanded] = useState(defaultExpanded);

    return (
        <SidebarContext.Provider value={{ expanded, setExpanded }}>
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    return useContext(SidebarContext);
}

// --- Components ---

export function SidebarContainer({ children }) {
    const { expanded, setExpanded } = useSidebar();

    // Close on click outside
    return (
        <AnimatePresence>
            {expanded && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="sidebar-overlay open"
                        onClick={() => setExpanded(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20, x: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20, x: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="sidebar-container"
                        style={{
                            position: 'absolute',
                            top: '70px',
                            right: '20px',
                            maxWidth: 'calc(100vw - 40px)',
                            zIndex: 1001
                        }} // Positioning relative to header
                    >
                        {children}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export function SidebarHeader({ children }) {
    return <div className="sidebar-header">{children}</div>;
}

export function SidebarMenu({ children }) {
    return <div className="sidebar-content">{children}</div>;
}

export function SidebarMenuItem({ icon: Icon, children, onClick }) {
    return (
        <div className="sidebar-item" onClick={onClick}>
            {Icon && <Icon size={20} />}
            <span style={{ fontSize: '0.95rem' }}>{children}</span>
        </div>
    );
}

export function SidebarSeparator() {
    return <div className="sidebar-separator" />;
}
