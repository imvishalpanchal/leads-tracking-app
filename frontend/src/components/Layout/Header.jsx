import { useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, PlusCircle, LogOut } from 'lucide-react';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token');

    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
    }, [navigate]);

    return (
        <header className="page-header">
            <Link to="/" className="flex items-center gap-2">
                <div className="logo-icon-box">
                    <LayoutDashboard size={24} />
                </div>
                <h1>LeadTracker Pro</h1>
            </Link>
            {token && (
                <nav className="flex gap-2">
                    {location.pathname !== '/' && (
                        <Link to="/" className="btn btn-secondary">
                            <Users size={18} /> Leads
                        </Link>
                    )}
                    <Link to="/leads/create" className="btn btn-primary">
                        <PlusCircle size={18} /> New Lead
                    </Link>
                    <button onClick={handleLogout} className="btn btn-danger">
                        <LogOut size={18} /> Logout
                    </button>
                </nav>
            )}
        </header>
    );
};

export default Header;
