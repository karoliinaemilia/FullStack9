/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import { calculateBmi, parseArgumentsBmiGet } from './bmiCalculator';
import { calculateExercises, parseArgumentsPost } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = parseArgumentsBmiGet(req.query);
    res.json({ weight: weight, height, bmi: calculateBmi(height, weight)});
} catch (e) {
    res.json({ error: e.message });
}
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.post('/exercises', (req: any, res) => {
  try {
    if (!req.body.daily_exercises || !req.body.target) throw new Error('parameters missing');
    const daily_exercises: string[] = req.body.daily_exercises;
    const daily_target: string = req.body.target;
    const { hours, target } = parseArgumentsPost(daily_exercises, daily_target);
    res.json(calculateExercises(hours, target));
  } catch (e) {
    res.status(400);
    res.json({ error: e.message });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});