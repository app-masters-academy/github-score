const express = require('express')
const { Octokit } = require("@octokit/rest");

const app = express()
app.use(express.json())

const octokit = new Octokit();
let name = 'Erik-Chagas'

const criarJson = (repositories, score) => {
    return {
        repos: repositories,
        totalScore: score  
    }
}

const calcularNota = (data) => {
    let score = 0
    let repositories = []
    data.forEach(element => {
        scoreUnique = ((element.stargazers_count*0.6) + (element.watchers_count*0.5) + (element.open_issues_count*0.3) + (element.forks_count*0.3))/100
        score += ((element.stargazers_count*0.6) + (element.watchers_count*0.5) + (element.open_issues_count*0.3) + (element.forks_count*0.3))/100
        repositories.push({element: element.full_name, score: scoreUnique})
    });

    return criarJson(repositories, score)
}

app.get('/:nome', async (req, res) => {
    octokit.rest.repos.listForUser({username: req.params.nome}).then(({ data }) => {
        const resposta = calcularNota(data)
        return res.status(200).json({
            resposta
        })
      })
})

app.listen(8080, () => {
    console.log(`Servidor ligado na porta 8080`)
})
