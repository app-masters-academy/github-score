import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  baseUrl: 'https://api.github.com',
});

const calculateScore = async (user: string) => {
  const { data } = await octokit.rest.repos.listForUser({
    username: user,
  });
  let totalScore = 0;

  const repos = data.map(repo => {
    return {
      name: repo.name,
      score:
        (repo.stargazers_count || 1) *
        (repo.size / 100 + repo.watchers_count - repo.open_issues),
    };
  });
  repos.map(repo => {
    totalScore += repo.score;
  });
  totalScore /= repos.length;
  console.log(totalScore);

  return { repos, totalScore };
};
export default calculateScore;
