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
  background:
  linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='15' y='10' width='20' height='30' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1.5' transform='rotate(10,25,25)'/%3E%3Crect x='60' y='25' width='25' height='25' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1'/%3E%3Crect x='10' y='60' width='40' height='15' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1.2'/%3E%3Crect x='65' y='65' width='20' height='20' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1.5' transform='rotate(-15,75,75)'/%3E%3Crect x='30' y='40' width='35' height='25' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1'/%3E%3C/svg%3E");
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 8px;
  background-color: var(--c-bg-soft);
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid var(--c-border);
  cursor: pointer;
}

.zhilu-header:hover {
  transform: translateY(-1px);
}

.zhilu-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    rgba(var(--c-primary-rgb), 0.15) 0%, 
    rgba(var(--c-primary-rgb), 0.08) 50%, 
    rgba(var(--c-primary-rgb), 0.02) 100%);
  transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 0;
  box-shadow: inset 0 0 20px rgba(var(--c-primary-rgb), 0.1);
}

.zhilu-header:hover::before {
  transform: translateX(100%);
}

.zhilu-header::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 40px;
  height: 100%;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.2) 50%,
    transparent 100%);
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 0;
  opacity: 0;
}

.zhilu-header:hover::after {
  transform: translateX(400%);
  opacity: 1;
  transition-delay: 0.2s;
}

.header-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar-container {
  flex-shrink: 0;
  position: relative;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.zhilu-header:hover .avatar-container {
  transform: scale(1.05);
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.3s ease;
}

.text-container {
  flex-grow: 1;
  overflow: hidden;
}

.name {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: var(--c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: transform 0.3s ease;
}

.tagline {
  font-size: 0.775rem;
  color: var(--c-text-2);
  margin: 0.25rem 0 0;
  opacity: 0.8;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.zhilu-header:hover .name {
  transform: translateY(-2px);
  color: var(--c-primary);
}

.zhilu-header:hover .tagline {
  opacity: 1;
  transform: translateY(-1px);
}

/* .zhilu-header:hover .tagline span {
  display: inline-block;
  color: var(--c-primary);
} */

.moyu {
  color: #c79f2c;
  display: inline-block;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
}

.love {
  color: #fa6b81;
  display: inline-block;
  font-weight: bold;
  border-radius: 4px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(5px);
}

.developer-tag {
  font-size: 0.75rem;
  font-weight: bolder;
  color: var(--c-primary);
  background-color: rgba(var(--c-primary-rgb), 0.05);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  margin-left: 0.15rem;
  vertical-align: baseline;
  transition: all 0.3s ease;
  border: 1px solid var(--c-primary-light);
  display: inline-block;
  font-family: "Microsoft YaHei", "微软雅黑", sans-serif;
  white-space: nowrap;
  letter-spacing: -0.01em;
}

.zhilu-header:hover .developer-tag {
  background-color: rgba(var(--c-primary-rgb), 0.1);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(var(--c-primary-rgb), 0.1);
}

@media (max-width: 768px) {
  .zhilu-header {
    padding: 1rem;
  }
  
  .avatar-container {
    width: 3rem;
    height: 3rem;
  }
  
  .name {
    font-size: 1.1rem;
  }
  
  .tagline {
    font-size: 0.8rem;
  }
}
</style>