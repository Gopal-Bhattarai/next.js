import User from "../models/users.js";
import sgMail from '@sendgrid/mail'

//sendgrid's API Key
sgMail.setApiKey(process.env.SGMAIL_API);

//List out all users from Users collection
const getAllUsers = (async (req,res) => {
  try {
    const users = await User.find ({ deletedAt: null})
    const count = users.length;
    res.status(200).json({users: {rows: users, count: count}})
  } catch (error) {
      console.log(error.message);
      res.status(500).json({ status: 'Internal Server Error'})
  }
  });
  
  //List out all users from Users collection
  const getAllDeletedUsers = (async (req,res) => {
    try {
      const users = await User.find ({ deletedAt : {$ne: null} })
      const count = users.length;
      res.status(200).json({users: {rows: users, count: count}})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: 'Error: No deleted data found'})
    }
    });
  
  //Soft delete a user
  const deleteUser = (async (req, res)=>{
      const id = req.id;
      console.log('soft_delete', id);
      try {
        const user = await User.findOne({_id: id});
        user.deletedAt = Date.now()
        user.isActive = false
        user.save();
        res.status(200).send({ status: "User deleted!", user });
      } catch (err) {
        console.log(err, ">>>>>>>>>>>> error");
        res.status(400).send({ status: "error deleting user data!" });
      }
  });
  
  //hard delete
  const deleteForceUser = (async (req, res)=>{
    const id = req.id;
    console.log('force_delete', id);
    try {
      const user = await User.deleteOne({_id: id});
      res.status(200).send({ status: "User permanently deleted!", user });
    } catch (err) {
      console.log(err, ">>>>>>>>>>>> error");
      res.status(400).send({ status: "error deleting user data!" });
    }
  });
  
  //restore softdeleted user
  const restoreUser = (async (req, res)=>{
    const id = req.id;
    console.log('Restore_user', id);
    try {
      const user = await User.findOne({_id: id});
        user.deletedAt = null
        user.isActive = true
        await user.save();
      res.status(200).send({ status: "User restored", user });
    } catch (err) {
      console.log(err, ">>>>>>>>>>>> error");
      res.status(400).send({ status: "error deleting user data!" });
    }
  });

//role change from User to Admin
const changeRole =  (async (req, res) => {
    const id = req.id;
    const role = req.role;
    try {
        const user = await User.findOne({ _id: id});
        user.role = role;
        user.save();
        res.status(200).send({ status: "User role is changed!", user });
      } catch (err) {
        console.log(err, ">>>>>>>>>>>> error");
        res.status(400).send({ status: "error deleting user data!" });
      }
})

//Reset Password for any user
const resetPassword =  (async (req, res) => {
  const id = req.id;
  console.log('reset_password',id);
  const password = req.body.password;
  try {
      const user = await User.findOne({ _id: id});
      user.password = password;
      user.save();
      res.status(200).send({ status: "User's password changed!", user });
    } catch (err) {
      console.log(err, ">>>>>>>>>>>> error");
      res.status(400).send({ status: "error resetting password!" });
    }
})

//isActive change "true" or "false", false for login disabled
const changeIsActive = (async (req, res)=>{
    const id = req.id;
    const isActive = req.isActive;
    try {
        const user = await User.findOne({ _id: id});
        user.isActive = isActive;
        user.save();
        res.status(200).send({ status: "User status is changed!", user });
      } catch (err) {
        console.log(err, ">>>>>>>>>>>> error");
        res.status(400).send({ status: "error deleting user data!" });
      }
})

export {getAllUsers, getAllDeletedUsers, deleteUser, deleteForceUser, restoreUser, changeRole, changeIsActive, resetPassword}
