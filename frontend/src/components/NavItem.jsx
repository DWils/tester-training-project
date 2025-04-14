import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const NavItem = ({ linkDirection, linkName }) => {
    return (
        <li className="nav-item">
            <Link className="nav-link" to={linkDirection}>{linkName}</Link>
        </li>
    )
}
export default NavItem;
