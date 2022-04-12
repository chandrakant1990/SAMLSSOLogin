const fs =require("fs");
const passport =require("passport");
const {Strategy}=require("passport-saml");
const config=require("./config");

const savedUser=[];
console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$:","Passport authentication")

passport.serializeUser(function (user, done) {

    console.log("serializeUser:",user);
    done(null,user);
});
  
passport.deserializeUser(function (user, done) {
console.log(['passport.deserializeUser', user]);
    done(null, user);
});


passport.use(
    new Strategy({
        issuer:config.config.saml.issuer,
        protocol:"http://",
        path:"/login/callback",
        entryPoint:config.config.saml.entryPoint,
        cert:fs.readFileSync(config.config.saml.cert,"utf-8")
    },(user,done)=>{
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$:","Passport Session",savedUser);
        if(!savedUser.includes(user)){
            savedUser.push(user);
        }
        return done(null,user);
    })
)