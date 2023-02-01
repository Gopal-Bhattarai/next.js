import {addProduct, getProduct, getProducts, updateProduct, 
    get, getPublicProduct,
    deleteProduct, uploadImages, makeDefaultImage, deleteImages, 
    getImages} 
    from '../../../controllers/productController.js'



export default function handler(req, res){
    const params = req.query.products
    console.log(params);

    if(params[0]==='public' && !params[1]) {
        get(req,res);
    }

    if(params[0] ==='public' && params[1]){
        req._id = params[1]
        getPublicProduct(req,res)
    }
    
}