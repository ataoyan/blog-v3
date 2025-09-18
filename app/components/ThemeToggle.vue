<script setup lang="ts">
const appConfig = useAppConfig()
const colorMode = useColorMode()
</script>

<template>
<div class="theme-toggle">
	<button
		v-for="(themeData, themeName) in appConfig.themes"
		:key="themeName"
		v-tip="themeData.tip"
		:aria-label="themeData.tip"
		:class="{ active: colorMode.preference === themeName }"
		@click="colorMode.preference = themeName"
	>
		<Icon :name="themeData.icon" />
	</button>
</div>
</template>

<style lang="scss" scoped>
.theme-toggle {
	display: flex;
	justify-content: center;
	gap: 1px;
	width: fit-content;
	margin: 0 auto;
	padding: 2px;
	background: linear-gradient(135deg, var(--c-bg-soft) 0%, var(--c-bg-card) 100%);
	border-radius: 9px;
	border: 1px solid var(--c-border);
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

	&:hover {
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
	}

	> button {
		padding: 6px 12px;
		border-radius: 7px;
		transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
		font-size: 1.1em;
		color: var(--c-text-2);
		background: transparent;
		border: none;
		cursor: pointer;

		&:hover {
			background: rgba(0, 0, 0, 0.05);
			color: var(--c-text-1);
		}

		&.active {
			background: white;
			color: var(--c-text-1);
			box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
			font-weight: 500;
		}
	}
}

// 深色模式适配
.dark .theme-toggle {
	background: rgba(255, 255, 255, 0.08);
	box-shadow: 
		inset 0 1px 2px rgba(255, 255, 255, 0.1),
		0 1px 2px rgba(0, 0, 0, 0.2);

	&:hover {
		box-shadow: 
			inset 0 1px 2px rgba(255, 255, 255, 0.15),
			0 2px 4px rgba(0, 0, 0, 0.3);
	}

	> button {
		color: rgba(255, 255, 255, 0.7);

		&:hover {
			background: rgba(255, 255, 255, 0.1);
			color: rgba(255, 255, 255, 0.9);
		}

		&.active {
			background: rgba(255, 255, 255, 0.9);
			color: #000;
			box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
		}
	}
}
</style>
