import express from 'express';
import { calculateBmi } from './bmicalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

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

app.post('/api/exercises', (req, res) => {
  // eslint-disable-next-line 
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.json({
      error: "parameters missing"
    });
  }
  // eslint-disable-next-line   
  const daily_exercises_values = daily_exercises.map((v: any) => Number(v));
  // eslint-disable-next-line 
  if (daily_exercises_values.some(isNaN) || isNaN(Number(target))) {
    return res.json({
      error: "malformatted parameters"
    });
  }

  return res.json(calculateExercises(daily_exercises_values, Number(target)));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});