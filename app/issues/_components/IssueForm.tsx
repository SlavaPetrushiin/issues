'use client';
import React, { useState } from 'react'
import { Button, Callout, TextField } from '@radix-ui/themes'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { issueFormSchema } from "./../../api/issues/route"
import { ErrorMessage, Spinner } from '@/app/components';
import { Issue } from '@prisma/client';
import dynamic from 'next/dynamic'
import 'easymde/dist/easymde.min.css';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

type IFormInput = z.infer<typeof issueFormSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {
	const router = useRouter();
	const [error, setError] = useState('');
	const [isSubmitting, setSubmitting] = useState(false);
	const { register, handleSubmit, control, formState: { errors } } = useForm<IFormInput>({
		resolver: zodResolver(issueFormSchema),
	});

	const onSubmit = handleSubmit(async (data) => {
		try {
			setSubmitting(true)
			const result = await axios.post('/api/issues/', data);

			if (result.status != 201) {
				throw new Error();
			}

			router.push('/issues');
		} catch (error) {
			setError("An unexpected error");
		} finally {
			setSubmitting(false);
		}
	})

	return (
		<div className='max-w-xl space-y-5'>
			{error && (
				<Callout.Root color='red'>
					<Callout.Text>
						{error}
					</Callout.Text>
				</Callout.Root>
			)}
			<form className='space-y-5' onSubmit={onSubmit}>
				<TextField.Root>
					<TextField.Input
						defaultValue={issue?.title}
						placeholder="Title"
						{...register("title")}

					/>
				</TextField.Root>
				<ErrorMessage> {errors.title?.message}</ErrorMessage>
				<Controller
					name="description"
					control={control}
					defaultValue={issue?.description}
					render={({ field }) => (
						<SimpleMDE placeholder="Description" {...field} />
					)}
				/>
				<ErrorMessage> {errors.description?.message}</ErrorMessage>
				<Button disabled={isSubmitting}>
					{issue ? "Update Issue" : "Submit new Issue"}
					{isSubmitting && <Spinner />}
				</Button>
			</form>
		</div>

	)
}

export default IssueForm