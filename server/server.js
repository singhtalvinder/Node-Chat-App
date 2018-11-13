const express = require('express');
const path = require('path'); // NO need to install it as its a built-in module.

// path helps in handling directories in a very effecient manner.
const publicPath = path.join(__dirname, "../public");

const port = process.env.PORT || 3000;

var app = express();
// setup public middleware folder.
app.use(express.static(publicPath));
app.listen(port, () =>
{
    console.log(`Server started at port ${port} `);
});

