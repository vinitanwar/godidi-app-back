
import express from 'express';
import Question from '../models/Question.js';
import Suggestion from '../models/Suggestion.js';

const router = express.Router();



router.get('/', async (req, res) => {
    const suggestions = await Suggestion.find();
    res.render('index', { suggestions });
});

router.get('/api/questions', async (req, res) => {
    const questions = await Question.find();
    res.json(questions);
});

export default router;