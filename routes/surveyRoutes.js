import mongoose from 'mongoose';
import requireLogin from '../middlewares/requirelogin.js'
import requireCredits from '../middlewares/requireCredits.js'
import Mailer from '../services/Mailer.js';
import { template } from '../services/emailTemplates/surveyTemplate.js';

const Survey = mongoose.model('surveys')

const surveyRoutes = app => {
    app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()            
        }) 

        const mailer = new Mailer(survey, template(survey));
        mailer.send();
    })
}

export default surveyRoutes;