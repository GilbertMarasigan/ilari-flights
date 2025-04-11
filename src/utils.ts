import { z } from "zod";
import { newDiaryEntry, Visibility, Weather } from "./types";

export const newEntrySchema = z.object({
    weather: z.nativeEnum(Weather),
    visibility: z.nativeEnum(Visibility),
    date: z.string().date(),
    comment: z.string().optional()
});

export const tonewDiaryEntry = (object: unknown): newDiaryEntry => {
    return newEntrySchema.parse(object);
};
export default tonewDiaryEntry;