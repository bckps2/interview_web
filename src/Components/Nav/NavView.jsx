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
                    <Link to="/Profile" className="nav-link">Profile</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/Companies" className="nav-link">Tus Entrevistas</Link>
                </Nav.Item>
            </Nav>
        </div>
    );
}

export default Navigation;