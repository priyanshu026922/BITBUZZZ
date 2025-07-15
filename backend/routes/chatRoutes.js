const express=require("express");
const router=express.Router();
const {protect}=require("../middleware/authMiddleware")
const {accessChat,fetchChats,creategroupChat,renameGroup,addGroup,removeFromGroup}=require("../controllers/chatController")
router.route('/').post(protect,accessChat);
router.route('/').get(protect,fetchChats);
router.route("/group").post(protect,creategroupChat);
router.route("/rename").put(protect,renameGroup);
router.route("/groupRemove").put(protect,removeFromGroup);
router.route("/group-add").put(protect,addGroup);

module.exports=router;