import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
})

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile);
            const existingUser = await User.findOne({ googleId: profile.id })                
            if (existingUser){
            return done(null, existingUser);
            }            
            const user = await new User({ googleId: profile.id })
                .save();
                done(null, user);           
        }
    )
);

export default passport;