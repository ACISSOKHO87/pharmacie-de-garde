import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import logo from '../assets/images/logo-pharmaGard1.webp'
import { mailFromContact } from '../api/user'
import { Navigate } from 'react-router-dom'
const Contact = () => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    })

    const [redirect, setRedirect] = useState(false)
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)
    const [timer, setTimer] = useState(null)

    const handleChange = (e) => {
        const {name, value} = e.currentTarget
        setFormData((prevFormData) => ({...prevFormData, [name] : value}))
    }

    const delayToRedirect = () => {
        if(timer !== null) {
            setTimer(clearTimeout(timer))
            setError(null)
            setMessage(null)
        }else {
            setTimer(setTimeout(() => {
                setRedirect(true)
            }, 2000)) 
        }
    }
    const onSubmitForm = () => {
        let data = {
            title: `${formData.firstName} ${formData.lastName}`,
            subject: formData.subject,
            message: `${formData.message}   <br/> email:  ${ formData.email }  <br/> phone:  ${ formData.phone } `
        }
        mailFromContact(data)
            .then((res) =>{
                if(res.status === 200){
                    setMessage(res.data.message)
                    delayToRedirect()
                }
            })
            .catch((err) =>{
                console.log(err)
                setError("Erreur envoie mail. Veuillez réessayer!")
            })
    }

    return (<main className="main-contact">
        <Helmet>
            <meta charSet="utf-8" />
            <title>Contact | Pharmacie de garde à Tamba</title>
            <meta name="description" content="Page contact de la Pharmacie de garde. Permet de nous contacter par mail. Pharmacie de garde - Site officiel"/>
            <link rel="canonical" href="/contact" />
        </Helmet>
        <div className="about-pharmaGard">
            <div className="logo-container">
                <img src={logo} alt="Logo du site Pharma'Gard" loading='lazy' width="400" height="400"/>
            </div> 
            <div className="text-container">
                <h1>24H/24, 7J/7, trouver facilement la pharmacie la plus proche. </h1>
            </div>
        </div>
        <div className="contact">
            {redirect && <Navigate to="/" />}
            {error !== null && <p className="errorMsg">{error}</p>}
            {message !== null && <p className="succes">{message}</p>}
            <h2>Nous contacter</h2>
            <form
                className="container-form"
                onSubmit={(e) =>{
                    e.preventDefault();
                    onSubmitForm();
                }}
            >
                <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" required
                    placeholder="votre prenom"
                    onChange={handleChange} 
                />

                <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" required
                    placeholder="votre nom"
                    onChange={handleChange} 
                />

                <input 
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="fc.plateau@exemple.com"
                    onChange={handleChange} 
                />

                <input 
                    type="text" 
                    id="phone" 
                    name="phone"
                    placeholder="votre numéro de téléphone"
                    onChange={handleChange} 
                />

                <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    required
                    className="full"
                    placeholder="Objet "
                    onChange={handleChange} 
                />

                <textarea maxLength="5000" rows="10" name="message" className="full" id="message" placeholder="votre message..."
                    onChange={handleChange} 
                >

                </textarea>

                <button
                    id="submit-contact"
                    type="submit"
                >
                    Envoyer
                </button>
            </form>
        </div>
    </main>
    
)
}

export default Contact