import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
    return (<div className="footer-container">
        <p>Mentions légales - <Link to="/contact">Contact</Link></p>
        <p>Copyright &copy; 2023 Pharma'Gard. All rigths reserved.</p>
    </div>)
}

export default Footer