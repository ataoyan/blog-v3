<script setup lang="ts">
const appConfig = useAppConfig()

// 定义跳转函数
function goToZhiluSite() {
  window.open('https://blog.zhilu.site/', '_blank')
}
</script>

<template>
  <div class="theme-card-wrapper" @click="goToZhiluSite">
    <ZWidget card title="主题致谢" class="theme-card">
      <div class="theme-content">
        <div class="texture-overlay"></div>
        <p class="theme-desc">灵感来源于</p>
        <div class="dashed-line"></div>
        <div class="source-container">
          <p class="theme-source">纸鹿「Clarity」主题</p>
          <div class="theme-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <!-- <p class="theme-note">经个人客制化</p> -->
      </div>
    </ZWidget>
  </div>
</template>

<style scoped>
:deep(.z-widget) {
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

:deep(.z-widget):hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(var(--c-primary-rgb), 0.15);
}

:deep(.z-widget):hover .theme-arrow {
  opacity: 1;
  transform: translate(0, 0);
}

:deep(.z-widget__content) {
  position: relative;
  z-index: 2;
  padding: 1rem;
}

.theme-content {
  text-align: center;
}

.texture-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(135deg, rgba(var(--c-primary-rgb), 0.08) 0%, transparent 50%),
    url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M30,30 Q50,20 70,30 T90,50 T70,70 T50,80 T30,70 T10,50 T30,30 Z" fill="none" stroke="rgba(var(--c-primary-rgb),0.05)" stroke-width="2"/></svg>');
  opacity: 0.6;
  z-index: 1;
  transition: opacity 0.3s ease;
}

:deep(.z-widget):hover .texture-overlay {
  opacity: 0.8;
}

.theme-desc {
  font-size: 0.9rem;
  color: var(--c-text-2);
  margin-bottom: 0.2rem;
}

.dashed-line {
  width: 80%;
  height: 2px;
  border-top: 2px dashed var(--c-text-3);
  margin: 0.7rem auto;
  opacity: 0.7;
}

.source-container {
  display: block;
  position: relative;
  margin-bottom: 0.5rem;
  text-align: center;
}

.theme-source {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--c-primary);
  margin-bottom: 0;
  display: inline-block;
}

.theme-note {
  font-size: 0.8rem;
  color: var(--c-text-3);
  font-style: italic;
}

.theme-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--c-primary);
  opacity: 0;
  transform: translate(5px, 0);
  transition: all 0.3s ease;
  z-index: 10;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  background-color: rgba(var(--c-primary-rgb), 0.1);
  padding: 4px;
  margin-left: 8px;
  vertical-align: middle;
  position: absolute;
  top: 50%;
  transform: translateY(-50%) translateX(5px);
}

:deep(.z-widget):hover .theme-arrow {
  transform: translateY(-50%) translateX(0);
}

.theme-arrow svg {
  width: 100%;
  height: 100%;
}

/* 确保整个卡片可点击 */
.theme-card-wrapper {
  position: relative;
  cursor: pointer;
}

.theme-card {
  position: relative;
}

/* 明确指定箭头样式 */
.theme-card-wrapper:hover .theme-arrow {
  opacity: 1 !important;
}
</style>