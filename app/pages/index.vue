<script setup lang="ts">
import { sort } from 'radash'
import type { WidgetName } from '~/composables/useWidgets'
import { computed, watch } from 'vue'

const appConfig = useAppConfig()
useSeoMeta({
	description: appConfig.description,
	ogImage: appConfig.author.avatar,
})

const layoutStore = useLayoutStore()

// 根据配置决定是否显示侧边栏图片
const asideWidgets = computed<WidgetName[]>(() => {
  const widgets: WidgetName[] = ['blog-stats', 'announcement-card', 'theme-card']
  
  // 如果启用了侧边栏图片，在公告后添加图片组件
  if (appConfig.sidebarImage?.enabled) {
    // 在 'announcement-card' 后插入 'sidebar-image'
    const announcementIndex = widgets.indexOf('announcement-card')
    if (announcementIndex !== -1) {
      widgets.splice(announcementIndex + 1, 0, 'sidebar-image')
    }
  }
  
  return widgets
})

watch(asideWidgets, (newWidgets) => {
  layoutStore.setAside(newWidgets)
}, { immediate: true })

// BUG 若其他页面和 index.vue 共用同一数据源，其 payload 会被置空
// 此处数据源不采用默认参数，以防归档页面刷新空白
const { data: listRaw } = await useArticleIndex('posts%')
const { listSorted, isAscending, sortOrder } = useArticleSort(listRaw)
const { category, categories, tag, tags, listFiltered } = useArticleFilter(listSorted, { 
	categoryBindQuery: 'category',
	tagBindQuery: 'tag'
})
const { page, totalPages, listPaged } = usePagination(listFiltered, { bindQuery: 'page' })

watch([category, tag], () => {
	page.value = 1
})

useSeoMeta({ title: () => (page.value > 1 ? `第${page.value}页` : '') })

const listRecommended = computed(() => sort(
	listRaw.value.filter(item => item?.recommend),
	post => post.recommend || 0,
	true,
))
</script>

<template>
<div class="mobile-only">
	<!-- 若不包裹，display: none 在 JS 加载后才有足够优先级 -->
	<ZhiluHeader to="/" />
</div>

<PostSlide v-if="listRecommended.length && page === 1 && !category" :list="listRecommended" />

<div class="post-list">
	<div class="toolbar">
		<div>
			<!-- 外层元素用于占位 -->
			<ZRawLink to="/preview" class="preview-entrance">
				<Icon name="ph:file-lock-bold" />
				查看预览文章
			</ZRawLink>
		</div>

		<div class="filter-group">
			<ZOrderToggle
				v-model:is-ascending="isAscending"
				v-model:sort-order="sortOrder"
				v-model:category="category"
				:categories
			/>
			
			<ZTagToggle
				v-model:tag="tag"
				:tags
			/>
		</div>
	</div>

	<TransitionGroup name="float-in">
		<ZArticle
			v-for="article, index in listPaged"
			:key="article.path"
			v-bind="article"
			:to="article.path"
			:use-updated="sortOrder === 'updated'"
			:style="{ '--delay': `${index * 0.05}s` }"
		/>
	</TransitionGroup>

	<ZPagination v-model="page" :total-pages />
</div>
</template>

<style lang="scss" scoped>
.toolbar {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.filter-group {
	display: flex;
	align-items: center;
	gap: 1rem;
}

.preview-entrance {
	position: relative;
	opacity: 0;
	transition: all 0.2s 1s, color 0.2s;
	z-index: -1;

	:hover > & {
		opacity: 1;
		color: var(--c-primary);
		z-index: 0;
	}
}

.post-list {
	margin: 1rem;
}
</style>
