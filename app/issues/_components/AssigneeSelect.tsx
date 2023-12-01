"use client";

import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const AssigneeSelect = () => {
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		async function fetchUsers() {
			try {
				let {data} = await axios.get<User[]>("/api/users");
				setUsers(data)
			} catch (error) {
				console.error(error);
			}
		}

		fetchUsers()
	}, [])

	return (
		<Select.Root defaultValue="apple" >
			<Select.Trigger placeholder="Assign..." />
			<Select.Content>
				<Select.Group>
					<Select.Label>Suggestions</Select.Label>
					{users.map(user => {
						return (
							<Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
						)
					})}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	)
}