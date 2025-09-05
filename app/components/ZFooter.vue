<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
<footer class="z-footer">
	<div class="footer-info">
		<div class="icp">
			<a href="https://beian.miit.gov.cn/" target="_blank">浙ICP备2024096834号-3</a>
		</div>
		<span class="divider">|</span>
		<div class="copyright" v-html="appConfig.footer.copyright" />
	</div>
</footer>
</template>

<style lang="scss" scoped>
.z-footer {
	margin: 2rem 1rem 1rem;
	font-size: 0.8em;
	color: var(--c-text-3);

	.footer-info {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		font-size: 0.8em;
		color: var(--c-text-3);

		.copyright {
			font-weight: 500;
		}

		.icp {
			a {
				color: var(--c-text-3);
				text-decoration: none;
				font-weight: 500;
				
				&:hover {
					color: #4a90e2;
					text-decoration: underline;
				}
			}
		}

		.divider {
			color: var(--c-border);
		}
	}
}

@media (max-width: 768px) {
	.z-footer {
		margin: 1.5rem 0.5rem 0.5rem;

		.footer-info {
			gap: 0.8rem;
			font-size: 0.75em;
		}
	}
}
</style>
