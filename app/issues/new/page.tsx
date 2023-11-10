'use client';
import React, { useState } from 'react'
import { Button, Callout, TextField } from '@radix-ui/themes'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios';
import SimpleMDE from "react-simplemde-editor";
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { issueFormSchema } from "./../../api/issues/route"
import 'easymde/dist/easymde.min.css';

type IFormInput = z.infer<typeof issueFormSchema>

const NewIssuePage = () => {
	const router = useRouter();
	const [error, setError] = useState('');
	const { register, handleSubmit, control, formState: { errors } } = useForm<IFormInput>({
		resolver: zodResolver(issueFormSchema),
		defaultValues: {
			description: "",
			title: ""
		}
	});

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		try {
			const result = await axios.post('/api/issues/', data);

			if (result.status != 201) {
				throw new Error();
			}

			router.push('/issues');
		} catch (error) {
			setError("An unexpected error");
		}
	}

	return (
		<div className='max-w-xl space-y-5'>
			{error && (
				<Callout.Root color='red'>
					<Callout.Text>
						{error}
					</Callout.Text>
				</Callout.Root>
			)}
			<form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
				<TextField.Root>
					<TextField.Input
						placeholder="Title"
						{...register("title")}
					/>
				</TextField.Root>
				{errors.title && errors.title.message && (
					<Callout.Root color='red'>
						<Callout.Text>
							{errors.title.message}
						</Callout.Text>
					</Callout.Root>
				)}
				<Controller
					name="description"
					control={control}
					render={({ field }) => (
						<SimpleMDE placeholder="Description" {...field} />
					)}
				/>
				{errors.description && errors.description.message && (
					<Callout.Root color='red'>
						<Callout.Text>
							{errors.description.message}
						</Callout.Text>
					</Callout.Root>
				)}
				<Button>Submit new issue</Button>
			</form>
		</div>

	)
}

export default NewIssuePage