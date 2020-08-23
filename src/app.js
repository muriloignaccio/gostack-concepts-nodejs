const express = require('express');
const cors = require('cors');

const { v4: uuid } = require('uuid');
const { isUuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const validateRepositoryId = (request, response, next) => {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid repository ID' });
  }

  return next();
};

app.use('/repositories/:id', validateRepositoryId);

const repositories = [];

app.get('/repositories', (request, response) => {});

app.post('/repositories', (request, response) => {});

app.put('/repositories/:id', (request, response) => {});

app.delete('/repositories/:id', (request, response) => {});

app.post('/repositories/:id/like', (request, response) => {});

module.exports = app;
