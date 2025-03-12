import React from 'react'
import { Link } from 'react-router-dom';

const NavItem = ({ linkDirection, linkName }) => {
    return (
        <li className="nav-item">
            <Link className="nav-link" to={linkDirection}>{linkName}</Link>
        </li>
    )
}
export default NavItem;
