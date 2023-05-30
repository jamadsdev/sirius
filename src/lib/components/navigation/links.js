export const menuLinks = [
	{
		id: 'docs',
		title: 'Guides',
		list: [
			{ href: '/docs/howto', label: 'How to Use' },
			{ href: '/docs/wxc', label: 'Webex Calling' },
			{ href: '/docs/wxcc', label: 'Webex Contact Center' },
			{ href: '/docs/ooobot', label: 'Out of Office', badge: 'Coming Soon' }
		]
	},
	{
		id: 'wxc_admin',
		title: 'Administration',
		list: [
			{ href: '/wxc/locations', label: 'Locations' },
			{ href: '/wxc/schedules', label: 'Schedules' },
			{ href: '/wxc/autoattendants', label: 'Auto Attendants' }
		]
	},
	{
		id: 'wxc_userpref',
		title: 'User Settings',
		list: [
			{ href: '/wxc/vmpinreset', label: 'VM PIN Reset' },
			{ href: '/wxc/cfwd', label: 'Call Forward All' },
			{ href: '/wxc/vm2em', label: 'Voicemail to Email' },
			{ href: '/wxc/hoteling', label: 'Hoteling' },
			{ href: '/wxc/bulk', label: 'Bulk' }
		]
	},
	{
		id: 'wxcc',
		title: 'Webex Contact Center',
		list: [
			{ href: '/wxcc/addressbooks', label: 'Address Book' },
			{ href: '/wxcc/agents', label: 'Agents' },
			{ href: '/wxcc/audio', label: 'Audio Files' }
		]
	}
];
