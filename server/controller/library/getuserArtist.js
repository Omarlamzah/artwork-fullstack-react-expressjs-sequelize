
const { User, Artist } = require("../../models");

const user_with_token = async (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        include: ["usertokens"],
        where: { "$usertokens.token$": token },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const artist = await Artist.findOne({ where: { userid: user.id } });

      if (!artist) {
        resolve({
          user: user.dataValues,
          artist: "Artist not found",
        });
      } else {
        resolve({
          user: user.dataValues,
          artist: artist.dataValues,
        });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      reject(error);
    }
  });
};

module.exports = {
  user_with_token,
};
