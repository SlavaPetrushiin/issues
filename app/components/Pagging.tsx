"use client";

import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

interface IPagging {
	itemCount: number;
	pageSize: number;
	currentPage: number;
}

const Pagging = ({ currentPage, itemCount, pageSize }: IPagging) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const countPage = Math.ceil(itemCount / pageSize);

	if (countPage <= 1) return null;

	const changePage = (page: number) => {
		const params = new URLSearchParams(searchParams);
		params.set('page', page.toString());
		router.push('?' + params.toString());
	}

	return (
		<Flex align="center" gap="2">
			<Text>
				Page {currentPage}  of {countPage}
			</Text>
			<Button
				variant='soft'
				color='gray'
				disabled={currentPage === 1}
				onClick={() => changePage(1)}
			>
				<DoubleArrowLeftIcon  />
			</Button>
			<Button
				variant='soft'
				color='gray'
				disabled={currentPage === 1}
				onClick={() => changePage(currentPage - 1)}
			>
				<ChevronLeftIcon />
			</Button>
			<Button
				variant='soft'
				color='gray'
				disabled={currentPage === countPage}
				onClick={() => changePage(currentPage + 1)}
			>
				<ChevronRightIcon />
			</Button>
			<Button
				variant='soft'
				color='gray'
				disabled={currentPage === countPage}
				onClick={() => changePage(countPage)}
			>
				<DoubleArrowRightIcon />
			</Button>
		</Flex>
	)
}

export default Pagging