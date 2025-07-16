const express=require ('express')
const {sendMessage,allMessage}=require("../controllers/messageController")
const {protect}=require("../middleware/authMiddleware")
const router=express.Router()
router.post('/',protect,sendMessage)
router.get('/:chatId',protect,allMessage)

module.exports=router;