<script setup lang="ts">
const isWorkingHours = computed(() => {
  const now = new Date()
  const day = now.getDay() // 0是周日，1-5是周一到周五，6是周六
  const hour = now.getHours()
  const minute = now.getMinutes()
  const currentTime = hour + minute / 60 // 转换为小时的十进制表示

  // 检查是否是工作日（周一至周五）
  const isWorkday = day >= 1 && day <= 5
  
  // 检查是否在工作时间（8:45 - 17:15）
  const isWorkTime = currentTime >= 8.75 && currentTime <= 17.25
  
  return isWorkday && isWorkTime
})

const statusImage = computed(() => {
  return isWorkingHours.value 
    ? 'https://cdn.taonotespace.com/Web/shangban.png' 
    : 'https://cdn.taonotespace.com/Web/xiaban.png'
})

const statusText = computed(() => {
  return isWorkingHours.value ? '工作中...' : '休息时间'
})
</script>

<template>
  <div class="status-card-wrapper">
    <ZWidget card class="status-card">
      <div class="status-content">
        <div class="texture-overlay"></div>
        <div class="status-image-container">
          <img :src="statusImage" :alt="statusText" class="status-image" />
        </div>
        <p class="status-text">{{ statusText }}</p>
      </div>
    </ZWidget>
  </div>
</template>

<style scoped>
:deep(.z-widget) {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

:deep(.z-widget):hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(var(--c-primary-rgb), 0.15);
}

:deep(.z-widget__content) {
  position: relative;
  z-index: 2;
  padding: 0; /* 移除内边距，由.status-content控制 */
  overflow: hidden; /* 确保圆角效果不被破坏 */
}

.status-content {
  position: relative;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 12px;
  padding: 1rem;
  margin: -1rem; /* 抵消父容器的padding */
  width: calc(100% + 2rem); /* 扩展到父容器的完整宽度 */
}

.texture-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='15' y='10' width='20' height='30' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1.5' transform='rotate(10,25,25)'/%3E%3Crect x='60' y='25' width='25' height='25' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1'/%3E%3Crect x='10' y='60' width='40' height='15' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1.2'/%3E%3Crect x='65' y='65' width='20' height='20' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1.5' transform='rotate(-15,75,75)'/%3E%3Crect x='30' y='40' width='35' height='25' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1'/%3E%3C/svg%3E");
  opacity: 0.5;
  z-index: 1;
  transition: opacity 0.3s ease;
  border-radius: 12px;
}

:deep(.z-widget):hover .texture-overlay {
  opacity: 0.7;
}

.status-image-container {
  position: relative;
  z-index: 2;
  padding: 0.5rem 0;
}

.status-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

:deep(.z-widget):hover .status-image {
  transform: scale(1.02);
}

.status-text {
  position: relative;
  z-index: 2;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  margin-top: 0.75rem; /* 减少上边距 */
  margin-bottom: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.status-card-wrapper {
  position: relative;
}

.status-card {
  position: relative;
}
</style>