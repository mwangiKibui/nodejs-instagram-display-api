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

    res.setHeader('title','Insta display API');

    return res.send('Hello there. The server is up.');

});

app.get('/login', (req,res) => {

    // we are loading another external link

    return res.redirect(`https://api.instagram.com/oauth/authorize
    ?client_id=936479663836449
    &redirect_uri=https://insta-display-api.herokuapp.com/auth/
    &scope=user_profile,user_media
    &response_type=code`);

})

app.get('/auth', async (req,res) => {

    let {code} = req.query;

    // get an access token.
    let response;

    try {

        response = await axios.default.post(`https://api.instagram.com/oauth/access_token`,{
            client_id:"936479663836449",
            client_secret:"3fc090507c00ee23c854bc696e2898b9",
            redirect_uri:"https://insta-display-api.herokuapp.com/auth/",
            code
        });

    }catch(error){
        
        console.error(error.Error);

        res.send("error occurred");
    };

    res.setHeader('title','access-token');

    return res.send.json(response.data);
});

// starting the server
app.listen(PORT, () => console.log(`app started on port:${PORT}`));