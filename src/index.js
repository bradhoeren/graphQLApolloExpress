import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import uuidv4 from 'uuid/v4';

const app = express();

/* Supported Input Payload formats */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Allow CORS */
app.use(cors());

/* sample data */
let users = {
    1: {
      id: '1',
      username: 'Robin Wieruch',
    },
    2: {
      id: '2',
      username: 'Dave Davids',
    },
  };
let messages = {
    1: {
      id: '1',
      text: 'Hello World',
      userId: '1',
    },
    2: {
      id: '2',
      text: 'By World',
      userId: '2',
    },
  };

  /* Base routes */
app.get('/', (req, res) => {
    return res.send('Received a GET HTTP method');
    });
app.post('/', (req, res) => {
    return res.send('Received a POST HTTP method');
    });
app.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method');
    });
app.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method');
    });

/* User routes */
app.get('/users', (req, res) => {
    return res.send(Object.values(users));
    });
app.get('/users/:userId', (req, res) => {
    return res.send(users[req.params.userId]);
    });
app.post('/users', (req, res) => {
    return res.send('POST HTTP method on user resource');
    });
app.put('/users/:userId', (req, res) => {
    return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
    });
app.delete('/users/:userId', (req, res) => {
    return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
    });
  
/* Message routes */
app.get('/messages', (req, res) => {
    return res.send(Object.values(messages));
    });
app.get('/messages/:messageId', (req, res) => {
    return res.send(messages[req.params.messageId]);
    });

app.post('/messages', (req, res) => {
    const id = uuidv4();
    const message = {
        id,
        text: req.body.text,
        };
    messages[id] = message;
    return res.send(message);
    });


/* testing routes */
app.get('/test/', (req, res) => {
    res.send('Hello Secondary World!');
  });

/* listen message after start */
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
