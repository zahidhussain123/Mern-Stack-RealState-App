import axios from "axios"
import dayjs from "dayjs"
import {toast} from "react-toastify"

export const api = axios.create({
    baseURL: "http://localhost:5000/api"
})

export const getAllProperties = async () => {
 try {
 const response  = await api.get("/residency/residency");
 if(response.status ===400 || response.status === 500 ){
    throw response.data
 } 
 return response.data   
 } catch (error) {
    toast.error("Something went wrong!")
    throw error
 }
}

export const getSingleProperty = async (id) => {
 try {
 const response  = await api.get(`/residency/${id}`);
 if(response.status ===400 || response.status === 500 ){
    throw response.data
 } 
 return response.data   
 } catch (error) {
    toast.error("Something went wrong!")
    throw error
 }
}