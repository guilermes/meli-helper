import 'react';
import 'react-bootstrap';


export default function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">Meli Helper</div>
            <ul className="navbar-nav">
                <li className="nav-item"><a href="/">Home</a></li>
                <li className="nav-item"><a href="/login">Login</a></li>
                <li className="nav-item"><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    )
}