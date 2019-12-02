import 'dotenv/config';
//import cors from 'cors';
const cors = require('cors');
//import express from 'express';
const express = require('express');
import models from './models';
import routes from './routes';

const app = express();

/* Allow CORS */
app.use(cors());

/* Supported Input Payload formats */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use('/session', routes.session);
//app.use('/users', routes.users);
//app.use('/messages', routes.messages);

app.use((req, res, next) => {
  // do something
  req.context = {
    users : models.users.users,
    messages : models.messages.messages,
    me : models.users.users[1],
  };
  next();
});

  /* Base routes */
app.get('/', (req, res) => {
    return res.send(req.context.users[req.context.me.id]);
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
  console.log("index.js");
  return res.send(Object.values(req.context.users));
});

app.get('/users/:userId', (req, res) => {
  return res.send(req.context.users[req.params.userId]);
});

app.post('/users', (req, res) => {
  return res.send('POST HTTP method on user resource');
  });
app.put('/users/:userId', (req, res) => {
  return res.send(
    `PUT HTTP method on user/${req.params.userId} resource`);
  });
app.delete('/users/:userId', (req, res) => {
  return res.send(
    `DELETE HTTP method on user/${req.params.userId} resource`);
  });


/* Message routes */
app.get('/messages', (req, res) => {
  console.log("index.js");
  return res.send(Object.values(req.context.messages));
  });
app.get('/messages/:messageId', (req, res) => {
  return res.send(req.context.messages[req.params.messageId]);
  });

app.post('/messages', (req, res) => {
const id = uuidv4();
const message = {
    id,
    text: req.body.text,
    userId: req.context.me.id,
    };

req.context.messages[id] = message;

return res.send(message);
});

app.delete('/messages/:messageId', (req, res) => {
const {
  [req.params.messageId]: message,
  ...otherMessages
} = req.context.messages;

req.context.messages = otherMessages;

return res.send(message);
});

app.get('/session', (req, res) => {
  console.log("index.js");
  return res.send(req.context.users[req.context.me.id]);
});

/* testing routes */
app.get('/test/', (req, res) => {
    res.send('Hello Secondary World!');
  });

/* listen message after start */
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
