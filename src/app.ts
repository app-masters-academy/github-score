import express, { Express, Request, Response } from 'express'
import { Octokit } from '@octokit/rest'

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(express.urlencoded({ limit: '10mb', extended: false }))
app.use(express.json())

const octokit = new Octokit({
    userAgent: 'github scores',
})

app.get('/:username', async (req: Request, res: Response): Promise<void> => {
    const { username } = req.params
    try {
        const { data } = await octokit.rest.repos.listForUser({
            username: username,
        })

        let totalScore = 0
        const scores = data.map((elem) => {
            const repoName = elem.name
            const score =
                (elem.stargazers_count || 1) *
                (elem.forks + elem.watchers_count - elem.open_issues) *
                10
            const repo = {
                name: repoName,
                score: score,
            }
            totalScore += score
            return repo
        })

        res.json({ repos: scores, totalScore: totalScore / scores.length })
    } catch (err) {
        res.json({ error: 'error' })
    }
})

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`)
})
