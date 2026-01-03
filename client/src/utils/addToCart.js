import axios from "axios"

export const addTocart = async(id) =>{
    console.log(id);
    const resp = await axios.get(`http://localhost:3000/users/addtocart/${id}`,{
        withCredentials:true
    })
    console.log(resp);
} 