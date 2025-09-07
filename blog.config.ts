import type { NitroConfig } from 'nitropack'
import type { FeedEntry } from './app/types/feed'
import redirectList from './redirects.json'
import { faIR } from 'date-fns/locale'

export { zhCN as dateLocale } from 'date-fns/locale/zh-CN'

// 存储 nuxt.config 和 app.config 共用的配置
// 此处为启动时需要的配置，启动后可变配置位于 app/app.config.ts
const blogConfig = {
	title: 'ATao-Blog',
	subtitle: '做自己喜欢的事',
	// 长 description 利好于 SEO
	description: '这有关于个人开发相关的经验和分享，还有一些日常生活的分享。',
	headerConfig: {
		defaultTag: '自动化工程师',
		hoverTag: '摸鱼大人',
		hoverSubtitle: '爱自己喜欢的人💖'
	},
	author: {
		name: 'ATao',
		avatar: 'https://cdn.taonotespace.com/Web/Avatar.png',
		email: 'qiatao0305@163.com',
		homepage: 'https://atao.cyou',
	},
	copyright: {
		abbr: 'CC BY-NC-SA 4.0',
		name: '署名-非商业性使用-相同方式共享 4.0 国际',
		url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans',
	},
	favicon: 'https://cdn.taonotespace.com/Web/Avatar.png',
	language: 'zh-CN',
	timeEstablished: '2024-11-16',
	timezone: 'Asia/Shanghai',
	url: 'https://taonotespace.com',

	defaultCategory: ['未分类'],

	feed: {
		limit: 50,
	},

	// 在 URL 中隐藏的路径前缀
	hideContentPrefixes: ['/posts'],

	imageDomains: [
		// 自动启用本域名的 Nuxt Image
		// 'www.zhilu.site',
		// '7.isyangs.cn',
		'cdn.taonotespace.com',
	],

	// 禁止搜索引擎收录的路径
	robotsNotIndex: ['/preview', '/previews/*'],

	scripts: [
		// 自己部署的 Umami 统计服务
		{ 'src': 'http://120.55.98.102:2222/script.js', 'data-website-id': 'db0898e0-ffdf-498b-93c7-b061a789904e', 'defer': true },
		// 自己网站的 Cloudflare Insights 统计服务
		{ 'src': 'https://static.cloudflareinsights.com/beacon.min.js', 'data-cf-beacon': '{"token": "97a4fe32ed8240ac8284e9bffaf03962"}', 'defer': true },
		// Twikoo 评论系统依赖
		{ src: 'https://imgcache.qq.com/qcloud/cloudbase-js-sdk/1.3.3/cloudbase.full.js', defer: true },
		// Twikoo 评论系统
		{ src: 'https://lib.baomitu.com/twikoo/1.6.44/twikoo.min.js', defer: true },
	],

	// 自己部署的 Twikoo 服务
	twikoo: {
		envId: 'https://twikoo.taonotespace.com',
		preload: 'https://twikoo.taonotespace.com',
	},

	// 公告配置
	announcement: {
		enabled: true,
		message: '欢迎来到我的博客鸭！'
	},

	// ICP备案信息
	icp: {
		number: '浙ICP备2024096834号-3',
		url: 'https://beian.miit.gov.cn/',
	},
}

// 用于生成 OPML 和友链页面配置
export const myFeed = <FeedEntry>{
	author: blogConfig.author.name,
	sitenick: '摸鱼处',
	title: blogConfig.title,
	desc: blogConfig.subtitle || blogConfig.description,
	link: blogConfig.url,
	feed: new URL('/atom.xml', blogConfig.url).toString(),
	icon: blogConfig.favicon,
	avatar: blogConfig.author.avatar,
	archs: ['Nuxt', 'Vercel'],
	date: blogConfig.timeEstablished,
	comment: '这是我自己',
}

// 将旧页面永久重定向到新页面
const redirectRouteRules = Object.entries(redirectList)
	.reduce<NitroConfig['routeRules']>((acc, [from, to]) => {
		acc![from] = { redirect: { to: to as string, statusCode: 301 } }
		return acc
	}, {})

// https://nitro.build/config#routerules
// 使用 EdgeOne 部署时，需要同步更新 edgeone.json
// @keep-sorted
export const routeRules = <NitroConfig['routeRules']>{
	...redirectRouteRules,
	'/api/stats': { prerender: true, headers: { 'Content-Type': 'application/json' } },
	'/atom.xml': { prerender: true, headers: { 'Content-Type': 'application/xml' } },
	'/favicon.ico': { redirect: { to: blogConfig.favicon } },
	'/figures': { prerender: false },
	'/zhilu.opml': { prerender: true, headers: { 'Content-Type': 'application/xml' } },
}

export default blogConfig
