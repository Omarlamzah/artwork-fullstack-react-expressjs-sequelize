const  {Artist,User,Token,Artwork} =require("../models");
const fs =require("fs")
const path =require("path")
module.exports.getartisprofile= async (req, res) => {
    const token = req.body.token  ;
    console.log(token)
    const user_and_artist = await user_with_token(token)

    if (user_and_artist){
        res.json(user_and_artist)
    }
    else {res.send("user not found")}

} 
module.exports.removeartist= async (req,res)=>{
    const { token } = req.query;
    const userAndArtist = await user_with_token(token);
    const artist = userAndArtist.artist;

    try {
        const result = await Artist.destroy({
            where: { "id": artist.id }
        });

        res.status(200).json({ message: "Artist deleted successfully" });
    } catch (error) {
        console.error("Error removing artist:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
module.exports.creatArtisprofile=async (req,res)=>{

    const {biography, photo, fivestart,token} = req.body;
    console.log({biography, photo, fivestart,token})
    const userAndArtist = await user_with_token(token);
    const user = userAndArtist.user;
    Artist.create({biography,photo,fivestart,"userid":user.id}).then((fieldsuser)=>{
        res.status(200).json(fieldsuser)
    }).catch((error)=>{res.status(404).json("error create artist")})
}
 module.exports.updateArtistProfile = (req, res) => {
    const pic = req.files;
    var picname = "";

    const { biography, token, email, phonenumber, fullname, country, countrycode, city } = req.body;

    if (pic) {
        picname = "/profile/" + Date.now() + pic.pic.name;
        filenamefullpath = path.join(__dirname, "../public") + picname;
        uploadfile(pic.pic, filenamefullpath);
    }

    user_with_token(token).then(async (userAndArtist) => {
        // update here
        const user = userAndArtist.user;
        var userdate = "";

        if (user) {
            if (picname == "") {
                userdate = {
                    email,
                    phonenumber,
                    "firstName": fullname,
                    "lastName": "",
                    country,
                    countrycode,
                    city,
                };
            } else {
                userdate = {
                    pic: picname,
                    email,
                    phonenumber,
                    "firstName": fullname,
                    "lastName": "",
                    country,
                    countrycode,
                    city,
                };
            }

            try {
                const [userupdated] = await User.update(userdate, { where: { id: user.id } });

                if (userupdated > 0) {
                    const [artisteupdate, created] = await Artist.findOrCreate({
                        where: { userid: user.id },
                        defaults: { biography },
                    });

                    if (artisteupdate  ) {
                        // send user and artist
                        const user_and_artist = await user_with_token(token);
                              console.log(user_and_artist)
                        if (user_and_artist) {
                            res.json(user_and_artist);
                        } else {
                            res.send("user not found");
                        }
                        // send user and artist
                    }
                    else {
                        res.status(200).json("error update artist");
                    }
                }
            } catch (error) {
                res.status(500).json("Internal Server Error");
            }
        } else {
            res.status(404).json("user not exist");
        }
        // update here
    });
};
  

// art wrok 
module.exports.getworks= async (req, res) => {
    const {token } = req.body || req.query.token;

    const user_artist =await user_with_token(token)
    const artist=user_artist.artist

    if(!artist.id){return  res.status(404).json({"message ": "not found artist"})}
    const works = await Artwork.findAll({where:{artistid:artist.id},include:[ "comments_of_artwork","media_of_artwork"]},)

    if (works){
        res.json(works)
    }
    else {res.send("works not found")} 

}
//


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







