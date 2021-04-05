import connector from "../connector";

function getProductDetail(id, options  ={}){
    return connector.get(`/api/product/${id}`);
}


export default {
    getProductDetail
}