const express = require('express');
const app = express();
const uploadfile= require("express-fileupload");
const  acountrouter = require("./router/racount");
const  artisttrouter = require("./router/artistrouter");
const  workrouter = require("./router/workrouter");
const  homerout = require("./router/homeroute");
const commentrouter = require("./router/commentrouter");
const favoritrout =require("./router/favoritroute")
const productrout= require("./router/productroute")
const shopingroute = require("./router/productroute")

const { User} = require('./models');
const  cors = require('cors');
app.use(cors())
app.use(cors('http://localhost:8000'));

app.use( "/profile",express.static("public/profile"));
app.use("/artwork",express.static("public/artwork"))


app.use(uploadfile());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


const passport = require('passport');
const session = require('express-session');
// Add the session middleware
app.use(session({
    secret: 'davdfgvsfvgsgvbwrtgwertgertgew',
    resave: true,
    saveUninitialized: true,
}));

// Initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());






app.use("/acount",acountrouter);
app.use("/artist",artisttrouter);
app.use("/work",workrouter);
app.use("/home",homerout);
app.use("/comment",commentrouter);
app.use("/favorit",favoritrout);
app.use("/productrout",productrout);
app.use("/shoping",shopingroute);




const port = 8000;

 

 
app.get("/",async(ree,res)=>{
     const users = await User.findOrCreate({where:{firstName:"omar2",email:"mail2"}});
     res.json(users)
});


    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
      });
      
