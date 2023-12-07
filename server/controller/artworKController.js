const  {Artist,User,Token,Artwork,Comments,Media} =require("../models")
const fs= require("fs")
const  path =require("path")

module.exports.getartis_works= async(req, res) => {
    const {token} = req.query;
    const  user_and_artist = await user_with_token(token)
    const  artworks=         await Artwork.findAll({where:{"artistid":user_and_artist.artist.id},include:["media_of_artwork"]})
    const  commentsartwork=  await Comments.findAll({"idartwork":artworks.id})
    res.json({"user_and_artist":user_and_artist,"artworks":artworks,"commentsartwork":commentsartwork})

}
module.exports.removework= async (req,res)=>{
    const { id } = req.body;
    const work =await Artwork.findOne({where:{"id":id},include:["media_of_artwork"]});

    try {
        const worksmedia=work.dataValues.media_of_artwork;

        const result = await work.destroy({where: { "id": work.id }});
        //remove files from public
 
          console.log(worksmedia)
        worksmedia.forEach((media,index)=>{
               removefilis(path.join(__dirname,"../public/"+media.dataValues.url))
        })
        const works = await Artwork.findAll({where:{artistid:work.artistid},include:[ "comments_of_artwork","media_of_artwork"]},)

                if (works){
                    res.json(works)
                }
    } catch (error) {
        console.error("Error removing work:", error);
        console.log(error)
        res.status(500).json({ error: "Internal server error" });
    }
}
module.exports.creatwork=async (req,res)=>{

         try {
            const { token, name, desc, catego } = req.body;
            const images = req.files;
            console.log(images);

            const userAndArtist = await user_with_token(token);
            const artist = userAndArtist.artist;

            const fieldwork = await Artwork.create({
                name,
                artistid: artist.id,
                Artworkcategoriesid: catego,
                desc
            });

            const uploadPromises = Object.values(images).map(async (file, index) => {
                const picname = Date.now() + file.name;
                await uploadfile(file, path.join(__dirname, "../public/artwork/", picname));
                await Media.create({ url: "artwork/" + picname, idartwork: fieldwork.dataValues.id });
            });

            await Promise.all(uploadPromises);

            const works = await Artwork.findAll({
                where: { artistid: artist.id },
                include: ["comments_of_artwork", "media_of_artwork"]
            });

            res.json(works);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    module.exports.updateArtisprofile=async (req,res)=>{

    const {biography, photo, fivestart,token} = req.body;
    console.log({biography, photo, fivestart,token})
    const userAndArtist = await user_with_token(token);
    const user = userAndArtist.user;
    Artist.update({biography,photo,fivestart,"userid":user.id}).then(async (fieldsuser)=>{
        const works = await Artwork.findAll({where:{artistid:artist.id},include:[ "comments_of_artwork","media_of_artwork"]},)

        if (works){
            res.json(works)
        }
    }).catch((error)=>{res.status(404).json("error create artist")})
}










// get user info
async function user_with_token(token) {
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
            return {
                "user": user.dataValues,
                "artist": "Artist not found" // artist not found
            };

        }
        return {
            "user": user.dataValues,
            "artist": artist.dataValues
        };
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error; // Rethrow the error or handle it as needed
    }
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

const  removefilis =(file)=>{
            fs.unlinkSync(file)
}


