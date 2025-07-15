const { registerUser,authUser,allUsers}=require("../controllers/userController")
const express=require('express')
const {protect} =require ("../middleware/authMiddleware")
const router = express.Router(); 
router.post('/',registerUser);
router.get('/',protect,allUsers);
router.post('/login',authUser);

module.exports=router;