import diaryData from '../../data/entries';

import { newDiaryEntry, DiaryEntry, NonSensitiveDairyEntry } from '../types';

const diaries: DiaryEntry[] = diaryData;

const addDiary = (entry: newDiaryEntry): DiaryEntry => {

    const newDiaryEntry = {
        id: Math.max(...diaries.map(d => d.id)) + 1,
        ...entry
    };

    diaries.push(newDiaryEntry);
    return newDiaryEntry;
};

const getEntries = (): DiaryEntry[] => {
    return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDairyEntry[] => {
    return diaries.map(({ id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility
    }));
};

const findById = (id: number): DiaryEntry | undefined => {
    const entry = diaries.find(d => d.id === id);
    return entry;
};

export default {
    getEntries,
    addDiary,
    getNonSensitiveEntries,
    findById
};