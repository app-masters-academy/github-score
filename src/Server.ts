import express from 'express';
import calculateScore from './App';

const app = express();

app.get('/:user', async (request, response) => {
  const { user } = request.params;
  const score = await calculateScore(user);
  response.send(score);
});

app.listen(3000);
