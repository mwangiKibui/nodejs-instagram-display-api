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

app.use('/auth', async (req,res) => {

    // handle request to insta API.
    let response
    try {

        response = await axios.default.get(`https://api.instagram.com/oauth/authorize`,{
            params:{
                client_id:"936479663836449",
                redirect_uri:"https://insta-display-api.herokuapp.com/auth",
                scope:"user_profile,user_media",
                response_code:"code"
            }
        })

    }catch(error){

        console.error(`error`,error);

        return res.send(error);
    };

    console.log('response', response.data);
    return;
})

// starting the server
app.listen(PORT, () => console.log(`app started on port:${PORT}`));