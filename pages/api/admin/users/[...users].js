import { getAllUsers, getAllDeletedUsers, deleteUser, 
    deleteForceUser, restoreUser, changeRole, changeIsActive, 
    resetPassword } from "../../../../controllers/adminController.js";



export default async function handler(req, res){
    const params = req.query.users
    console.log(params);
    console.log(req.method);

    if(params[0]==='true') {
        console.log('true request');
        await getAllUsers(req,res);
    }

    if(params[0]==='false') {
        console.log('false request');
        await getAllDeletedUsers(req,res);
    }


    if(params[0]==='getall') {
        console.log('match request');
        await getAllUsers(req,res);
    }

    if(params[0]==='delete' && params[1]!=='force'){
        req.id = params[1]
        await deleteUser(req,res)
    }

    if(params[0]==='delete' && params[1]==='force'){
        req.id = params[2]
        await deleteForceUser(req,res)
    }

    if(params[0]==='restore'){
        req.id = params[1]
        await restoreUser(req,res)
    }

    if(params[0]==='rolechange'){
        req.id = params[1]
        req.role = params[2]
        await changeRole(req,res)
    }

    if(params[0]==='activechange'){
        req.id = params[1]
        req.isActive = params[2]
        await changeIsActive(req,res)
    }

    if(params[0]==='resetpassword'){
        req.id = params[1]
        await resetPassword(req,res)
    }
    
}