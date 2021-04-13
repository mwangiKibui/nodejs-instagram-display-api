const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

// basic app configs
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

//the simple routes
app.use('/', (req,res) => {
    return res.send('Hello there. The server is up.')
});

// starting the server
app.listen(PORT, () => console.log(`app started on port:${PORT}`));