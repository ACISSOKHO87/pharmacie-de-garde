import React, { useState } from 'react'
import { Navigate, useParams} from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { connectUser } from '../../api/user'
import { loginUser } from '../../slices/userSlice'
import { useDispatch } from 'react-redux'
import logo from "../../assets/images/logo-pharmaGard1.webp"

const Login = () => {

    const dispatch = useDispatch()
    const params = useParams()
    const [formData, setFormData] = useState({email: "", password: ""})
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState(null)
    const [timer, setTimer] = useState(null)
    
    const handleChange = (e) => {
        const {name, value} = e.currentTarget
        setFormData((prevFormData) => ({...prevFormData, [name] : value}))
    }

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

        connectUser(formData)
            .then((resp) => {
                if(resp.status === 200){
                    setError(null)
                    window.localStorage.setItem("pharmaGard-token", resp.data.token)
                    let user = resp.data.user
                    user.token = resp.data.token
                    setMessage(resp.data.message)
                    dispatch(loginUser(user))
                    delayToRedirect()
                } else {
                    setError(resp.data.message)
                }
            })
    }

    
    return (<main className="main-login">
        <Helmet>
            <meta charSet="utf-8" />
            <title>Connexion | Pharmacie de garde à Tamba</title>
            <meta name="description" content="Login de l'administrateur ou du pharmacien - Pharmacie de garde - Site officiel"/>
            {params.status === "admin" ? <link rel="canonical" href="/login/admin" /> : <link rel="canonical" href="/login" />}   
        </Helmet>
        <div className="about-pharmaGard">
            <div className="logo-container">
                    <img src={logo} alt="Logo du site Pharma'Gard" loading='lazy' width="400" height="400"/>
                </div> 
                <div className="text-container">
                    <h1>24H/24, 7J/7, trouver facilement la pharmacie la plus proche. </h1>
                </div>
        </div>
        <section className="login-section">
            {redirect && <Navigate to="/" />}
            {error !== null && <p className="errorMsg">{error}</p>}
            {message !== null && <p className="succes">{message}</p>}
            <h2>Se connecter</h2>
            <div className="container-form-login">
                <form 
                    className="container-form"
                    onSubmit={(e) =>{
                        e.preventDefault();
                        onSubmitForm();
                    }}
                >
                    <input 
                        type="text" 
                        name='email'
                        placeholder="Votre email"
                        required
                        onChange={handleChange}
                    />
                    
                    <input 
                        type="password"
                        name='password'
                        placeholder="Votre mot de passe"
                        required
                        onChange={handleChange} 
                    />

                    <input 
                        id="submit"
                        type="submit" 
                        name="login"
                        value="Connexion"
                    />
                </form>
            </div>
            <div className="pswForget">
                <p><a href="/password/forgot">Mot de passe oublié ?</a></p>
            </div>
            {/** si l'utilisateur est un pharmacien (status === undefined): on lui suggére de s'enregistrer s'il n'a pas encore de compte d'utilisateur **/}
            {params.status !== "admin" && <div className="login-register">
                <p>Vous êtes pharmacien et vous n'avez pas encore de compte ? <strong><a href="/register">Inscrivez-vous</a></strong></p>
            </div>}
        </section> 
    </main>)
}

export default Login