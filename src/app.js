const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  return res.json(repositories);
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repository);

  return res.json(repository);
});

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params
  const { title, url, techs } = req.body;

  const repositoryExist = repositories.find(repository => repository.id === id);

  if (!repositoryExist) {
    return res.status(400).json({ error: 'repository not exists!' });
  }

  const repository = { id, title, url, techs, likes: 0 };

  repositories[repositoryExist] = repository;

  return res.json(repository);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params

  const repository = repositories.find(repository => repository.id === id);

  if (!repository) {
    return res.status(400).json({ error: 'repository not exists!' });
  }

  repositories.splice(repository);

  return res.status(204).send();

});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;

  const repository = repositories.find(repository => repository.id === id);

  if (!repository) {
    return res.status(400).json({ error: 'repository not exists!' });
  }

  repository.likes += 1;

  return res.json(repository);
});

module.exports = app;
