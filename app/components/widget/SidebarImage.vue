<script setup lang="ts">
interface ImageItem {
  src: string
  alt?: string
  width?: number
  height?: number
  scale?: number
}

interface CarouselConfig {
  enabled?: boolean
  interval?: number
  showControls?: boolean
  showIndicators?: boolean
  animation?: 'fade' | 'slide' | 'scale' | 'none'
}

interface Props {
  images?: ImageItem[]
  src?: string
  alt?: string
  width?: number
  height?: number
  scale?: number
  carousel?: CarouselConfig
}

const props = withDefaults(defineProps<Props>(), {
  images: () => [],
  src: '',
  alt: 'Sidebar Image',
  width: 240,
  height: 160,
  scale: 1.0,
  carousel: () => ({
    enabled: false,
    interval: 5000,
    showControls: true,
    showIndicators: true,
    animation: 'fade'
  })
})

// 向后兼容：如果提供了单个图片属性，转换为images数组
const imageList = computed(() => {
  if (props.images && props.images.length > 0) {
    return props.images
  }
  // 向后兼容：使用单个图片属性
  if (props.src) {
    return [{
      src: props.src,
      alt: props.alt,
      width: props.width,
      height: props.height
    }]
  }
  return []
})

const currentIndex = ref(0)
const isHovering = ref(false)

// 自动轮播逻辑
const { pause, resume } = useIntervalFn(() => {
  if (imageList.value.length > 1 && props.carousel?.enabled && !isHovering.value) {
    nextImage()
  }
}, props.carousel?.interval || 5000, { immediate: true })

const nextImage = () => {
  if (imageList.value.length <= 1) return
  currentIndex.value = (currentIndex.value + 1) % imageList.value.length
}

const prevImage = () => {
  if (imageList.value.length <= 1) return
  currentIndex.value = (currentIndex.value - 1 + imageList.value.length) % imageList.value.length
}

const goToImage = (index: number) => {
  if (imageList.value.length <= 1) return
  currentIndex.value = index
}

// 鼠标悬停时暂停轮播
const onMouseEnter = () => {
  isHovering.value = true
  pause()
}

const onMouseLeave = () => {
  isHovering.value = false
  if (props.carousel?.enabled) {
    resume()
  }
}
</script>

<template>
  <div 
    v-if="imageList.length > 0" 
    class="sidebar-image-container"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="sidebar-image-wrapper">
      <!-- 图片轮播 -->
      <div class="carousel-container">
        <template v-if="props.carousel?.animation === 'none'">
          <div 
            v-for="(image, index) in imageList"
            v-show="index === currentIndex"
            :key="`${image.src}-${index}`"
            class="image-wrapper"
            :style="{ transform: `scale(${image.scale ?? scale})` }"
          >
            <img
              :src="image.src"
              :alt="image.alt || alt || 'Sidebar Image'"
              :width="image.width || width"
              :height="image.height || height"
              class="sidebar-image"
              loading="lazy"
            />
          </div>
        </template>
        <template v-else>
          <div 
            v-for="(image, index) in imageList"
            :key="`${image.src}-${index}`"
          >
            <Transition name="fade-slide" mode="out-in">
              <div 
                v-show="index === currentIndex"
                class="image-wrapper"
                :style="{ transform: `scale(${image.scale ?? scale})` }"
              >
                <img
                  :src="image.src"
                  :alt="image.alt || alt || 'Sidebar Image'"
                  :width="image.width || width"
                  :height="image.height || height"
                  class="sidebar-image"
                  loading="lazy"
                />
              </div>
            </Transition>
          </div>
        </template>
      </div>

      <!-- 控制按钮 -->
      <div v-if="imageList.length > 1 && props.carousel?.showControls" class="carousel-controls">
        <button class="control-btn prev" @click.stop="prevImage">
          <Icon name="ph:caret-left-bold" />
        </button>
        <button class="control-btn next" @click.stop="nextImage">
          <Icon name="ph:caret-right-bold" />
        </button>
      </div>

      <!-- 指示器 -->
      <div v-if="imageList.length > 1 && props.carousel?.showIndicators" class="carousel-indicators">
        <button
          v-for="(_, index) in imageList"
          :key="index"
          class="indicator"
          :class="{ active: index === currentIndex }"
          @click.stop="goToImage(index)"
        />
      </div>
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
}

.image-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: center;
  will-change: transform, opacity;
  backface-visibility: hidden;
}

/* 简单的淡入滑动动画 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.sidebar-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* 确保所有图片在容器中居中显示 */
.image-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform, opacity;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px) scale(0.98);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px) scale(0.98);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}

/* 高性能动画容器 */
.carousel-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateZ(0); /* 启用GPU加速 */
  backface-visibility: hidden;
  perspective: 1000px;
}



/* 控制按钮 */
.carousel-controls {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 8px;
  transform: translateY(-50%);
  z-index: 10;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.sidebar-image-container:hover .carousel-controls {
  opacity: 1;
}

.control-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #333;
  font-size: 16px;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.1);
}

/* 指示器 */
.carousel-indicators {
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 6px;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.sidebar-image-container:hover .carousel-indicators {
  opacity: 1;
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: rgba(255, 255, 255, 0.9);
  transform: scale(1.2);
}

.indicator:hover {
  background: rgba(255, 255, 255, 0.8);
}

@media (prefers-color-scheme: dark) {
  .sidebar-image-container {
    --card-bg: rgba(40, 40, 40, 0.9);
  }
  
  .sidebar-image-container:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }

  .control-btn {
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
  }

  .control-btn:hover {
    background: rgba(0, 0, 0, 0.9);
  }

  .indicator {
    background: rgba(0, 0, 0, 0.5);
  }

  .indicator.active {
    background: rgba(0, 0, 0, 0.9);
  }

  .indicator:hover {
    background: rgba(0, 0, 0, 0.7);
  }
}
</style>