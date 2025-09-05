<script setup lang="ts">
const appConfig = useAppConfig()
const { primary, accent } = appConfig.theme

// 简约动画效果
const hoverState = ref(false)
const logoScale = ref(1)
const titleOpacity = ref(1)

const handleHover = (isHovering: boolean) => {
  hoverState.value = isHovering
  logoScale.value = isHovering ? 1.05 : 1
  titleOpacity.value = isHovering ? 0.9 : 1
}
</script>

<template>
  <ZRawLink 
    class="atao-header"
    to="/"
    @mouseenter="handleHover(true)"
    @mouseleave="handleHover(false)"
  >
    <!-- 简约Logo区域 -->
    <div class="logo-container">
      <NuxtImg
        :src="appConfig.header.logo"
        class="atao-logo"
        :class="{ 'with-title': appConfig.header.showTitle }"
        :alt="appConfig.title"
        :style="{ transform: `scale(${logoScale})` }"
      />
      
      <!-- 简约光晕效果 -->
      <div class="glow-effect" :class="{ active: hoverState }" />
    </div>

    <!-- 标题区域 -->
    <div 
      v-if="appConfig.header.showTitle" 
      class="title-container"
      :style="{ opacity: titleOpacity }"
    >
      <h1 class="main-title">
        {{ appConfig.title }}
      </h1>
      <p class="subtitle">
        {{ appConfig.header.subtitle }}
      </p>
    </div>

    <!-- 简约装饰元素 -->
    <div class="decoration-dots" :class="{ active: hoverState }">
      <span v-for="n in 3" :key="n" class="dot" />
    </div>
  </ZRawLink>
</template>

<style lang="scss" scoped>
.atao-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  position: relative;
  margin: clamp(1rem, 2rem, 5vh) 1rem min(1rem, 5vh);
  padding: 0.8rem;
  border-radius: 16px;
  background: var(--c-bg-soft);
  border: 1px solid var(--c-border);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  text-decoration: none;
  color: var(--c-text);

  &:hover {
    transform: translateY(-2px);
    border-color: v-bind(primary);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.1),
      0 0 0 1px v-bind(primary)33;
    
    .glow-effect.active {
      opacity: 0.6;
      filter: blur(12px);
    }
    
    .decoration-dots.active .dot {
      opacity: 0.4;
      transform: translateY(-2px);
    }
  }

  &:active {
    transform: translateY(0);
    transition: all 0.1s ease;
  }
}

.logo-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.atao-logo {
  height: 3rem;
  width: 3rem;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 2;

  &.with-title {
    border-radius: 50%;
    box-shadow: 
      0 2px 8px rgba(0, 0, 0, 0.1),
      0 0 0 1px var(--c-border);
  }
}

.glow-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4rem;
  height: 4rem;
  background: linear-gradient(45deg, v-bind(primary), v-bind(accent));
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  filter: blur(16px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
}

.title-container {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  transition: opacity 0.3s ease;
}

.main-title {
  font-family: 'Inter', 'Noto Sans SC', sans-serif;
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.2;
  margin: 0;
  background: linear-gradient(135deg, var(--c-text), v-bind(primary));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.3s ease;
}

.subtitle {
  font-size: 0.8rem;
  opacity: 0.7;
  margin: 0;
  font-weight: 400;
  transition: all 0.3s ease;
}

.decoration-dots {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  display: flex;
  gap: 0.2rem;
  opacity: 0;
  transition: all 0.3s ease;

  .dot {
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 50%;
    background: v-bind(primary);
    opacity: 0;
    transition: all 0.3s ease;
    
    &:nth-child(1) { transition-delay: 0.1s; }
    &:nth-child(2) { transition-delay: 0.2s; }
    &:nth-child(3) { transition-delay: 0.3s; }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .atao-header {
    margin: 1rem 0.8rem;
    padding: 0.6rem;
    gap: 0.6rem;
  }

  .atao-logo {
    height: 2.5rem;
    width: 2.5rem;
  }

  .main-title {
    font-size: 1.1rem;
  }

  .subtitle {
    font-size: 0.75rem;
  }
}

// 深色模式优化
.dark {
  .atao-header {
    background: var(--c-bg-soft);
    border-color: var(--c-border);
    
    &:hover {
      box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.3),
        0 0 0 1px v-bind(primary)44;
    }
  }

  .atao-logo {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  }
}

// 简约动画关键帧
@keyframes subtle-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.02);
    opacity: 1;
  }
}

.atao-header:hover .atao-logo {
  animation: subtle-pulse 2s ease-in-out infinite;
}
</style>