import { Link } from 'react-router-dom';

const NavBar = () => {

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.replace("/login");
    };

    return (
        <nav style={{
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 24px',
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e5e7eb',
        }}>
            <img
                src="https://cdn2.onference.in/images/onfnewlogo.png"
                alt="Onference"
                style={{ height: '36px', marginRight: '32px' }}
            />

            <div style={{ display: 'flex', gap: '24px' }}>
                <Link to="/" style={{ textDecoration: 'none', color: '#374151', fontWeight: '500' }}>
                    Home
                </Link>

                <Link to="/form" style={{ textDecoration: 'none', color: '#374151', fontWeight: '500' }}>
                    Form
                </Link>
                <Link to="/hybrid/form" style={{ textDecoration: 'none', color: '#374151', fontWeight: '500' }}>
                    Hybrid Form
                </Link>
            </div>

            <button
                onClick={handleLogout}
                style={{
                    marginLeft: 'auto',
                    background: 'none',
                    border: 'none',
                    color: '#dc2626',
                    fontWeight: '500',
                    cursor: 'pointer',
                }}
            >
                Logout
            </button>
        </nav>
    );
};

export default NavBar;