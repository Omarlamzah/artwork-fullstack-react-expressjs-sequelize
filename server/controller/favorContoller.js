const  {Artist,User,Favorites} =require("../models");
 

 
module.exports = {
    createFavorite: async (req, res) => {
        try {
            const { token, favoriteId } = req.body;

            const { user } = await user_with_token(token);
            const userId = user.id;

            const favorite = await Favorites.create({ UserId: userId, favoriteId });
            res.status(201).json(favorite);
        } catch (error) {
            console.error("Error creating favorite:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    getFavoritesByToken: async (req, res) => {
        try {
            const { token } = req.body;
 
            const { user } = await user_with_token(token);
            const userId = user.id;

            const favorites = await Favorites.findAll({ where: { UserId: userId } });
            res.status(200).json(favorites);
        } catch (error) {
            console.error("Error fetching favorites:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    updateFavoriteByToken: async (req, res) => {
        try {
            const { token, favoriteId, newFavoriteId } = req.body;

            const { user } = await user_with_token(token);
            const userId = user.id;

            const [rowsUpdated, [updatedFavorite]] = await Favorites.update(
                { favoriteId: newFavoriteId },
                { where: { UserId: userId, favoriteId }, returning: true }
            );

            if (rowsUpdated === 0) {
                throw new Error("Favorite not found");
            }

            res.status(200).json(updatedFavorite);
        } catch (error) {
            console.error("Error updating favorite:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    deleteFavoriteByToken: async (req, res) => {
        try {
            const { token, favoriteId } = req.body;

            const { user } = await user_with_token(token);
            const userId = user.id;

            const deletedCount = await Favorites.destroy({ where: { UserId: userId, favoriteId } });

            if (deletedCount === 0) {
                throw new Error("Favorite not found");
            }

            res.status(200).json({ message: "Favorite deleted successfully" });
        } catch (error) {
            console.error("Error deleting favorite:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
};


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







