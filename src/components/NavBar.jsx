import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav
            style={{
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 24px',
                backgroundColor: '#ffffff',
                borderBottom: '1px solid #e5e7eb',
            }}
        >
            <img
                src="https://cdn2.onference.in/images/onfnewlogo.png"
                alt="Onference"
                style={{
                    height: '36px',
                    width: 'auto',
                    marginRight: '32px',
                }}
            />

            <div
                style={{
                    display: 'flex',
                    gap: '24px',
                }}
            >
                <Link
                    to="/"
                    style={{
                        textDecoration: 'none',
                        color: '#374151',
                        fontWeight: '500',
                    }}
                >
                    Home
                </Link>

                <Link
                    to="/form"
                    style={{
                        textDecoration: 'none',
                        color: '#374151',
                        fontWeight: '500',
                    }}
                >
                    Form
                </Link>
            </div>

            <a
                href="http://localhost:55555/logout/microsoft"
                style={{
                    marginLeft: 'auto',
                    textDecoration: 'none',
                    color: '#dc2626',
                    fontWeight: '500',
                }}
            >
                Logout
            </a>
        </nav>
    );
};

export default NavBar;