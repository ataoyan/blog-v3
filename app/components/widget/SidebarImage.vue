<script setup lang="ts">
interface Props {
  src?: string
  alt?: string
  width?: number
  height?: number
  scale?: number
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
  alt: 'Sidebar Image',
  width: 240,
  height: 160,
  scale: 1.0
})

const imageUrl = computed(() => {
  if (!props.src) return ''
  // 处理外部链接和本地路径
  if (props.src.startsWith('http') || props.src.startsWith('//')) {
    return props.src
  }
  // 本地图片路径处理
  return props.src
})
</script>

<template>
  <div v-if="imageUrl" class="sidebar-image-container">
    <div class="sidebar-image-wrapper">
      <img
        :src="imageUrl"
        :alt="alt"
        :width="width"
        :height="height"
        class="sidebar-image"
        loading="lazy"
      />
    </div>
  </div>
</template>

<style scoped>
.sidebar-image-container {
  margin: 16px 0;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.sidebar-image-container:hover {
  transform: none;
  box-shadow: none;
}

.sidebar-image-wrapper {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 66.67%; /* 3:2 aspect ratio */
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(135deg, var(--c-bg-soft) 0%, var(--c-bg-card) 100%);
  transform: scale(v-bind('props.scale'));
  transform-origin: center;
}

.sidebar-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain; /* 保持图片完整比例 */
  transition: transform 0.3s ease;
  transform: scale(v-bind('props.scale')); /* 应用缩放比例 */
  transform-origin: center;
}

.sidebar-image:hover {
  transform: scale(calc(v-bind('props.scale') * 1.05)); /* 悬停时保持基础缩放 */
}

@media (prefers-color-scheme: dark) {
  .sidebar-image-container {
    --card-bg: rgba(40, 40, 40, 0.9);
  }
  
  .sidebar-image-container:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }
}
</style>