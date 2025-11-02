'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { IconPackage, IconUsers, IconChartBar } from '@tabler/icons-react';

export default function DashboardPage() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
			<div className="max-w-2xl w-full flex flex-col items-center gap-8 text-center">
				{/* Mascot */}
				<div className="relative w-64 h-64">
					<Image
						src="/mascot/welcome.png"
						alt="Welcome to Bale"
						fill
						className="object-contain"
						priority
					/>
				</div>

				{/* Welcome Message */}
				<div className="flex flex-col gap-4">
					<h1 className="text-4xl font-bold text-gray-900">
						Welcome to Bale! 🎉
					</h1>
					<p className="text-lg text-gray-600">
						Your next-generation inventory management solution is ready.
					</p>
				</div>

				{/* Coming Soon Notice */}
				<div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 w-full">
					<p className="text-sm font-medium text-blue-900 mb-2">
						🚀 More features coming soon!
					</p>
					<p className="text-sm text-blue-700">
						We're working hard to bring you analytics, reports, and advanced inventory features.
					</p>
				</div>

				{/* Quick Actions */}
				<div className="flex flex-col gap-3 w-full">
					<h2 className="text-xl font-semibold text-gray-900">
						Get Started
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{/* Add Product */}
						<Link href="/dashboard/inventory" className="group">
							<div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-primary-500 hover:shadow-lg transition-all">
								<div className="flex flex-col items-center gap-3">
									<div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-200 transition-colors">
										<IconPackage className="w-6 h-6 text-primary-600" />
									</div>
									<h3 className="font-semibold text-gray-900">Add Products</h3>
									<p className="text-sm text-gray-600">
										Start by adding your first product to inventory
									</p>
								</div>
							</div>
						</Link>

						{/* Add Staff */}
						<Link href="/dashboard/staff" className="group">
							<div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-primary-500 hover:shadow-lg transition-all">
								<div className="flex flex-col items-center gap-3">
									<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
										<IconUsers className="w-6 h-6 text-green-600" />
									</div>
									<h3 className="font-semibold text-gray-900">Invite Team</h3>
									<p className="text-sm text-gray-600">
										Add staff members to manage your inventory
									</p>
								</div>
							</div>
						</Link>

						{/* View Stock Flow */}
						<Link href="/dashboard/stock-flow" className="group">
							<div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-primary-500 hover:shadow-lg transition-all">
								<div className="flex flex-col items-center gap-3">
									<div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
										<IconChartBar className="w-6 h-6 text-purple-600" />
									</div>
									<h3 className="font-semibold text-gray-900">Stock Flow</h3>
									<p className="text-sm text-gray-600">
										Track your inventory movements
									</p>
								</div>
							</div>
						</Link>
					</div>
				</div>

				{/* Primary CTA */}
				<Link href="/dashboard/inventory" className="w-full md:w-auto">
					<Button size="lg" className="w-full md:w-auto px-8">
						<IconPackage className="w-5 h-5" />
						<span>Add Your First Product</span>
					</Button>
				</Link>
			</div>
		</div>
	);
}
