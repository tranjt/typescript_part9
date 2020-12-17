import express from 'express';
import { calculateBmi } from './bmicalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    res.send({
      weight,
      height,
      bmi: calculateBmi(Number(height), Number(weight))
    });
  } else {
    res.send({
      error: "malformatted parameters"
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});