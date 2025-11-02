import { Link, NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header className="topbar">
            <nav className="nav">
                <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
                    Home
                </NavLink>
                <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>
                    About
                </NavLink>
            </nav>
        </header>
    );
}
