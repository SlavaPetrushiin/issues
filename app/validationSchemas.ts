import { z } from "zod";

export const issueFormSchema = z.object({
	title: z.string().min(1, 'Title is required.').max(255, 'Max length 255 characters.'),
	description: z.string().min(1, 'Description is required.'),
});
