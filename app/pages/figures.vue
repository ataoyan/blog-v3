<script setup lang="ts">
import figures from '~/figures'
import FigureCard from '~/components/figure/FigureCard.vue'
import { useStorage } from '@vueuse/core'
import { useLayoutStore } from '~/stores/layout'
import { computed, ref, watch } from 'vue'
import { navigateTo, useRoute } from '#imports'

type Series = string

const layoutStore = useLayoutStore()
layoutStore.setAside(['blog-stats', 'announcement-card', 'work-status', 'theme-card'])


const route = useRoute()
const all = computed(() => figures)
const seriesList = computed<Series[]>(() => {
	const set = new Set<Series>(all.value.map(f => f.series))
	return ['全部', ...Array.from(set)]
})

const seriesStorage = useStorage<Series>('figures-series', '全部')
const series = ref<Series>((route.query.series as Series) || seriesStorage.value || '全部')

watch(series, (val) => {
	const q = { ...route.query, series: val }
	navigateTo({ path: route.path, query: q }, { replace: true })
	seriesStorage.value = val
})

const list = computed(() => series.value === '全部' ? all.value : all.value.filter(f => f.series === series.value))

// 计算拥有数量统计
const ownedStats = computed(() => {
  const currentList = list.value
  const total = currentList.length
  const owned = currentList.filter(item => item.owned).length
  return { owned, total }
})
</script>

<template>
<div class="page-figures">
	<div class="header">
		<div class="tabs">
			<button
				v-for="s in seriesList"
				:key="s"
				:class="['tab', { active: s === series }]"
				@click="series = s as any"
			>
				{{ s }}
			</button>
		</div>
		
		<div class="stats-badge">
			{{ ownedStats.owned }}/{{ ownedStats.total }}
		</div>
	</div>

	<div class="grid">
		<FigureCard v-for="item in list" :key="item.name + item.series" :item="item" />
	</div>
</div>
</template>

<style lang="scss" scoped>
.page-figures {
	min-height: 90vh;
	
	.title {
		font-size: 1.6rem;
		font-weight: 800;
		margin: 0 0 1rem 0;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin: 0.5rem 0 1rem;
		gap: 1rem;
		position: relative;
	}

	.tabs {
		display: inline-flex;
		gap: 0.5rem;
		flex-wrap: wrap;

		.tab {
			padding: 0.5rem 1rem;
			border-radius: 0.5rem;
			background: var(--ld-bg-card);
			border: 1px solid var(--c-border);
			box-shadow: 0 2px 10px var(--ld-shadow);
			transition: all 0.2s;
			font-weight: 600;

			&:hover {
				transform: translateY(-1px);
				box-shadow: 0 6px 16px var(--ld-shadow);
			}

			&.active {
				background: var(--c-primary);
				border-color: transparent;
				color: white;
				box-shadow: 0 8px 20px var(--ld-shadow);
			}

			&:focus-visible {
				outline: 2px solid color-mix(in oklab, var(--c-primary) 60%, white);
				outline-offset: 2px;
			}
		}
	}

	.stats-badge {
		padding: 0.5rem 0.75rem;
		border-radius: 0.5rem;
		font-size: 0.8125rem;
		font-weight: 600;
		background: var(--c-bg-soft);
		color: var(--c-text-2);
		border: 1px solid var(--c-border);
		white-space: nowrap;
		flex-shrink: 0;
		align-self: flex-start;
		margin-top: 0.25rem;
	}
	.grid {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		justify-content: center;
		padding: 1rem 0;
	}

	@media (max-width: 1024px) {
		.grid {
			grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
			gap: 0.875rem;
		}
	}

	@media (max-width: 640px) {
		.grid {
			grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
			gap: 0.75rem;
		}
	}
}
</style>
