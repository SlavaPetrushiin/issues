"use client"
import React, { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

const QueryProvider = (props: PropsWithChildren) => {
	return (
		<QueryClientProvider client={queryClient} >
			{props.children }
		</QueryClientProvider>
	)
}

export default QueryProvider