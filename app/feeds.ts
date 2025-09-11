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
			{
				author: 'Luxynth',
				sitenick: 'Luxynth',
				desc: '我心匪石不可转',
				link: 'https://www.luxynth.cn',
				avatar: 'https://www.luxynth.cn/assets/images/avatar.jpg',
				tags: ['技术'],
				date: '2025-09-09',
				gender: 'male'
			},
			{
				author: '鈴奈咲桜',
				sitenick: '鈴奈咲桜のBlog',
				desc: '愛することを忘れないで',
				link: 'https://blog.sakura.ink',
				avatar: 'https://q2.qlogo.cn/headimg_dl?dst_uin=2731443459&spec=5',
				tags: ['技术'],
				date: '2025-09-09',
				gender: 'male'
			},
			{
				author: 'Almango',
				sitenick: 'Almango',
				desc: '天真永不消逝，浪漫至死不渝。',
				link: 'https://www.almango.cn/',
				avatar: 'https://www.almango.cn/img/favicon.png',
				tags: ['技术'],
				date: '2025-09-09',
				gender: 'male'
			},
			{
				author: 'kzhik',
				sitenick: "kzhik's website",
				desc: 'EXPLORE THE WORLD!',
				link: 'https://www.kzhik.cn',
				avatar: 'https://www.kzhik.cn/avatar.webp',
				tags: ['技术', '生活'],
				date: '2025-09-09',
				gender: 'male'
			},
			{
				author: '成烁',
				sitenick: "成烁BLOG",
				desc: '致一锦程 探索不停',
				link: 'https://chengshuo.top',
				avatar: 'https://chengshuo.top/usr/uploads/2025/08/1293883047.webp',
				tags: ['技术', '生活'],
				date: '2025-09-10',
				gender: 'male'
			},
			{
				author: '落尘up',
				sitenick: "落尘up",
				desc: '不止于代码与技术，更关注生活与思考。在喧嚣中落下的尘埃，亦能闪烁微光。',
				link: 'https://www.luochen.chat/',
				avatar: 'https://www.luochenup.xyz/b_a5a3aa888355bdc617dca021efb19ab8.png',
				tags: ['技术', '生活'],
				date: '2025-09-11',
				gender: 'male'
			},
			{
				author: 'HeLongaa',
				sitenick: "硅基漫游指南",
				desc: '等待和犹豫才是这个世界上最无情的杀手',
				link: 'https://blog.helong.online',
				avatar: 'https://oss.helong.online/bucket-IMG/bea2394fef15b88de49ae37707b3c1b86d7dbc2035a752ef2581a8b6cb3b2e8c.png',
				tags: ['技术', '生活'],
				date: '2025-09-11',
				gender: 'male'
			},
			{
				author: '克喵爱吃卤面',
				sitenick: "喵洛阁",
				desc: '愿你看清一切真相后，依旧热爱你的家人和朋友。',
				link: 'https://blog-v3.kemeow.top',
				avatar: 'https://img.314926.xyz/images/2025/08/13/no-background-kemiaofxjun.webp',
				tags: ['技术', '生活'],
				date: '2025-09-11',
				gender: 'male'
			},
			{
				author: 'Zixue',
				sitenick: "紫血小站",
				desc: '人山人海人来人往,自尊自爱自由自在',
				link: 'https://blog.ziyibbs.com/',
				avatar: 'https://blog.ziyibbs.com/favicon/logo.png',
				tags: ['技术', '生活'],
				date: '2025-09-11',
				gender: 'male'
			},
		],
	},
] satisfies FeedGroup[]
