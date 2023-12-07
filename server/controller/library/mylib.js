const jwt = require("jsonwebtoken");
const privateKey = "your-private-key";
module.exports.generatetoken = (data) => {
    return jwt.sign(data, privateKey);
};





