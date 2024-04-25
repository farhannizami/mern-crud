const express = require('express');
const noteRoutes = require('./routes/notes');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// middlewire
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

app.use('/api/notes', noteRoutes);

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('server running in port ', process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })

