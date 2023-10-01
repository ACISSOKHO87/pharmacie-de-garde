import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import logo from '../../assets/images/logo-pharmaGard1.webp'
import { passwordReset } from '../../api/user'
import { Navigate } from 'react-router-dom'

const Reset = () => {

    const [formData, setFormData] = useState({ code: "", password1: "", password2: ""})
    const [redirect, setRedirect] = useState(false)
    const [timer, setTimer] = useState(null)
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        const {name, value} = e.currentTarget
        setFormData((prevFormData) => ({...prevFormData, [name] : value}))
    }

    // fonction de delay pour la redirection lorsque la modification du mot de passe a réussi
    const delayToRedirect = () => {
        if(timer !== null){
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
    
        passwordReset(formData)
            .then((res) => {
                if(res.status === 200) {
                    setError(null)
                    setMessage(res.data.message)
                    // on suprime le token dans le localStorage
                    window.localStorage.removeItem("token-code")
                    delayToRedirect()
                    
                } else {
                    setError(res.data.message)
                }
            })
            .catch((err) => {setError(err)})
    }

    return ( <main className="main-reset"> 
        <Helmet>
            <meta charSet="utf-8" />
            <title>Reset password - Pharma'Gard</title>
            <meta name="description" content="Pharma'Gard-Site officiel: modification du mot de passe de l'admin ou du pharmacien"/>
            <link rel="canonical" href="/password/reset" />
        </Helmet>
        <div className="about-pharmaGard">
            <div className="logo-container">
                <img src={logo} alt="Logo du site Pharma'Gard" loading='lazy' width="400" height="400"/>
            </div> 
            <div className="text-container">
                <h1>24H/24, 7J/7, trouver facilement la pharmacie la plus proche. </h1>
            </div>
        </div>
        <section className="reset-section">
            {redirect && <Navigate to="/login" />}
            {error !== null && <p className="errorMsg">{error}</p>}
            {message !== null && <p className="succes">{message}</p>}            
            <h2>Modifier votre mot de passe</h2>
            <div className="container-form-reset">
                <form 
                    className="container-form"
                    onSubmit={(e) =>{
                        e.preventDefault();
                        onSubmitForm();
                    }}
                >
                    <input 
                        type="text" name="code" id="code"
                        required
                        className="form-item" 
                        placeholder='Code de validation'
                        onChange={handleChange}
                    />
                    <input 
                        type="password" name="password1" id="password1" 
                        required
                        className="form-item"
                        placeholder='Nouveau mot de passe'
                        onChange={handleChange}
                    />
                    <input 
                        type="Password" name="" id="password2" 
                        required
                        className="form-item"
                        placeholder='Confirmez mot de passe'
                        onChange={handleChange}
                    />
                    <input 
                        id='submit'
                        type="submit" 
                        name="reset"
                        value="Modifier"
                    />
                </form>
            </div>
            
        </section>
    </main> )
}

export default Reset