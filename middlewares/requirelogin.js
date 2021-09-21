const requireLogin = (req, res, next) => {
    if(!req.user) {
        return res.status(401).send({ error: 'You msut log in!' })
    }
    next();
} 

export default requireLogin