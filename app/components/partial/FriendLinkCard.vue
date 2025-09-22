<template>
  <div class="friend-link-card">
    <!-- 卡片内部孔洞效果 -->
    <div class="card-punch-hole"></div>
    
    <!-- 卡片标题：友链展示 -->
    <div class="friend-link-card__title">友情链接</div>
    
    <!-- 友链核心信息 -->
    <div class="friend-link-card__info-list">
      <div class="info-item">
        <span class="info-item__label">站点:</span>
        <span class="info-item__content">{{ siteName }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__label">链接:</span>
        <!-- 链接可点击，新窗口打开 -->
        <a 
          :href="siteUrl" 
          class="info-item__content link" 
          target="_blank"
          rel="noopener noreferrer"
        >{{ siteUrl }}</a>
      </div>
      <div class="info-item">
        <span class="info-item__label">描述:</span>
        <span class="info-item__content">{{ siteDesc }}</span>
      </div>
    </div>

    <!-- 站点图标（可选） -->
    <div v-if="siteIcon" class="friend-link-card__icon">
      <img 
        :src="siteIcon" 
        :alt="`${siteName} icon`"
        class="site-icon"
      />
    </div>

    <!-- 右下角upstream图片 -->
    <div v-if="upstream" class="upstream-image">
      <img 
        src="/imgs/upstream.png" 
        alt="upstream"
        class="upstream-img"
      />
    </div>
  </div>
</template>

<script setup>
// 动态接收友链数据
const props = defineProps({
  siteName: {
    type: String,
    default: '示例站点'
  },
  siteUrl: {
    type: String,
    default: 'https://example.com'
  },
  siteDesc: {
    type: String,
    default: '这是一个示例友链站点'
  },
  siteIcon: {
    type: String,
    default: ''
  },
  badgeText: {
    type: String,
    default: 'SHAWARMA'
  },
  badgeTextTop: {
    type: String,
    default: 'WORLD\'S BEST'
  },
  badgeTextBottom: {
    type: String,
    default: 'WORLD\'S BEST'
  },
  upstream: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
/* 卡片容器基础样式 - 参考ModernTicketCard风格 */
.friend-link-card {
  width: 320px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  font-family: 'Arial', sans-serif;
  position: relative;
  transition: all 0.3s ease;
}

/* 卡片标题样式 */
.friend-link-card__title {
  font-size: 16px;
  font-weight: 600;
  color: #2a2a2a;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

/* 信息列表容器 */
.friend-link-card__info-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 单个信息项 */
.info-item {
  display: flex;
  align-items: flex-start;
  min-height: 24px;
}

/* 信息标签 */
.info-item__label {
  width: 80px;
  font-size: 14px;
  font-weight: 500;
  color: #666666;
  flex-shrink: 0;
}

/* 信息内容（普通文本） */
.info-item__content {
  font-size: 14px;
  color: #333333;
  flex: 1;
  word-break: break-all;
  line-height: 1.4;
}

/* 链接样式（特殊处理：蓝色、下划线、hover效果） */
.info-item__content.link {
  color: #165DFF;
  text-decoration: underline;
  transition: opacity 0.2s ease;
}

.info-item__content.link:hover {
  opacity: 0.8;
}

/* 真实穿孔效果 - 带阴影的透明孔洞 */
.card-punch-hole {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px; /* 缩小孔洞尺寸 */
  height: 16px;
  border-radius: 50%;
  background: transparent;
  border: none;
  z-index: 5;
  /* 模拟纸张穿孔的真实阴影效果 */
  box-shadow: 
    0 0 0 1px rgba(0, 0, 0, 0.15),
    inset 0 1px 2px rgba(0, 0, 0, 0.2),
    inset 0 -1px 1px rgba(255, 255, 255, 0.1);
  /* 确保孔洞区域可以点击穿透 */
  pointer-events: none;
}

/* 深色模式适配 - 修复孔洞颜色 */
@media (prefers-color-scheme: dark) {
  .card-punch-hole {
    background: transparent !important;
    box-shadow: 
      0 0 0 1px rgba(255, 255, 255, 0.15),
      inset 0 1px 3px rgba(0, 0, 0, 0.4),
      inset 0 -1px 1px rgba(255, 255, 255, 0.05);
  }
}

/* 站点图标样式 */
.friend-link-card__icon {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
}

.site-icon {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}

/* 卡片hover交互 */
.friend-link-card:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

/* 暗色模式支持 */
@media (prefers-color-scheme: dark) {
  .friend-link-card {
    background-color: #1a1a1a;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .friend-link-card__title {
    color: #ffffff;
    border-bottom-color: #333333;
  }

  .info-item__label {
    color: #999999;
  }

  .info-item__content {
    color: #cccccc;
  }

  .friend-link-card:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }
}

/* upstream图片样式 */
.upstream-image {
  position: absolute;
  top: 60px; /* 调整到更上方位置，避免遮挡描述文字 */
  right: 18px;
  width: 60px; /* 稍微缩小尺寸 */
  height: 60px;
  z-index: 10;
  transition: all 0.3s ease;
  transform: rotate(-25deg); /* 向左旋转25度 */
}

.upstream-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 6px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

/* 悬停效果 */
.upstream-image:hover {
  transform: rotate(-25deg) scale(1.05); /* 保持旋转角度同时缩放 */
  filter: drop-shadow(0 3px 8px rgba(0, 0, 0, 0.25));
}

/* 响应式调整 */
@media (max-width: 480px) {
  .upstream-image {
    width: 50px;
    height: 50px;
    top: 50px; /* 移动端也调整到上方位置 */
    right: 12px;
  }
}




</style>