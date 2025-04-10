import { z } from "zod";
import { newDiaryEntry, Visibility, Weather } from "./types";

export const tonewDiaryEntry = (object: unknown): newDiaryEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object) {
        const newEntry: newDiaryEntry = {
            weather: z.nativeEnum(Weather).parse(object.weather),
            visibility: z.nativeEnum(Visibility).parse(object.visibility),
            date: z.string().date().parse(object.date),
            comment: z.string().optional().parse(object.comment)
        };

        return newEntry;
    }

    throw new Error('Incorrect data: some fields are missing');
};
export default tonewDiaryEntry;