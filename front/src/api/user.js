import axios from "axios";
import { config } from "../config";
// fonction de sauvegarde d'un utilisateur (administrateur et pharmacien)
export const saveUser = (data) => {
    return axios.post(config.API_URL + "/api/user/save", data)
        .then((resp) => {
            return resp.data
        })
        .catch((err) => {
            return err
        })
}
// fonction de connexion d'un utilisateur (administrateur et/ou pharmacien)
export const connectUser = (data) => {
    return axios.post(config.API_URL + "/api/user/login", data)
        .then((resp) =>{
            return resp.data
        }) 
        .catch((err) =>{
            return err
        })
}

export const passwordForgot = (data) => {
    return axios.post(config.API_URL + '/api/user/password/forgot', data)
        .then((resp) => {
            return resp.data
        })
        .catch((err) =>{
            return err
        })
}

export const passwordReset = (data) => {
    let token_code = window.localStorage.getItem("token-code");
    return axios.put(config.API_URL + '/api/user/password/reset', data, {headers: { "x-access-token": token_code }})
        .then((resp) =>{
            return resp.data
        })
        .catch((err) => {
            return err
        })
}

export const mailFromContact = (data) => {
    return axios.post(config.API_URL + '/api/user/contact', data)
        .then((resp) =>{
            return resp.data
        })
        .catch((err) =>{
            return err
        })
}

export const checkToken = (token) =>{
    return axios.get(config.API_URL + '/api/auth/checkToken', {headers: {'x-access-token': token}})
        .then((resp) =>{
            return resp.data
        })
        .catch((err) =>{
            return err
        })
}