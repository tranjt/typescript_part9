import express from 'express';
import diagnosService from '../service/diagnosService';


const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosService.getDiagnoses());
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnose!');
});

export default router;