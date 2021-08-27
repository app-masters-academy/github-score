const { Octokit } = require("@octokit/rest")

const octokit = new Octokit()

module.exports = {
    getScore: async function(req, res){
    const repoScore = []
    let totalScore = 0
    const user =  await octokit.rest.repos.listForUser({
        username: req.params.username
    }).then( (data) => {
        let score = 0
        for(let i = 0; i < data.data.length; i++){
            score = 0
            score += data.data[i].stargazers_count
            score += data.data[i].watchers_count
            score = score - data.data[i].open_issues_count
            score = score * ( 1 + data.data[i].forks_count / 100)

            totalScore += score
            repoScore.push({name: data.data[i].name, score: score })
            
        }
        const json = {
            repos: repoScore,
            totalScore: totalScore
        }
        console.log(json)
        res.send(json)
    })

    res.send(user)

    }
}
