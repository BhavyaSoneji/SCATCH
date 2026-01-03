import axios from "axios"

export const fetchCartProducts = async()=>{
    try{
        const resp = await axios.get('http://localhost:3000/users/cart',{
          withCredentials:true
        });
        console.log(resp.data.cart);
        return resp.data.cart || [];
    }catch(err){
        console.log(err);
    }
}

