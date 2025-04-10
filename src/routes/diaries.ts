import express, { Response } from 'express';
import { z } from 'zod';
import diaryService from '../services/diaryService';
import { NonSensitiveDairyEntry } from '../types';
import toNewDiaryEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitiveDairyEntry[]>) => {
    res.send(diaryService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
    const diary = diaryService.findById(Number(req.params.id));

    if (diary) {
        res.send(diary);
    }
    else {
        res.sendStatus(404);
    }
});

router.post('/', (req, res) => {
    try {

        const newDiaryEntry = toNewDiaryEntry(req.body);
        const addedEntry = diaryService.addDiary(newDiaryEntry);
        res.json(addedEntry);

    } catch (error: unknown) {

        if (error instanceof z.ZodError) {
            res.status(400).send({ error: error.issues });
        }
        else {
            res.status(400).send({ error: 'unknown error' });
        }

    }

});


export default router;