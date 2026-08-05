import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { useAuth } from '../context/AuthContext';

const Product = () => {
    const [product, setProduct] = useState(null);
    const id = useParams('id');

    return (
    <div></div>
  )
}

export default Product