<script setup lang="ts">
const props = defineProps<{
	totalPages: number
}>()

const page = defineModel<number>({ required: true })
const pageArr = computed(() => genPageArr(page.value, props.totalPages))
</script>

<template>
<nav class="pagination-tabs" :aria-label="`第${page}页，共${totalPages}页`">
	<button
		:disabled="page <= 1"
		class="tab-nav prev"
		aria-label="上一页"
		@click="page--"
	>
		←
	</button>

	<div class="tabs-container">
		<template v-for="i in pageArr" :key="i">
			<button
				v-if="Number.isFinite(i)"
				class="tab"
				:class="{ active: i === page }"
				:aria-label="`第${i}页`"
				@click="page = i"
			>
				{{ i }}
			</button>
			<span v-else class="tab-ellipsis">⋯</span>
		</template>
	</div>

	<button
		:disabled="page >= totalPages"
		class="tab-nav next"
		aria-label="下一页"
		@click="page++"
	>
		→
	</button>
</nav>
</template>

<style lang="scss" scoped>
.pagination-tabs {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	margin: 2rem 0;
	font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
}

.tab-nav {
	padding: 0.75rem 1rem;
	border: 1px solid var(--c-border);
	background: var(--c-bg);
	color: var(--c-text);
	border-radius: 0.5rem;
	cursor: pointer;
	transition: all 0.2s ease;
	font-weight: 500;
	font-size: 0.875rem;

	&:hover:not(:disabled) {
		background: var(--c-primary);
		color: white;
		border-color: var(--c-primary);
	}

	&:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}
}

.tabs-container {
	display: flex;
	gap: 0.25rem;
	background: var(--c-bg-2);
	border-radius: 0.75rem;
	padding: 0.25rem;
	box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
}

.tab {
	padding: 0.5rem 0.75rem;
	border: none;
	background: transparent;
	color: var(--c-text-2);
	border-radius: 0.5rem;
	cursor: pointer;
	transition: all 0.2s ease;
	font-weight: 400;
	font-size: 0.8125rem;
	min-width: 2.5rem;

	&:hover:not(.active) {
		background: var(--c-bg);
		color: var(--c-text);
	}

	&.active {
		background: var(--c-primary);
		color: white;
		font-weight: 500;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}
}

.tab-ellipsis {
	opacity: 0.5;
	user-select: none;
	color: var(--c-text-3);
	padding: 0.5rem 0.25rem;
	font-size: 1rem;
	display: flex;
	align-items: center;
}

@media (max-width: 768px) {
	.pagination-tabs {
		gap: 0.375rem;
		margin: 1.5rem 0;
	}

	.tab-nav {
		padding: 0.5rem 0.75rem;
		font-size: 0.75rem;
	}

	.tab {
		padding: 0.375rem 0.5rem;
		font-size: 0.75rem;
		min-width: 2rem;
	}

	.tabs-container {
		gap: 0.125rem;
		padding: 0.125rem;
	}
}

@media (max-width: 480px) {
	.pagination-tabs {
		gap: 0.25rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.tab-nav {
		padding: 0.375rem 0.5rem;
		font-size: 0.6875rem;
	}

	.tab {
		padding: 0.25rem 0.375rem;
		font-size: 0.6875rem;
		min-width: 1.75rem;
	}

	.tab-ellipsis {
		padding: 0.25rem 0.125rem;
		font-size: 0.875rem;
	}
}
</style>