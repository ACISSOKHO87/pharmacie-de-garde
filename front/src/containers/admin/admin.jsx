import React from 'react'
import { Helmet } from 'react-helmet-async'
import logo from "../../assets/images/logo-pharmaGard1.webp"
const Admin = () => {
    return (<main className="main-admin">
        <Helmet>
            <meta charSet="utf-8" />
            <title>Admin | Pharmacie de garde à Tamba</title>
            <meta name="description" content="Page admin de la Pharmacie de garde, destinée aux administrateurs du site. Pharmacie de garde - Site officiel"/>
            <link rel="canonical" href="/admin" />
        </Helmet>
        <div className="about-pharmaGard">
            <div className="logo-container">
                <img src={logo} alt="Logo du site Pharma'Gard" loading='lazy' width="400" height="400"/>
            </div> 
            <div className="text-container">
                <h1>24H/24, 7J/7, trouver facilement la pharmacie la plus proche. </h1>
            </div>
        </div>
        <div className="admin">
            <h2>Administration</h2>
        </div>
    </main>)
}

export default Admin