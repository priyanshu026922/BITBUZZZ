const User=require("../db/userSchema");
const generateToken=require("../config/generateToken");

const registerUser=async(req,res)=>{
    const {name,email,password,pic}=req.body;

    if(!name||!email||!password){
        res.status(400);
        return res.json({
           message: "Please Enter all the fields"
        })
    }



try{
    const userExists=await User.findOne({email});
    if(userExists){

        res.status(400);
         return res.json({
           message: "User Already Exists"
        })
    }

    const newuser=await User.create({
        name,
        email,password,
        pic,
    });

    if(newuser){
        res.status(201).json({
            _id:newuser._id,
            name:newuser.name,
            email:newuser.email,
            pic:newuser.pic,
            token:generateToken(newuser._id),
        });
    }else{
          res.status(400);
         return res.json({
           message: "Cannot register User"
        })
    }
}catch(e){
    console.log(e.message)
}

}


const authUser=async (req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(user&&(await user.matchPassword(password))){
         res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id),
    })} else{
        res.status(401);
        return res.json({
           message: "Invalid credentials"
        })
    }
}

const allUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
};

module.exports = {
  registerUser,
  authUser,
  allUsers
};