import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import passport from 'passport';
import { dirname } from 'path';
import path from 'path';
import dotenv from 'dotenv'
import './models/User.js';
import './models/Survey.js'
import './services/passport.js';
import authRoutes from './routes/authRoutes.js';
import billingRoutes from './routes/billingRoutes.js';
import surveyRoutes from './routes/surveyRoutes.js'
import bodyParser from 'body-parser';

dotenv.config()

const app = express();
try {
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,   
    });
}catch(err){
    console.log(err)
}



app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [process.env.COOKIE_KEY]
    })
);

const userSchema = new mongoose.Schema()

app.use(passport.initialize());
app.use(passport.session());

// ROUTES FOR DEVELOPMENT
 
authRoutes(app);
billingRoutes(app);
surveyRoutes(app);

const __dirname = path.resolve();

// ROUTES FOR PRODUCTION

if(process.env.NODE_ENV === 'production'){

    app.use(express.static(path.join(__dirname,'client', 'build')));
    app.get('/*', function (req, res) {
       res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`the server is running on port :${PORT}`));