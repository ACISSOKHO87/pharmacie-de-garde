import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { selectUser } from '../slices/userSlice'

const Header = () => {
 
    const [showMenu, setShowMenu] = useState(false)
    const user = useSelector(selectUser);

    return (
        <header>
            <div className="nav-container"> 
                <div id="menu">
                    <Link
                        onClick={() =>{
                            setShowMenu(!showMenu)
                        }}
                    > 
                        <FontAwesomeIcon icon={showMenu ? faXmark : faBars} className="fontawesome"/>
                        {showMenu ? <p>FERMER</p>: <p>MENU</p>}
                    </Link>
                </div>
                <nav className={showMenu ? "nav-barres toggle" : "nav-barres"} 
                    onClick={() =>{
                        setShowMenu(false)
                    }}
                >
                    {
                        user.isLogged ? <div>
                            <ul>
                                <li>
                                    <Link to="/"
                                        onClick={() =>{
                                            setShowMenu(false)
                                        }}
                                    >Accueil</Link>
                                </li>
                                {user.infos.userStatus === "admin" ? <li>
                                    <Link to="/admin"
                                        onClick={() =>{
                                            setShowMenu(false)
                                        }}
                                    >Admin</Link>
                                </li> : <li>
                                    <Link to="/profil"
                                        onClick={() =>{
                                            setShowMenu(false)
                                        }}
                                    >Profil</Link>
                                </li>}
                                <li>
                                    <Link to="/logout"
                                        onClick={() =>{
                                            setShowMenu(false)
                                        }}
                                    >Logout</Link>
                                </li>
                            </ul>
                        </div>: <div>
                            <ul>
                                <li>
                                    <Link to="/"
                                        onClick={() =>{
                                            setShowMenu(false)
                                        }}
                                    >Accueil</Link>
                                </li>
                                <li>
                                    <Link to="/login/admin"
                                        onClick={() =>{
                                            setShowMenu(false)
                                        }}
                                    >Administrateur</Link>
                                </li>
                                <li>
                                    <Link to="/login"
                                        onClick={() =>{
                                            setShowMenu(false)
                                        }}
                                    >Pharmacien</Link>
                                </li>
                            </ul>
                        </div>
                    }
                </nav>
            </div>
        </header>
    )
}

export default Header