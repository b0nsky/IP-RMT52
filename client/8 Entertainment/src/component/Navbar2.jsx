import '../App.css';
import { Link, useNavigate } from 'react-router-dom';

function Navbar2() {
    const navigate = useNavigate();

    const handleUserLogout = () => {
        localStorage.removeItem("access_token");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <img
                    src="https://cdn.you.com/youagent-images/dalle3/db70868d-f961-4162-87f2-4a3c872c12d0.png"
                    alt="8 Entertainment"
                    height={60}
                />
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/categories">
                                Categories
                            </Link>
                        </li>
                    </ul>
                    <button 
                        className="btn btn-outline-danger ms-auto" 
                        type="button" 
                        onClick={handleUserLogout}
                    > 
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar2;
