const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");


const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validateID(request, response, next) {

  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: "Invalid Repositories ID." })
  }
  return next();
}

function validateRepositories(request, response, next) {

  const { id } = request.params;

  const reposIndex = repositories.findIndex(repos => repos.id === id)

  if (reposIndex < 0) {

    return response.status(400).json({ error: "Repository not found." })

  }

  return next();

}

app.use('/repositories/:id', validateID, validateRepositories);

app.get("/repositories", (request, response) => {

  return response.json(repositories);

});

app.post("/repositories", (request, response) => {

  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository);

  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {

  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repository = repositories.find(repos => repos.id === id);

  repository.title = title;
  repository.url = url;
  repository.techs = techs;

  return response.json(repositorygit);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const reposIndex = repositories.findIndex(repos => repos.id === id);

  repositories.splice(reposIndex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {

  const { id } = request.params;

  const repository = repositories.find(repos => repos.id === id);

  repository.likes++;

  return response.json(repository);

});

module.exports = app;
