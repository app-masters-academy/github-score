const express = require('express')
const app = express()

app.use(express.json());

const controller = require('./controller')

app.get('/:username', (req, res) => controller.getScore(req, res))

module.exports = app

