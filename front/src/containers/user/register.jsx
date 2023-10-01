import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import logo from "../../assets/images/logo-pharmaGard1.webp"
import { quartiers } from '../../helpers/quartier'
import { saveUser } from '../../api/user'
import { savePharmacie } from '../../api/pharmacie'

const Register = () => {
    const [position, setPosition] = useState(null)
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(null)
    const [error, setError] = useState(null)
    const [timer, setTimer] = useState(null)

    const [formDataUser, setFormDataUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        userStatus: "pharmacien"
    })

    const [formDataPharma, setFormDataPharma] = useState({
        pharmaName: "",
        quartier: "",
        address: "",
        phone: "",
        
    })

    const userHandleChange = (e) => {
        const {name, value} = e.currentTarget
        setFormDataUser((prevFormData) => ({...prevFormData, [name] : value}))
    }

    const pharmaHandleChange = (e) => {
        const {name, value} = e.currentTarget
        setFormDataPharma((prevFormData) => ({...prevFormData, [name] : value}))
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
    const getPharmacieCoords = () => {
        if(window.navigator.geolocation){
            window.navigator.geolocation.getCurrentPosition((position) => {
                let coords = {latitude: position.coords.latitude, longitude: position.coords.longitude};
                console.log(coords)
                setPosition(coords)
            },(error) =>{
                setError(error)
            })
        } else {
            setError("Veuillez activer votre géolocalisation pour la localisation de votre pharmavie !")
        }
    }

    const addOnePharmacie = (titulaireID) => {
        let dataP = {
            pharmaName: formDataPharma.pharmaName,
            quartier: formDataPharma.quartier,
            address: formDataPharma.address,
            latitude: position.latitude,
            longitude: position.longitude,
            titulaireID: titulaireID,
            phone: formDataPharma.phone
        }

        savePharmacie(dataP)
            .then((res) => {
                if(res.status === 200){
                    setError(null)
                    setMessage(res.data.message)
                    delayToRedirect()
                } else {
                    setError(res.data.message)
                }
            })
    }

    const onSubmitForm = () =>{
        saveUser(formDataUser)
            .then((resp) => {
                if(resp.status === 200){
                    addOnePharmacie(resp.data.result._id)
                }
            })
    }

    useEffect(() => {
        getPharmacieCoords()
    },[])

    
    return (<main className="main-register">
        <div className="about-pharmaGard">
            <div className="logo-container">
                <img src={logo} alt="Logo du site Pharma'Gard" loading='lazy' width="400" height="400"/>
            </div> 
            <div className="text-container">
                <h1>24H/24, 7J/7, trouver facilement la pharmacie la plus proche. </h1>
            </div>
        </div>
        <div className="register">
            {redirect && <Navigate to="/" />}
            {error !== null && <p className="errorMsg">{error}</p>}
            {message !== null && <p className="succes">{message}</p>}
            <h2>S'enregistrer</h2>
            <form 
                onSubmit={(e) =>{
                    e.preventDefault()
                    onSubmitForm()
                }}
            >
                <div className="infos-titulaire">
                    <h3>Information du titulaire</h3>
                    <input type="text" 
                        name="firstName"
                        placeholder="votre prénom"
                        required
                        onChange={userHandleChange}
                    />

                    <input type="text" 
                        name="lastName"
                        placeholder="votre nom"
                        required
                        onChange={userHandleChange}
                    />

                    <input 
                        type="email" 
                        name="email"
                        placeholder="votre address e-mail"  
                        required
                        onChange={userHandleChange}
                    />

                    <input 
                        type="password" 
                        name="password"
                        placeholder="votre mot de passe"
                        required
                        onChange={userHandleChange}
                    />

                </div>
                <div className="infos-pharmacie">
                    <h3>Information de la pharmacie</h3>
                    <input 
                        type="text" 
                        name="pharmaName"
                        placeholder="Nom de la pharmacie"
                        required
                        onChange={pharmaHandleChange}
                    />

                    <select
                        name='quartier'
                        onChange={pharmaHandleChange}
                    >
                        <option value="">quartier de votre pharmacie</option>
                        {
                            quartiers.map((quartier, index) =>{
                                return (
                                    <option key={index} value={quartier}>
                                        {quartier}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <input 
                        type="text" 
                        name='address'
                        placeholder= "L'addresse de la pharmacie"
                        required
                        onChange={pharmaHandleChange}
                    />

                    <input 
                        type="text" 
                        name="phone"
                        placeholder="Numéro téléphone de la pharmacie"
                        required
                        onChange={pharmaHandleChange}
                    />
                </div>
                <button
                    id="submit-register"
                    type="submit"
                >
                    Envoyer
                </button>
               
            </form>
        </div>
    </main> )
}

export default Register