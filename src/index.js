import { Octokit } from "@octokit/rest";

const octokit = new Octokit();

(async () => {
  const newRepositories = [];
  const repositories = await octokit.rest.repos.listForUser({
    username: "hallexcosta",
  });

  let stars = 0;

  for (const { name, stargazers_count: star } of repositories.data) {
    newRepositories.push({
      name,
      star,
    });

    if (star) {
      stars += star;
    }
  }

  console.log({
    repos: newRepositories,
    stars,
  });
})();
