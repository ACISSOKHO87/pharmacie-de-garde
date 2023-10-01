import axios from "axios";
import { config } from "../config";

// fonction de souvegarde des informations de la pharmacie
export const savePharmacie = (data) => {
    return axios.post(config.API_URL + "/api/pharmacie/save", data)
        .then((resp) => {
            return resp.data
        })
        .catch((err) => {
            return err
        })
}

export const getAllPharmacies = () =>{
    return axios.get(config.API_URL + "/api/pharmacie/all") 
        .then((resp) => {
            return resp.data
        })
        .catch((err) => {
            return err
        })
}

export const getPharmacieByTitulaireId = (id) =>{
    return axios.get(config.API_URL + `/api/pharmacie/ByTitulaire/${id}`) 
        .then((resp) => {
            return resp.data
        })
        .catch((err) => {
            return err
        })
}

export const deletePharmacieById = (id) =>{
    return axios.delete(config.API_URL + `/api/pharmacie/delete/one/${id}`) 
        .then((resp) => {
            return resp.data
        })
        .catch((err) => {
            return err
        })
}