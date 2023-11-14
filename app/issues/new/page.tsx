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
import {ErrorMessage, Spinner} from '@/app/components';
import 'easymde/dist/easymde.min.css';

type IFormInput = z.infer<typeof issueFormSchema>

const NewIssuePage = () => {
	const router = useRouter();
	const [error, setError] = useState('');
	const [isSubmitting, setSubmitting] = useState(false);
	const { register, handleSubmit, control, formState: { errors } } = useForm<IFormInput>({
		resolver: zodResolver(issueFormSchema),
		defaultValues: {
			description: "",
			title: ""
		}
	});

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
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
				<ErrorMessage> {errors.title?.message}</ErrorMessage>
				<Controller
					name="description"
					control={control}
					render={({ field }) => (
						<SimpleMDE placeholder="Description" {...field} />
					)}
				/>
				<ErrorMessage> {errors.description?.message}</ErrorMessage>
				<Button disabled={isSubmitting}>
					Submit new issue
					{isSubmitting && <Spinner />}
				</Button>
			</form>
		</div>

	)
}

export default NewIssuePage