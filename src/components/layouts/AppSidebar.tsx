'use client';

import * as React from "react"
import type { ComponentType } from 'react';
import {
	IconBuildingStore,
	IconChartBar,
	IconClipboardList,
	IconExternalLink,
	IconIdBadge2,
	IconLogout,
	IconPhotoScan,
	IconQrcode,
	IconSettings,
	IconUsers,
} from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar"

type NavItem = {
	label: string;
	href: string;
	icon: ComponentType<{ className?: string }>;
	trailingIcon?: ComponentType<{ className?: string }>;
	external?: boolean;
};

const NAV_ITEMS: NavItem[] = [
	{
		label: 'Job work',
		href: '/dashboard/job-work',
		icon: IconClipboardList,
	},
	{
		label: 'QR codes',
		href: '/dashboard/qr-codes',
		icon: IconQrcode,
	},
	{
		label: 'Partners',
		href: '/dashboard/partners',
		icon: IconUsers,
	},
	{
		label: 'Staff',
		href: '/dashboard/staff',
		icon: IconIdBadge2,
	},
	{
		label: 'Reports',
		href: '/dashboard/reports',
		icon: IconChartBar,
	},
	{
		label: 'Settings',
		href: '/dashboard/settings',
		icon: IconSettings,
	},
	{
		label: 'Online store',
		href: '/catalog',
		icon: IconBuildingStore,
	},
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const pathname = usePathname();
	const router = useRouter();
	const [isLoggingOut, setIsLoggingOut] = React.useState(false);

	const handleLogout = async () => {
		try {
			setIsLoggingOut(true);
			const supabase = createClient();
			await supabase.auth.signOut();
			router.push('/auth/login');
		} catch (error) {
			console.error('Error logging out:', error);
			setIsLoggingOut(false);
		}
	};

	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild className='p-2 h-auto'>
							<a href="#">
								<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-11 items-center justify-center rounded-lg">
									<IconPhotoScan className="size-6" />
								</div>
								<div className="flex flex-col leading-none">
									<span className="text-lg font-medium">Bale Inventory</span>
									<span className="text-sm text-gray-500">v1.0.0</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarMenu className="gap-0">
					{NAV_ITEMS.map((item) => {
						const isActive = pathname === item.href;
						const TrailingIcon = item.trailingIcon;

						return (
							<SidebarMenuItem key={item.label}>
								<SidebarMenuButton
									asChild
									isActive={isActive}
									size='lg'
									className='text-base [&>svg]:size-5 p-4 gap-3 text-gray-700'
								>
									<Link
										href={item.href}
										target={item.external ? '_blank' : undefined}
										rel={item.external ? 'noreferrer' : undefined}
										className='flex items-center rounded-none'
									>
										<item.icon />
										<span className='flex-1'>{item.label}</span>
										{TrailingIcon ? <TrailingIcon /> : null}
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						);
					})}
				</SidebarMenu>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							onClick={handleLogout}
							disabled={isLoggingOut}
							size='lg'
							className='text-base [&>svg]:size-5 p-4 gap-3 text-red-600 hover:text-red-700 hover:bg-red-50'
						>
							<IconLogout />
							<span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
