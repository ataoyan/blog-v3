<script setup lang="ts">
import type { FigureItem } from '~/figures'

const props = defineProps<{ item: FigureItem }>()
</script>

<template>
<div class="figure-card" :class="{ 'not-owned': !props.item.owned, 'hidden-item': props.item.isHidden }">
	<div class="status-badges">
		<div class="badge owned" :class="{ yes: props.item.owned, no: !props.item.owned }">
			{{ props.item.owned ? '已拥有' : '未拥有' }}
		</div>
	</div>
	
	<div v-if="props.item.isHidden" class="hidden-badge">
		<div class="badge hidden">
			隐藏款
		</div>
	</div>
	
	<div class="card-content">
		<div class="image-container">
			<div class="cover-box" :style="{ '--img-scale': String(props.item.scale ?? 1) }">
				<NuxtImg class="cover" :src="props.item.image" :alt="props.item.name" loading="lazy" :width="200" :quality="90" densities="x1 x1.5 x2 x3" sizes="120px" :modifiers="{ fit: 'cover', background: 'transparent' }" :class="{ 'is-gray': !props.item.owned }" />
			</div>
		</div>
		
		<div class="meta">
			<h4 class="name">{{ props.item.name }}</h4>
		</div>
	</div>
</div>
</template>

<style lang="scss" scoped>
.figure-card {
	/* 字体抗锯齿优化 */
	-webkit-font-smoothing: subpixel-antialiased;
	-moz-osx-font-smoothing: auto;
	text-rendering: geometricPrecision;
	
	padding: 1.25rem;
	border-radius: 1rem;
	background: transparent;
	border: 2px solid var(--c-border);
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	min-height: 220px;
	width: 100%;
	max-width: none;
	margin: 0 auto;
	position: relative;
	overflow: hidden;
	display: flex;
	flex-direction: column;

	&:hover {
		transform: translateY(-4px) scale(1.02);
		border-color: var(--c-primary);
		box-shadow: 
			0 8px 24px var(--ld-shadow),
			0 2px 6px var(--ld-shadow);
	}

	&.not-owned {
		opacity: 0.7;
		filter: saturate(0.7);
	}

	&.hidden-item {
		border-color: rgba(212, 175, 55, 0.6);
		box-shadow: 
			0 8px 24px rgba(212, 175, 55, 0.15),
			0 2px 6px rgba(212, 175, 55, 0.08);
		
		&:hover {
			border-color: rgba(212, 175, 55, 0.8);
			box-shadow: 
				0 12px 32px rgba(212, 175, 55, 0.2),
				0 4px 8px rgba(212, 175, 55, 0.12);
		}
	}

	.status-badges {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		align-items: flex-end;
		z-index: 10;
		
		.badge {
			padding: 0.2rem 0.4rem;
			border-radius: 0.375rem;
			font-size: 0.625rem;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			backdrop-filter: blur(10px);
			
			&.owned {
				&.yes {
					background: rgba(24, 160, 88, 0.1);
					color: rgb(24, 160, 88);
					border: 1px solid rgba(24, 160, 88, 0.3);
				}
				&.no {
					background: rgba(108, 117, 125, 0.1);
					color: rgb(108, 117, 125);
					border: 1px solid rgba(108, 117, 125, 0.3);
				}
			}
		}
	}

	.hidden-badge {
		position: absolute;
		top: 0.5rem;
		left: 0.5rem;
		z-index: 10;
		
		.badge.hidden {
			padding: 0.2rem 0.4rem;
			border-radius: 0.375rem;
			font-size: 0.625rem;
			font-weight: 600;
			text-align: center;
			white-space: nowrap;
			backdrop-filter: blur(10px);
			background: rgba(212, 175, 55, 0.1);
			color: #d4af37;
			border: 1px solid rgba(212, 175, 55, 0.3);
		}
	}
	
	.card-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		position: relative;
	}

	.image-container {
		position: relative;
		width: 100%;
		height: 140px;
		border-radius: 0.375rem;
		overflow: hidden;
		background: var(--c-bg-2);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.cover-box {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
	}

	.cover {
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center;
		border-radius: 0.125rem;
		background-color: transparent;
		image-rendering: crisp-edges;
		transition: all 0.3s ease;

		&.is-gray {
			filter: grayscale(100%) saturate(60%);
			opacity: 0.7;
		}
	}

	.meta {
		width: 100%;
		text-align: center;
		margin-top: 0.25rem;
		padding: 0 0.25rem;
		
		.name {
			margin: 0;
			font-weight: 600;
			font-size: 0.8125rem;
			line-height: 1.1;
			color: var(--c-text-1);
			letter-spacing: -0.01em;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
}

@media (max-width: 640px) {
	.figure-card {
		padding: 0.75rem;
		max-width: 180px;
		min-height: 200px;

		.image-container {
			height: 110px;
		}

		.meta .name {
			font-size: 0.8125rem;
		}

		.status-badges {
			top: 0.375rem;
			right: 0.375rem;
			
			.badge {
				font-size: 0.5625rem;
				padding: 0.15rem 0.3rem;
				border-radius: 0.25rem;
			}
		}
	}
}
</style>

