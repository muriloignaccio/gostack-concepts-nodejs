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

app.get('/repositories', (request, response) => response.json(repositories));

app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put('/repositories/:id', (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex((repo) => repo.id === id);

  if (repositoryIndex === -1) {
    return response.status(400).json({ error: 'Repository not found' });
  }

  const repository = {
    ...repositories[repositoryIndex],
    title,
    url,
    techs,
  };

  repositories.splice(repositoryIndex, 1, repository);

  return response.json(repository);
});

app.delete('/repositories/:id', (request, response) => {});

app.post('/repositories/:id/like', (request, response) => {});

module.exports = app;
