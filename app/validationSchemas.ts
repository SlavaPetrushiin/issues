import { z } from "zod";

export const issueFormSchema = z.object({
	title: z.string().min(1, 'Title is required.').max(255, 'Max length 255 characters.'),
	description: z.string().min(1, 'Description is required.').max(65535),
});

export const patchIssueSchema = z.object({
	title: z
		.string()
		.min(1, "Title is required.")
		.max(255)
		.optional(),
	description: z
		.string()
		.min(1, "Description is required.")
		.max(65535)
		.optional(),
	assignedToUserId: z
		.string()
		.min(1, "AssignedToUserId is required.")
		.max(255)
		.optional()
		.nullable(),
});
