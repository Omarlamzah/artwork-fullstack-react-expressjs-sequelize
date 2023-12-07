module.exports.isLoggedIn_Mid = (req, res, next) => {
    console.log(req.session);
    // Passport adds the user object to the request if the user is authenticated
    if (req.isAuthenticated()) {
        res.status(200).json({ message: 'authorized' ,sess:req.session});
        next(); // Continue to the next middleware or route handler
    } else {
        // User is not authenticated or authorized
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports.logout_Mid=(req,res)=>{

    req.session.destroy((err)=>{
        if ( err ) {
            res.status(400).json({"message":"error in logout","error":err})
        }
        else {
            res.status(200).json({"message":"user is logout"})
        }

    });

}



