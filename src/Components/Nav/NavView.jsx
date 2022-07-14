import { Nav } from 'react-bootstrap';
import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <div>
            <Nav
                activeKey="/home"
                onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
                className="header">
                <Nav.Item>
                    <Link to="/" className="nav-link">Home</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/InterViews" className="nav-link">Tus Entrevistas</Link>
                </Nav.Item>
            </Nav>
        </div>
    );
}

export default Navigation;