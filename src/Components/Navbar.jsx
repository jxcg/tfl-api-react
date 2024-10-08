import '../Nav.css';
import { Link } from 'react-router-dom';
export default function Navbar() {
    
    return (
        <>
        <ul className='nav-bar'>
            <div className='nav-item-list'>
                <button><Link to="/">Home</Link></button> 
                <button><Link to="/Unified">All Lines</Link></button> 
                <button><Link to="/Search">Search</Link></button> 
            </div>
        </ul>
        </>
    )
}