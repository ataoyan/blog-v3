import type { addISOWeekYears } from 'date-fns'
import type { Nav, NavItem } from '~/types/nav'
import blogConfig from '~~/blog.config'

// 图标查询：https://yesicon.app/ph
// 图标插件：https://marketplace.visualstudio.com/items?itemName=antfu.iconify

// @keep-sorted
export default defineAppConfig({
	// 将 blog.config 中的配置项复制到 appConfig，方便调用
	...blogConfig,
	
	// 主题色配置
	theme: {
		primary: '#2c8edd',
		secondary: '#357abd',
		accent: '#fae386'
	},

	article: {
		categories: <{ [category: string]: { icon: string, color?: string } }>{
			经验分享: { icon: 'iconoir:wrench', color: '#3af' },
			minecraft: { icon: 'mdi:minecraft', color: '#52a535' },
			杂谈: { icon: 'ph:chat-bold', color: '#3ba' },
			生活: { icon: 'ph:shooting-star-bold', color: '#f77' },
			代码: { icon: 'ph:code-bold', color: '#77f' },
			未分类: { icon: 'ph:folder-dotted-bold' },
		},
		tags: <{ [tag: string]: { icon: string, color?: string } }>{
			Android: { icon: 'ph:android-logo-bold', color: '#3DDC84' }, // 绿色 - Android品牌色
			AI: { icon: 'hugeicons:deepseek', color: '#9C27B0' }, // 紫色 - 人工智能的神秘感
			docker: { icon: 'mdi:docker', color: '#2496ED' }, // 蓝色 - Docker品牌色
			gerrit: { icon: 'mdi:git', color: '#F05032' }, // 红色 - Git相关
			WPF: { icon: 'cib:uikit', color: '#512BD4' }, // 深紫色 - Windows UI
			code: { icon: 'humbleicons:code', color: '#007ACC' }, // 蓝色 - 代码编辑器主题色
			mod: { icon: 'streamline-plump:module', color: '#FF6B35' }, // 橙色 - 模块化
			environment: { icon: 'tdesign:system-search', color: '#4CAF50' }, // 绿色 - 环境/生态
			deploy: { icon: 'grommet-icons:deploy', color: '#FF4081' }, // 粉红色 - 部署/发布
			wiki: { icon: 'jam:wikipedia', color: '#6366F1' }, // 靛蓝色 - 知识/文档
			'C#': { icon: 'nonicons:c-sharp-16', color: '#178600' }, // 深绿色 - C#语言
			blog: { icon: 'fa-solid:blog', color: '#FF9800' }, // 橙色 - 博客/内容
			python: { icon: 'nonicons:python-16', color: '#3776AB' }, // 蓝色 - Python品牌色
			C: { icon: 'nonicons:c-16', color: '#A8B9CC' }, // 浅灰色 - C语言
		},
		defaultCategoryIcon: 'ph:folder-bold',
		defaultTagIcon: 'ph:tag-bold',
		/** 分类排序方式，键为排序字段，值为显示名称 */
		order: {
			date: '创建日期',
			updated: '更新日期',
			title: '标题',
		},
	},

	/** 交通工具图标映射 */
	travel: {
		transportation: <{ [type: string]: { icon: string, color?: string } }>{
			高铁: { icon: 'ph:train-bold', color: '#FF6B35' },
			飞机: { icon: 'ph:airplane-takeoff-bold', color: '#007ACC' },
			自驾: { icon: 'ph:car-bold', color: '#4CAF50' },
			火车: { icon: 'ph:train-bold', color: '#9C27B0' },
			轮船: { icon: 'ph:ship-bold', color: '#2196F3' },
			公交: { icon: 'ph:bus-bold', color: '#FF9800' },
			地铁: { icon: 'ph:subway-bold', color: '#3f79b2' },
		},
	},

	content: {
		/** 代码块自动折叠触发行数 */
		codeblockCollapsibleRows: 16,
		/** 文章开头摘要 */
		excerpt: {
			animation: true,
			caret: '_',
		},
	},
	
	// @keep-sorted
	footer: {
		/** 页脚版权信息，支持 <br> 换行等 HTML 标签 */
		copyright: `© ${new Date().getFullYear()} ${blogConfig.author.name}`,
		/** 侧边栏底部图标导航 */
		iconNav: [
			{ icon: 'ph:house-bold', text: '个人主页', url: blogConfig.author.homepage },
			{ icon: 'ph:github-logo-bold', text: 'GitHub', url: 'https://github.com/ataoyan' },
			{ icon: 'ph:rss-simple-bold', text: 'Atom订阅', url: '/atom.xml' },
			{ icon: 'ph:subway-bold', text: '开往', url: 'https://www.travellings.cn/go-by-clouds.html' },
		] satisfies NavItem[],
		/** 页脚站点地图 */
		nav: [
			{
				title: '快速链接',
				items: [
					{ icon: 'ph:subway-bold', text: '开往', url: 'https://www.travellings.cn/' },
					{ icon: 'ph:envelope-simple-bold', text: '邮箱', url: `mailto:${blogConfig.author.email}` },
					{ icon: 'simple-icons:nuxtdotjs', text: '开源博客主题', url: 'https://github.com/ataoyan/blog-v3' },
				],
			},
		] satisfies Nav,
	},

	/** 侧边栏图片配置 */
	sidebarImage: {
		images: [
			{
				src: 'https://cdn.atao.cyou/Web/web_250922_093223.png',
				scale: 1
			},
			{
				src: 'https://cdn.atao.cyou/Web/web_250922_211434.png',
				scale: 1.1
			},
			{
				src: 'https://cdn.atao.cyou/Web/web_250922_213023.png',
				scale: 1.1
			},
			{
				src: 'https://cdn.atao.cyou/Web/web_250922_215322.png',
				scale: 1.1
			},
			{
				src: 'https://cdn.atao.cyou/Web/web_250922_220530.png',
				scale: 1.1
			},
			{
				src: 'https://cdn.atao.cyou/Web/web_250922_230254.png',
				scale: 1.1
			},
			{
				src: 'https://cdn.atao.cyou/Web/web_250923_085738.png',
				scale: 1.1
			},
			{
				src: 'https://cdn.atao.cyou/Web/web_250923_085739.png',
				scale: 1.1
			},
			{
				src: 'https://cdn.atao.cyou/Web/web_250923_085740.png',
				scale: 1.1
			},
			{
				src: 'https://cdn.atao.cyou/Web/web_250923_085741.png',
				scale: 1.1
			},
		],
		alt: '像素风',
		width: 240,
		height: 360, /* 调整为3:2比例，避免2:3比例显示问题 */
		enabled: true,
		carousel: {
			enabled: true,
			interval: 5000,
			showControls: true,
			showIndicators: true,
		},
	},

	/** 左侧栏顶部 Logo */
	header: {
		logo: blogConfig.favicon,
		/** 展示标题文本，否则展示纯 Logo */
		showTitle: true,
		subtitle: blogConfig.subtitle,
		emojiTail: ['📄', '🦌', '🙌', '🐟', '🏖️'],
	},

	/** 左侧栏导航 */
	nav: [
		{
			title: '',
			items: [
				{ icon: 'ph:files-bold', text: '文章', url: '/' },
				{ icon: 'ph:archive-bold', text: '归档', url: '/archive' },
				{ icon: 'ph:devices-bold', text: '装备', url: '/devices' },
				{ icon: 'flowbite:teddy-bear-outline', text: '手办', url: '/figures' },
				{ icon: 'ph:paw-print-bold', text: '宠物', url: '/pets' },
				{ icon: 'ph:airplane-takeoff-bold', text: '旅行', url: '/travels' },
				{ icon: 'ph:sparkle-bold', text: '即刻', url: '/moments' },
				{ icon: 'ph:link-bold', text: '友链', url: '/link' },
			],
		},
	] satisfies Nav,

	pagination: {
		perPage: 10,
		/** 默认排序方式，需要是 this.article.order 中的键名 */
		sortOrder: 'date' as const,
		/** 允许（普通/预览/归档）文章列表正序，开启后排序方式左侧图标可切换顺序 */
		allowAscending: false,
	},

	stats: {
		/** 归档页面每年标题对应的年龄 */
		birthYear: 1999,
		/** blog-stats widget 的预置文本 */
		wordCount: '约10万',
	},

	themes: {
		light: {
			icon: 'ph:sun-bold',
			tip: '浅色模式',
		},
		system: {
			icon: 'ph:monitor-bold',
			tip: '跟随系统',
		},
		dark: {
			icon: 'ph:moon-bold',
			tip: '深色模式',
		},
	},
})
