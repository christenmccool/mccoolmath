import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

/** NavBar component for McCool Math app
 * Provides a link to homepage
 */
const NavBar = () => {
    return (
        <div className="NavBar">
            <NavLink to="/" className="NavBar-link">McCool Math</NavLink>
        </div>
    )
}

export default NavBar;