const express = require('express');
const noteRoutes = require('./routes/notes');
const userRoutes = require('./routes/user');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// middlewire
app.use(express.json());
// app.use((req, res, next) => {
//     console.log(req.path, req.method);
//     next();
// })

// Enable CORS for all routes
app.use(cors());

app.use('/api/notes', noteRoutes);
app.use('/api/user', userRoutes);

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

