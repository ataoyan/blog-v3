<script setup lang="ts">
const blogConfig = useAppConfig();

const appConfig = useAppConfig();
const { author } = appConfig;
const { name, avatar } = author;
const isHovered = ref(false);
const router = useRouter();

const navigateToArticles = () => {
  router.push('/');
};
</script>

<template>
  <div class="zhilu-header" 
       @mouseenter="isHovered = true" 
       @mouseleave="isHovered = false"
       @click="navigateToArticles">
    <div class="header-content">
      <div class="avatar-container">
        <img :src="avatar" alt="Avatar" class="avatar" />
      </div>
      <div class="text-container">
        <h2 class="name">{{ name }} 
          <span class="developer-tag">
            <transition name="fade" mode="out-in">
              <span v-if="!isHovered" key="default"><{{ blogConfig.headerConfig.defaultTag }}/></span>
              <span v-else key="hovered" class="moyu"><{{ blogConfig.headerConfig.hoverTag }}/></span>
            </transition>
          </span>
        </h2>
        <p class="tagline">
          <transition name="fade" mode="out-in">
            <span v-if="!isHovered" key="default">{{ blogConfig.subtitle }}</span>
            <span v-else key="hovered" class="love">{{ blogConfig.headerConfig.hoverSubtitle }}</span>
          </transition>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.zhilu-header {
  position: relative;
  padding: 1.5rem;
  margin: 1rem 0;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--c-bg-soft) 0%, var(--c-bg-card) 100%);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--c-border);
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.zhilu-header:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: var(--c-border);
}

.zhilu-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    rgba(var(--c-primary-rgb), 0.1) 0%, 
    rgba(var(--c-primary-rgb), 0.05) 50%, 
    transparent 100%);
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 0;
}

.zhilu-header:hover::before {
  transform: translateX(200%);
}

.header-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.avatar-container {
  flex-shrink: 0;
  position: relative;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 2px solid var(--c-border);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.zhilu-header:hover .avatar-container {
  transform: scale(1.08);
  border-color: var(--c-primary);
  box-shadow: 0 6px 16px rgba(var(--c-primary-rgb), 0.2);
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text-container {
  flex-grow: 1;
  overflow: visible;
  min-width: 0;
}

.name {
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0;
  color: var(--c-text-1);
  white-space: nowrap;
  overflow: visible;
  transition: color 0.3s ease;
  font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.zhilu-header:hover .name {
  color: var(--c-primary);
}

.tagline {
  font-size: 0.875rem;
  color: var(--c-text-2);
  margin: 0.5rem 0 0;
  opacity: 0.9;
  transition: all 0.3s ease;
  line-height: 1.4;
}

.zhilu-header:hover .tagline {
  opacity: 1;
  color: var(--c-text-1);
}

.moyu {
  color: #c79f2c;
  font-weight: 600;
}

.love {
  color: #fa6b81;
  font-weight: 600;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.developer-tag {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--c-primary);
  background: rgba(var(--c-primary-rgb), 0.15);
  padding: 0rem 0.1rem;
  border-radius: 20px;
  margin-left: 0rem;
  margin-right: 0rem;
  vertical-align: middle;
  transition: all 0.3s ease;
  border: 1px solid rgba(var(--c-primary-rgb), 0.3);
  font-family: 'Inter', 'PingFang SC', sans-serif;
  display: inline-block;
  line-height: 1.2;
}

.zhilu-header:hover .developer-tag {
  background: rgba(var(--c-primary-rgb), 0.2);
  transform: translateY(-1px);
  box-shadow: 0 2px 12px rgba(var(--c-primary-rgb), 0.25);
  border-color: rgba(var(--c-primary-rgb), 0.5);
}

@media (max-width: 768px) {
  .zhilu-header {
    padding: 1.25rem;
    margin: 0.75rem 0;
  }
  
  .avatar-container {
    width: 3.5rem;
    height: 3.5rem;
  }
  
  .name {
    font-size: 1.25rem;
  }
  
  .tagline {
    font-size: 0.8rem;
  }
  
  .developer-tag {
    font-size: 0.7rem;
    padding: 0.2rem 0.6rem;
  }
}

@media (max-width: 480px) {
  .zhilu-header {
    padding: 1rem;
  }
  
  .header-content {
    gap: 1rem;
  }
  
  .avatar-container {
    width: 3rem;
    height: 3rem;
  }
  
  .name {
    font-size: 1.1rem;
  }
  
  .tagline {
    font-size: 0.75rem;
  }
}
</style>