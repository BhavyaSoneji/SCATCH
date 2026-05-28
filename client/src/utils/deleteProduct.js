import axios from "axios"
import notify from "../utils/notifications"
export const deleteProduct = async (productID,allProducts)=>{

    try{
        await axios.delete(`http://localhost:5000/products/delete/${productID}`,{
            withCredentials:true
        }).then((resp)=>{
            if(resp.data.status){
                allProducts.splice(productID,1);
                notify.success("Product Deleted Successfully...");
                console.log("Main",resp.data);
                return resp.data;
                
            }
        });

    }catch(err){
        console.error(err);
    }

}