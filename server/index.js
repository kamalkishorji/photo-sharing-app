import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import {fileURLToPath} from 'url';

import postRoutes from './routes/post.js';
import userRoutes from './routes/user.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
dotenv.config();

app.use(bodyParser.json({limit:'30mb', extended : true}));
app.use(bodyParser.urlencoded({limit : '30mb', extended : true}));
app.use(cors());
app.use('/posts', postRoutes);
app.use('/user',userRoutes);
app.use(express.static(path.join(__dirname, '.', '/public')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '.', 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000 ;

mongoose.connect(process.env.CONNECTION_URL, {})
.then(()=>{
   app.listen(PORT, ()=>{
    console.log(`Listening on port :  ${PORT}`);
   });
}).catch((err)=>{
    console.log(err.message);
});





