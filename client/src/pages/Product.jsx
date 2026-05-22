import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { useAuth } from '../context/AuthContext';

const Product = () => {
    const [product, setProduct] = useState(null);
    const id = useParams('id');

    useEffect(()=>{
        const fetchProduct = async ()=>{
            const tempProduct = await axios.get(`http://localhost:5000/products/${id.id}`,{
                withCredentials:true
            });
            console.log(tempProduct);
        }
        fetchProduct();
    },[])
  return (
    <div>Product</div>
  )
}

export default Product