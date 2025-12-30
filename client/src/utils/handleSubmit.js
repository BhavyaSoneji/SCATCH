import {useNavigate} from 'react-router';
import axios from 'axios';

export const useHandleSubmit = () => {
    const navigate = useNavigate();
    const handleSubmit = async (e, data, value) => {
        e.preventDefault();
    if (value.toLowerCase() == "Login".toLowerCase()) {
      axios
        .post("http://localhost:3000/users/login", data, {
          withCredentials: true
        })
        .then((resp) => {
          if (resp.data.status)
            {
              console.log(resp.data.message);
              navigate('/Dashboard');
            } 
        })
        .catch((err) => {
          console.log(err.response?.data?.message || err);
        });
    } 
    else if (value.toLowerCase() == "Sign Up".toLowerCase()) {
      axios
        .post("http://localhost:3000/users/register", data, {
          withCredentials: true
        })
        .then((resp) => {
          if (resp.data.status) console.log(resp.data.message);
        })
        .catch((err) => {
          console.log(err.response?.data?.message || "Sign Up Failed..");
        });
    }
    else if(value.toLowerCase() == "Create Product".toLowerCase()){
      axios
        .post("http://localhost:3000/products/create", data, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((resp) => {
            if(resp.data.status){
                console.log(resp?.data?.message || "Product Created Sccessfully..");
                navigate('/admin/showallproucts');
            }
            else{
                console.log(resp?.data?.message || "Error Creating Product..");
            }
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response?.data?.message || "Product Creation Failed..");
        });
    }
    else if(value.toLowerCase() == "Logout".toLowerCase()){
      axios.get('http://localhost:3000/users/logout',{
        withCredentials:true
      })
      .then((resp)=>{
        if(resp.data.status){
          console.log(resp.data?.message||resp);
          navigate('/')
        }else{
          console.log("Logout Failed");
        }
      })
      .catch((err)=>{
        console.log(err);
      });
    }
    };
    
    return handleSubmit;
};