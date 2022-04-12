const config={
    saml:{
        cert:"./config/saml.pem",
        entryPoint:"https://trial-8392846.okta.com/app/trial-8392846_demoapp_1/exkpgan4gwR2lworZ696/sso/saml",
        issuer:"http://localhost:3000",
        options:{
            failureRedirect:"/login",
            failureFlash:true
        }
    },
    session:{
        resave:false,
        secret:"ChintuCBT",
        saveUninitialized:true
    }
}

module.exports={
    config  
}