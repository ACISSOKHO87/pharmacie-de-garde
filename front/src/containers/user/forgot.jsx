import React, { useState, useEffect} from 'react'
import logo from "../../assets/images/logo-pharmaGard1.webp"
import { passwordForgot } from '../../api/user'
import { Helmet } from 'react-helmet-async'
import { Navigate } from 'react-router-dom'

const Forgot = () => {
    const [formData, setFormData] = useState({ email: "", email2: ""})
    const [redirect, setRedirect] = useState(false)
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)
    const [timer, setTimer] = useState(null)
    // state digit code pour la modification du Psw
    const [digitCode, setDigitCode] = useState(0)

    const handleChange = (e) => {
        const {name, value} = e.currentTarget
        setFormData((prevFormData) => ({...prevFormData, [name] : value}))
    }

    // fonction pour la génération d'un nombre entier aléatoire compris entre les arguments min et max inclus
    const getRandomInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const delayToRedirect = () => {
        if(timer !== null) {
            setTimer(clearTimeout(timer))
            setMessage(null)
            setError(null)
        } else {
            setTimer(setTimeout(() => {
                setRedirect(true)
            }, 2000)) 
        }
    }
    
    const onSubmitForm = () => {
        if(formData.email !== formData.email2){
            setError("Les emails ne sont différents, veuillez saisir des emails identiques")
        } else {
            let data = {
                email: formData.email,
                digit: digitCode
            }
            passwordForgot(data)
                .then((resp) => {
                    if(resp.status === 200){
                        window.localStorage.setItem("token-code", resp.token)
                        setMessage(resp.data.message)
                        delayToRedirect()
                    } else {
                        setError(resp.data.message)
                    }
                })
        }
    }

    
    useEffect(() => {
        setDigitCode((digit) => getRandomInteger(0, 9999))
    },[])
    
    return (<main className="main-forgot">
        <Helmet>
            <meta charSet="utf-8" />
            <title>Pharmacie de garde à Tamba</title>
            <meta name="description" content=" Mot de passe oublié ? envoie du mail pour le changement du mot de passe administrateur - Pharmacie de garde Tamba"/>
            <link rel="canonical" href="/password/forgot" />            
        </Helmet>        
        <div className="about-pharmaGard">
            <div className="logo-container">
                <img src={logo} alt="Logo du site Pharma'Gard" loading='lazy' width="400" height="400"/>
            </div> 
            <div className="text-container">
                <h1>24H/24, 7J/7, trouver facilement la pharmacie la plus proche. </h1>
            </div>
        </div>
        <section className="forgot-section">
            {redirect && <Navigate to="/password/reset" />}
            {error !== null && <p className="errorMsg">{error}</p>}
            {message !== null && <p className="succes">{message}</p>}
            <h2>Mot de passe oublié</h2>
            <div className="container-form-forgot">
                <form 
                    className="container-form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        onSubmitForm()
                    }}
                >
                
                    <input 
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="form-item"
                        placeholder="votre email"
                        onChange={handleChange}
                    />

                    <input 
                        type="email"
                        id="email2"
                        name="email2"
                        required
                        className="form-item"
                        placeholder="confirmez votre email"
                        onChange={handleChange}
                    />
                    <input 
                        id='submit'
                        type="submit" 
                        name="forgot"
                        required
                        value="Réinitialiser votre mot de passe"
                    />
                </form>
            </div>
        </section>
    </main>)
}

export default Forgot