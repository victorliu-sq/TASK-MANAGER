const express = require('express');
const bodyParser = require('body-parser');
const task = require('./routes/api/task');
const cors = require('cors');
const path = require('path');

const { urlencoded } = require('body-parser');

const app = express()

app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use('/api/task', task);

//handle production
if (process.env.NODE_ENV === 'production') {
    //Static folder
    app.use(express.static(__dirname + '/public/'));

    //Handle SPA
    app.get('*', (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server runs successfully on PORT:${port}`));

