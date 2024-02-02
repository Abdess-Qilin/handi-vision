import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const jwtGuard = async (req, res, next) => {

    const bearer = req.headers.authorization;

    if (bearer === undefined) {
        res.status(401).send("token is missing");
        return;
    }

    if (!bearer.includes('Bearer')) {
        res.status(401).send("bad token");
        return;
    }

    const token = bearer.split(' ');
    try {
        const payload = jwt.verify(token[1], process.env.SECRET_KEY);
        const user = await User.findByPk(payload.userId);
        req.user = user;
        console.log(user)
        next();
    } catch (e) {
        res.status(401).send(e.message);
    }


}