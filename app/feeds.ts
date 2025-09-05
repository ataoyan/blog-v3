import type { FeedGroup } from '~/types/feed'
import { getFavicon, getGhAvatar, getGhIcon } from './utils/img'

export default [
	{
		name: '网上邻居',
		desc: '',
		// @keep-sorted { "keys": ["date"] }
		entries: [
			{
				author: '纸鹿本鹿',
				sitenick: '纸鹿摸鱼处',
				desc: '纸鹿至麓不知路，支炉制露不止漉',
				link: 'https://blog.zhilu.site/',
				avatar: 'https://www.zhilu.site/api/avatar.png',
				tags: ['技术', '生活'],
				date: '2025-09-03',
				badgeText: '上游',
				badgeColor: '#ff4757',
				gender: 'male'
			},
		
		],
	},
] satisfies FeedGroup[]
