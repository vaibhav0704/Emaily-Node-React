import Stripe from 'stripe'
import requireLogin from '../middlewares/requirelogin.js'
import dotenv from 'dotenv'
dotenv.config()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const billingRoutes = app => {   

    app.post('/api/stripe', requireLogin, async (req, res) => {
        
        const charge = await stripe.charges.create({           
            amount: 500,
            currency: 'inr',
            source: req.body.id,
            description: '₹5 for 5 creidts',
        });

        req.user.credits += 5;
        const user = await req.user.save();
        res.send(user);
            
    })
}

export default billingRoutes