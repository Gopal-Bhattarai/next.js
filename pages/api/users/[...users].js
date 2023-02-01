
import  {
registerUser,
getUser,
loginUser,
emailVerificationUser,
emailVerificationUserLink,
forgotPassword,
resetPassword,
updateProfile,
updateProfilePicture,} from '../../../controllers/usersController.js'

export default async function handler(req, res){
    const params = req.query.users
    console.log('...users',params);

    if(params[0]==='login') {
        await loginUser(req,res)
    }

    if(params[0]==='email') {
        await getUser(req,res)
    }

    if(params[0]==='updateprofile'){
        await updateProfile(req,res)
    }

    if(params[0]==='signup'){
        await registerUser(req,res)
    }

    if(params[0]==='emailverification'){
        await emailVerificationUser(req,res)
    }

    if(params[0]==='emailverificationLink'){
        await emailVerificationUserLink(req,res)
    }

}