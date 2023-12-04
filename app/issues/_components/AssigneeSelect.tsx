"use client";

import { Skeleton } from "@/app/components";
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import { useQuery } from 'react-query';
import toast, { Toaster } from 'react-hot-toast';

export const AssigneeSelect = ({issue}: {issue: Issue}) => {
	const { data: users, error, isLoading } = useQuery<User[]>({
		queryKey: ['user'],
		queryFn: () => axios.get("/api/users").then(res => res.data),
		staleTime: 60 * 1000,
		retry: 3
	});

	if (isLoading) {
		return <Skeleton />;
	}

	if (error) {
		return null;		
	}

	const assignIssue = async (userId: string) => {
		try {
			await axios.patch(
				"/api/issues/" + issue.id,
				{assignedToUserId: userId || null}
			)
		} catch (error) {
			toast.error("Changes could not be saved.");
		}
	}

	return (
		<>
			<Select.Root defaultValue="apple" onValueChange={assignIssue}>
				<Select.Trigger placeholder="Assign..." />
				<Select.Content>
					<Select.Group>
						<Select.Label>Suggestions</Select.Label>
						{users!.map(user => {
							return (
								<Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
							)
						})}
					</Select.Group>
				</Select.Content>
			</Select.Root>
		</>
	)
}
