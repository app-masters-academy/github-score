import express from 'express'
import { Octokit } from '@octokit/rest'

const octokit = new Octokit()
const app = express()

app.use(express.json())

function calcScore(repos) {
  const scoreObj = {
    repos: [],
    totalScore: 0
  }
  for (const repo of repos) {
    const score =
      (repo.stargazers_count || 1) *
      (repo.forks + repo.watchers_count - repo.open_issues)
    scoreObj.totalScore += score
    scoreObj.repos.push({ name: repo.name, score })
  }
  return scoreObj
}

app.get('/:user', (request, response, next) => {
  const { user } = request.params
  octokit.rest.repos
    .listForUser({ username: user })
    .then(res => {
      return response.status(200).json(calcScore(res.data))
    })
    .catch(err => {
      response.status(500).json({ err: 'Something went wrong' })
      console.log(err)
    })
})

app.listen(4600, console.log('Running'))
