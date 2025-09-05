import {
	LazyWidgetBlogLog,
	LazyWidgetBlogStats,
	LazyWidgetBlogTech,
	LazyWidgetCommGroup,
	LazyWidgetEmpty,
	LazyWidgetGithubCard,
	LazyWidgetToc,
} from '#components'
import { defineAsyncComponent } from 'vue'
import { pascal } from 'radash'

// @极简主义
const rawWidgets = {
	LazyWidgetBlogLog,
	LazyWidgetBlogStats,
	LazyWidgetBlogTech,
	LazyWidgetCommGroup,
	LazyWidgetEmpty,
	LazyWidgetGithubCard,
	LazyWidgetToc,
	LazyWidgetThemeCard: defineAsyncComponent(() => import('~/components/widget/ThemeCard.vue')),
	LazyWidgetWorkStatus: defineAsyncComponent(() => import('~/components/widget/WorkStatusCard.vue')),
	LazyWidgetAnnouncementCard: defineAsyncComponent(() => import('~/components/widget/AnnouncementCard.vue')),
}

type RawWidgetName = keyof typeof rawWidgets | 'LazyWidgetThemeCard'

/** 若首字母大写还需移除`-`前缀 */
type KebabCase<S extends string> = S extends `${infer First}${infer Rest}`
	? `${First extends Capitalize<First> ? '-' : ''}${Lowercase<First>}${KebabCase<Rest>}`
	: ''

type RemovePrefix<S extends string, Prefix extends string> = S extends `${Prefix}${infer Rest}` ? Rest : S

export type WidgetName = RemovePrefix<KebabCase<RawWidgetName>, '-lazy-widget-'>

export default function useWidgets(widgetList: MaybeRefOrGetter<WidgetName[]>) {
	const widgets = computed(() => (toValue(widgetList) || []).map(widget => ({
		name: widget,
		comp: rawWidgets[`LazyWidget${pascal(widget)}` as RawWidgetName],
	})))
	return {
		widgets,
	}
}
