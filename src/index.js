const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 4000;

// basic app configs
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

//the simple routes
app.get('/', (req,res) => {

    return res.send('Hello there. The server is up.')

});

app.get('/login', async (req,res) => {

    let response;
    try{
        
        response = await axios.default.get(`https://api.instagram.com/oauth/authorize
        ?client_id="936479663836449"
        &redirect_uri="https://insta-display-api.herokuapp.com/auth/"
        &scope=user_profile,user_media
        &response_type=code`)

    }catch(err){

        return res.send(err.Error);
    };

    res.setHeader('content-type','text/html');

    return res.sendFile(response.data)

})

app.get('/auth', async (req,res) => {

    // Window will be populated from here

    console.log("request", ...req)

    return res.send("Authentication area")
    
})

// starting the server
app.listen(PORT, () => console.log(`app started on port:${PORT}`));