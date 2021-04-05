import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import productAPI from "../API/index"

function Product(props) {
    const product = useFetch(()=>productAPI.getProductDetail("601cd33839a90e7c7da9b6ea"));
    const ProductView = props.view
    return (
        <ProductView product = {product}  />
    )

}

export default Product


