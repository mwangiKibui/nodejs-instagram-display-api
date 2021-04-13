const axios = require('axios');

async function Authenticate(){
    
    try{
        
        await axios.default.get(`https://api.instagram.com/oauth/authorize
        ?client_id="936479663836449"
        &redirect_uri="https://insta-display-api.herokuapp.com/auth"
        &scope=user_profile,user_media
        &response_type=code`)

    }catch(err){
        console.error(err);
    };

};

Authenticate();