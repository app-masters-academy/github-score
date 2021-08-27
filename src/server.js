const { Octokit } = require("@octokit/rest");

const express = require("express");

const app = express();
const octokit = new Octokit();

app.use(express.json());

async function getReposFromUser(username) {
  const newRepositories = [];
  const repositories = await octokit.rest.repos.listForUser({
    username,
  });

  let stars = 0;

  for (const { name, stargazers_count: star, language } of repositories.data) {
    newRepositories.push({
      name,
      star,
      language,
    });

    if (star) {
      stars += star;
    }
  }

  return {
    repos: newRepositories,
    totalScore: stars,
  };
}

app.get("/:username", async (request, response) => {
  const username = request.params.username;

  return response.json(await getReposFromUser(username));
});

app.listen(3333, () => console.log("> Listening"));
