<script setup lang="ts">
import type { NavItem } from '~/types/nav'

defineProps<{
	list: NavItem[]
}>()
</script>

<template>
<div class="icon-nav-container">
	<menu class="icon-nav-menu">
		<ZRawLink
			v-for="item in list"
			:key="item.text"
			v-tip="item.text"
			:to="item.url"
			:aria-label="item.text"
			class="icon-nav-item"
		>
			<Icon :name="item.icon" class="icon-nav-icon" />
			<span class="icon-nav-text">{{ item.text }}</span>
		</ZRawLink>
	</menu>
</div>
</template>

<style lang="scss" scoped>
.icon-nav-container {
	width: 100%;
	padding: 0.5rem;
}

.icon-nav-menu {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	justify-content: center;
}

.icon-nav-item {
	display: flex;
	align-items: center;
	gap: 0.75rem;
	padding: 0.75rem 1rem;
	border-radius: 0.75rem;
	transition: all 0.2s ease;
	background-color: var(--c-bg-soft);
	border: 1px solid var(--c-border);
	
	&:hover {
		background-color: var(--c-primary-soft);
		border-color: var(--c-primary);
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	&:active {
		transform: translateY(0);
	}
}

.icon-nav-icon {
	font-size: 1.4em;
	color: var(--c-primary);
	flex-shrink: 0;
}

.icon-nav-text {
	font-size: 0.9em;
	font-weight: 500;
	color: var(--c-text-2);
	transition: color 0.2s ease;
	
	.icon-nav-item:hover & {
		color: var(--c-text);
	}
}

// 响应式设计
@media (max-width: $breakpoint-mobile) {
	.icon-nav-menu {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}
	
	.icon-nav-item {
		flex-direction: column;
		gap: 0.5rem;
		padding: 0.75rem;
		min-width: 80px;
		text-align: center;
	}
	
	.icon-nav-text {
		font-size: 0.8em;
	}
}

// 深色模式适配
.dark {
	.icon-nav-item {
		background-color: var(--c-bg-2);
		border-color: var(--c-border-dark);
		
		&:hover {
			background-color: var(--c-primary-dark);
			border-color: var(--c-primary);
		}
	}
}
</style>
