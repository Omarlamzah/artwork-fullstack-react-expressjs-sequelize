 const  {Artist,User,Token,Artwork ,Subscribe} =require("../models");
const  Op =require("sequelize").Op
const fs =require("fs")
const path =require("path")
const  transportergmail = require("./library/transportergmail")
const handbars = require("handlebars")
 module.exports.getallusers= async(req,res)=>{
    const offset = req.query.offset; 
    const PAGE_SIZE=req.query.pagesize
     const users  =  await User.findAll({attributes:["email"] ,
        offset,
        limit: PAGE_SIZE,
      });

      res.json({users})
 }
 


// art wrok
module.exports.getworks= async (req, res) => {
    console.log(req.body)
    const PAGE_SIZE=3
    const {  token, keyword } = req.body;
   const   idcateg=parseInt(req.body.idcateg)
    const   page=req.body.page || 1

    const offset = (page - 1) * PAGE_SIZE;
    

    const user_artist =await user_with_token(token)
    console.log(user_artist)
    const artist=user_artist.artist
    const user=user_artist.user

    if(!artist.id){return  res.status(404).json({"message ": "not found artist"})}
    if(req.body.keyword==="all" || keyword==="" ){
        const works = await Artwork.findAll({
            include: ["media_of_artwork","comments_of_artwork"],
            offset,
            limit: PAGE_SIZE,
          });
                  if (works){

            res.json(works)
        }
        else {res.send("works not found")}    
   
   
    }
    else{
    
        const works = await Artwork.findAll({
            where: { name:{[Op.like]:`%${keyword}%`}, Artworkcategoriesid: idcateg },
            include: ["media_of_artwork","comments_of_artwork"],
            offset,
            limit: PAGE_SIZE,
          });
                  if (works){
            res.json(works)
        }
        else {res.send("works not found")} 
    }   

   

}
//


module.exports.posttonotification = async (req, res) => {
    const { istomail, istowebsite, emailadress, message } = req.body;
    const file = req.files.fileuplad;
    console.log(file);
    const filename = Date.now() + "_" + file.name;
  
    uploadfile(file, path.join(__dirname, "../public/attachment/" + filename)).then(() => {
      try {
        const readhtml = fs.readFileSync(path.join(__dirname, "../public/attachment/emailtemplate/html.html"), 'utf-8');
        const htmlhandbars = handbars.compile(readhtml);
        const replacements = {
          msg: message,
          "srcimg": path.join(__dirname, "../public/attachment/" + filename),
        };
        const htmltosend = htmlhandbars(replacements);
  
        const mailOptions = {
          from: 'omarlamzah64@gmail.com',
          to: emailadress,
          subject: "Notification for You",
          html: htmltosend,
          attachments: [
            {
              filename: file.name,
              path: path.join(__dirname, "../public/attachment/" + filename),
            },
          ],
        };
  
        transportergmail.sendMail(mailOptions, (error, info) => {
          if (error) {
            res.status(404).json(error);
            console.log(error);
          } else {
            res.status(200).json({ "message": "'Email sent:'" + info.response });
            console.log('Email sent:', info.response); 
          }
        });
      } catch (error) {
        console.error("Error reading or compiling the HTML template:", error);
        res.status(500).json({ "error": "Internal Server Error" });
      }
    });
  };




  module.exports.subscribe=(req,res)=>{
    const {email}= req.body
    console.log(req.body);
    Subscribe.create({email}).then(()=>{
      res.json({message: "Subscribe successfully created"})
    })
  }

  module.exports.contactus=(req,res)=>{
    const {email,name,message}= req.body.data
    
   try {
    transportergmail.sendMail({
      from:"omarlamzah64@gmail.com",
      to: email,
      subject: "message from contact us",
      text:message
      
},(()=>{
  res.json({message:"thanks fro contacting us"})
}))
   } catch (error) {
    res.json({message:error})

   }
    
  }

 

// Assuming you're inside an async function or using top-level await
async function user_with_token(token) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                include: ["usertokens"],
                where: { "$usertokens.token$": token }
            });
            if (!user) {
                throw new Error("User not found");
            }
            const artist = await Artist.findOne({ where: { "userid": user.id } });
            if (!artist) {
                resolve({
                    "user": user.dataValues,
                    "artist": "Artist not found" // artist not found
                });
            } else {
                resolve({
                    "user": user.dataValues,
                    "artist": artist.dataValues
                });
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            reject(error); // Reject with the error
        }
    });
}

const uploadfile = async (file, des) => {
    return new Promise((resolve, reject) => {
        file.mv(des, (error) => {
            if (error) {
                console.error("Error uploading file:", error);
                reject(error);
            } else {
                console.log("File uploaded successfully");
                resolve();
            }
        });
    });
};







