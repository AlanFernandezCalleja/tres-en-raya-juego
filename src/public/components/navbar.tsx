

export function Navbar() {
    return (
        <nav className="navbar">
            <h1 className="nav-title">My App</h1>
            <ul className="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;