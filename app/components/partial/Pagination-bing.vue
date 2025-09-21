<script setup lang="ts">
const props = defineProps<{
	totalPages: number
}>()

const page = defineModel<number>({ required: true })
const pageArr = computed(() => genPageArr(page.value, props.totalPages))
</script>

<template>
<nav class="pagination-bing" :aria-label="`第${page}页，共${totalPages}页`">
	<!-- 上一页 -->
	<button
		:disabled="page <= 1"
		class="bing-nav prev"
		aria-label="上一页"
		@click="page--"
	>
		<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
			<path d="M15 18L9 12L15 6"/>
		</svg>
	</button>

	<!-- 页码区域 -->
	<div class="bing-pages">
		<template v-for="i in pageArr" :key="i">
			<button
				v-if="Number.isFinite(i)"
				class="bing-page"
				:class="{ active: i === page }"
				:aria-label="`第${i}页`"
				@click="page = i"
			>
				{{ i }}
			</button>
			<span v-else class="bing-ellipsis">…</span>
		</template>
	</div>

	<!-- 下一页 -->
	<button
		:disabled="page >= totalPages"
		class="bing-nav next"
		aria-label="下一页"
		@click="page++"
	>
		<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
			<path d="M9 18L15 12L9 6"/>
		</svg>
	</button>

	<!-- 页面信息 -->
	<div class="bing-info">
		第 {{ page }} 页，共 {{ totalPages }} 页
	</div>
</nav>
</template>

<style lang="scss" scoped>
.pagination-bing {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	margin: 2rem 0;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
	font-size: 0.8125rem;
	color: #1a1a1a;
}

.bing-nav {
	width: 2rem;
	height: 2rem;
	border: 1px solid #d0d0d0;
	background: #ffffff;
	color: #1a1a1a;
	border-radius: 0.25rem;
	cursor: pointer;
	transition: all 0.15s ease;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover:not(:disabled) {
		background: #0078d4;
		color: #ffffff;
		border-color: #0078d4;
	}

	&:disabled {
		opacity: 0.4;
		cursor: not-allowed;
		color: #666666;
	}
}

.bing-pages {
	display: flex;
	align-items: center;
	gap: 0.25rem;
}

.bing-page {
	min-width: 2rem;
	height: 2rem;
	padding: 0 0.5rem;
	border: 1px solid #d0d0d0;
	background: #ffffff;
	color: #1a1a1a;
	border-radius: 0.25rem;
	cursor: pointer;
	transition: all 0.15s ease;
	font-weight: 400;
	font-size: 0.8125rem;

	&:hover:not(.active) {
		background: #f3f3f3;
		border-color: #0078d4;
		color: #0078d4;
	}

	&.active {
		background: #0078d4;
		color: #ffffff;
		border-color: #0078d4;
		font-weight: 600;
	}
}

.bing-ellipsis {
	opacity: 0.6;
	user-select: none;
	color: #666666;
	padding: 0 0.25rem;
	font-size: 1rem;
}

.bing-info {
	margin-left: 1rem;
	color: #666666;
	font-size: 0.75rem;
	font-weight: 400;
}

@media (max-width: 768px) {
	.pagination-bing {
		gap: 0.375rem;
		margin: 1.5rem 0;
		flex-wrap: wrap;
		justify-content: center;
	}

	.bing-nav,
	.bing-page {
		width: 1.75rem;
		height: 1.75rem;
		font-size: 0.75rem;
	}

	.bing-info {
		margin-left: 0.5rem;
		font-size: 0.6875rem;
	}
}

@media (max-width: 480px) {
	.pagination-bing {
		gap: 0.25rem;
	}

	.bing-nav,
	.bing-page {
		width: 1.5rem;
		height: 1.5rem;
		font-size: 0.6875rem;
		min-width: 1.5rem;
	}

	.bing-info {
		display: none;
	}
}
</style>