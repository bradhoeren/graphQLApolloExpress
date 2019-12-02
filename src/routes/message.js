import uuidv4 from 'uuid/v4';
import { Router } from 'express';

const router = Router();

/* Message routes */
router.get('/', (req, res) => {
    console.log("routes/message.js");
    return res.send(Object.values(req.context.messages));
    });
router.get('/:messageId', (req, res) => {
    return res.send(req.context.messages[req.params.messageId]);
    });

router.post('/', (req, res) => {
  const id = uuidv4();
  const message = {
      id,
      text: req.body.text,
      userId: req.context.me.id,
      };

  req.context.messages[id] = message;

  return res.send(message);
  });

router.delete('/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = req.context.messages;

  req.context.messages = otherMessages;
  
  return res.send(message);
  });


export default router;