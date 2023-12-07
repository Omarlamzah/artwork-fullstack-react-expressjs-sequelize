const {   Artwork, Comments } = require("../models");
const {user_with_token} =require("../controller/library/getuserArtist")

module.exports = {
    addComment: async (req, res) => {
        try {
            const { token, idArtwork, commentText } = req.body;
            console.log(req.body)

            // Check if the user exists based on the token
            const userWithToken = await user_with_token(token);

            if (!userWithToken.user) {
                return res.status(404).json({ error: "User not found" });
            }

            const userId = userWithToken.user.id;
            console.log(userId)

            // Check if the artwork exists
            const artwork = await Artwork.findByPk(idArtwork);
            if (!artwork) {
                return res.status(404).json({ error: "Artwork not found" });
            }

            // Create a new comment
            const comment = await Comments.create({
                userid: userId,
                idartwork:idArtwork,
                txt: commentText,
            });

            res.status(201).json(comment);
        } catch (error) {
            console.error("Error adding comment:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    getComments: async (req, res) => {
        try {
            // Implement code to fetch all comments
            const comments = await Comments.findAll({where:{idartwork: req.body.artworkid}});
            res.status(200).json(comments);
        } catch (error) {
            console.error("Error fetching comments:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    updateComment: async (req, res) => {
        try {
            const commentId = req.body.id;
            const updatedText = req.body.updatedText;
    
            console.log("Request Body:", req.body);
    
            // Check if the comment exists
            const comment = await Comments.findByPk(commentId);
            console.log("Existing Comment:", comment);
    
            if (!comment) {
                return res.status(404).json({ error: "Comment not found" });
            }
    
            // Update the comment text
            const [numUpdated, updatedComments] = await Comments.update(
                { txt: updatedText },
                { where: { id: req.body.id } }
            );
    
            console.log("Num Updated:", numUpdated);
            console.log("Updated Comments:", updatedComments);
    
            if (numUpdated > 0) {
                const comment = await Comments.findByPk(commentId);
                return res.status(200).json({comment, message: "Comment updated successfully" });
            } else {
                return res.status(404).json({ error: "Comment not updated" });
            }
        } catch (error) {
            console.error("Error updating comment:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    

    removeComment: async (req, res) => {
        try {
            const commentId = req.body.commentId;
            console.log(req.body)
            console.log("2222222222222222222222222222222222")
            console.log(req.body)

            // Check if the comment exists
            const comment = await Comments.findByPk(commentId);
            if (!comment) {
                return res.status(404).json({ error: "Comment not found" });
            }

            // Delete the comment
            await Comments.destroy({ where: { id: commentId } });

            res.status(204).end(); // No content
        } catch (error) {
            console.error("Error removing comment:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
};
