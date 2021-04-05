import React from 'react'

function ProductView(props) {

    const {product} = props;
    
    return (
        <div>
            {product.loading &&
                <p>Loading</p>
            }
            {!product.loading && product.data &&
                <>
                    <h3>{product.data?.name}</h3>
                    <b>{product.data?.price?.regular}</b>
                </>
            }
        </div>
    )

}

export default ProductView
