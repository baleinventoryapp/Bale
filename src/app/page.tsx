'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
	const router = useRouter();

	useEffect(() => {
		// Redirect to login page
		router.push('/auth/login');
	}, [router]);

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
		</div>
	);
}
