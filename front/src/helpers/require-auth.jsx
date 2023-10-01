import React, { useState, useEffect} from "react";
import { Navigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginUser, selectUser } from '../slices/userSlice'
import { loadPharmacies } from "../slices/pharmacieSlice";
import { getAllPharmacies } from "../api/pharmacie";
import { checkToken } from "../api/user";
const RequireAuth = (props) => {

    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    const params = useParams()

    const Child = props.child

    const [redirect, setRedirect] = useState(false)


    // chargment des component
    useEffect(() =>{
        // on vérifie si le user n'est pas connecté
        if(user.isLogged === false) {
            // on récupére le token dans le localStorage
            let token = window.localStorage.getItem("pharmaGard-token")
            // si le token n'existe pas et que la route est protégée, on fait une redirection
            if(token === null && props.auth ) {
                    // redirection à "true"
                    setRedirect(true) // on fait une redirection vers login
            } else { // sinon
                // on vérifie si le token est valide
                checkToken(token)
                    .then((resp) => {
                        // si le token existe pas (status !== 200)
                        if(resp.status === 200) {
                            let myUser = resp.data.user;
                            myUser.token = token
                            dispatch(loginUser(myUser))
                        }
                    })
                    .catch((err) =>{
                        console.log("erreur-auth: ", err)
                    })

                getAllPharmacies()
                    .then((res) =>{
                        if(res.status === 200){
                            dispatch(loadPharmacies(res.data.pharmacies))
                        }
                    })
            }
            
        } 
    }, [])

    if (redirect) {
        return <Navigate to="/login" />;
    }
    return <Child {...props} params={params} />;
}

export default RequireAuth