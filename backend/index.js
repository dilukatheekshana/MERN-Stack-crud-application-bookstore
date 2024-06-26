import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js'; 
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

//Middleware for handling Cros Policy
// option 1: allow all origins with defalt of cors(*)
app.use(cors());
// option 2: allow custom origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to MERN Stack')
});

app.use('/books',  booksRoute);

mongoose
.connect(mongoDBURL)
.then(() => {
    console.log('App connected to Database');
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    });
})
.catch((error) => {
    console.log(error);
});