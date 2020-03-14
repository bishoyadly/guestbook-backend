require('dotenv').config();
require('./database/mongoose');
const cors = require('cors');
const express = require('express');
const app = express();
const router = require('./routes');

app.set('port', process.env.PORT);
app.use(cors());
app.use(express.json());
app.use((request, response, next) => {
    console.log(`${request.method} ${request.url}`);
    next();
});

app.use('/api/v1', router);

app.listen(app.get('port'), () => {
    console.log(`Server listens on port ${app.get('port')}`);
});
