import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    console.log("routes/session.js");
    return res.send(req.context.users[req.context.me.id]);
});

export default router;