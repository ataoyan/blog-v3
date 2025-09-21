<script setup lang="ts">
const props = defineProps<{
	totalPages: number
}>()

const page = defineModel<number>({ required: true })
const pageArr = computed(() => genPageArr(page.value, props.totalPages))
</script>

<template>
<nav class="pagination" :aria-label="`第${page}页，共${totalPages}页`">
	<!-- 上一页 -->
	<button
		:disabled="page <= 1"
		class="nav-button prev"
		aria-label="上一页"
		@click="page--"
	>
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
			<path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	</button>

	<!-- 页码 -->
	<template v-for="i in pageArr" :key="i">
		<button
			v-if="Number.isFinite(i)"
			class="page-button"
			:class="{ active: i === page }"
			:aria-label="`第${i}页`"
			@click="page = i"
		>
			{{ i }}
		</button>
		<span v-else class="ellipsis">⋯</span>
	</template>

	<!-- 下一页 -->
	<button
		:disabled="page >= totalPages"
		class="nav-button next"
		aria-label="下一页"
		@click="page++"
	>
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
			<path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	</button>
</nav>
</template>

<style lang="scss" scoped>
.pagination {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	margin: 2rem 0;
	font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
}

.nav-button {
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 50%;
	border: 1px solid var(--c-border);
	background: var(--c-bg);
	color: var(--c-text);
	cursor: pointer;
	transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover:not(:disabled) {
		background: var(--c-primary);
		color: white;
		border-color: var(--c-primary);
		transform: scale(1.05);
	}

	&:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}
}

.page-button {
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 50%;
	border: 1px solid var(--c-border);
	background: var(--c-bg);
	color: var(--c-text-2);
	font-weight: 400;
	cursor: pointer;
	transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 0.875rem;

	&:hover:not(.active) {
		background: var(--c-bg-2);
		border-color: var(--c-primary);
		color: var(--c-text);
		transform: scale(1.05);
	}

	&.active {
		background: var(--c-primary);
		color: white;
		border-color: var(--c-primary);
		font-weight: 500;
		transform: scale(1.1);
	}
}

.ellipsis {
	opacity: 0.5;
	user-select: none;
	color: var(--c-text-3);
	padding: 0 0.25rem;
	font-size: 1.1rem;
}

@media (max-width: 768px) {
	.pagination {
		gap: 0.375rem;
		margin: 1.5rem 0;
	}

	.nav-button,
	.page-button {
		width: 2rem;
		height: 2rem;
		font-size: 0.75rem;
	}

	.nav-button svg {
		width: 14px;
		height: 14px;
	}
}

@media (max-width: 480px) {
	.pagination {
		gap: 0.25rem;
	}

	.nav-button,
	.page-button {
		width: 1.75rem;
		height: 1.75rem;
		font-size: 0.6875rem;
	}

	.nav-button svg {
		width: 12px;
		height: 12px;
	}

	.ellipsis {
		padding: 0 0.125rem;
		font-size: 1rem;
	}
}
</style>