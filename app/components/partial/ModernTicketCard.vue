<script setup lang="ts">
interface ModernTicketCardProps {
  title: string
  subtitle?: string
  description?: string
  image: string
  href: string
  tags?: string[]
  meta?: string
  status?: string
  badgeText?: string
  badgeColor?: string
  gender?: 'male' | 'female'
}

const props = defineProps<ModernTicketCardProps>()

const handleClick = () => {
  if (props.href) {
    window.open(props.href, '_blank')
  }
}
</script>

<template>
  <article :class="['modern-ticket-card', props.gender]" @click="handleClick">
    <!-- 左侧装饰条纹 -->
    <div class="side-decoration left">
      <div class="decoration-line" v-for="n in 3" :key="'left-' + n"></div>
    </div>

    <!-- 卡片主体 -->
    <div class="card-content">
      <!-- 左侧头像区域 -->
      <div class="avatar-section">
        <img :src="props.image" :alt="props.title" class="avatar" />
        <div v-if="props.status" class="status-badge">{{ props.status }}</div>
        <div v-if="props.badgeText" class="recommendation-badge" :style="{ backgroundColor: props.badgeColor }">
          {{ props.badgeText }}
        </div>
      </div>

      <!-- 右侧信息区域 -->
      <div class="info-section">
        <div class="info-header">
          <h3 class="card-title">{{ props.title }}</h3>
          <p v-if="props.subtitle" class="card-subtitle">{{ props.subtitle }}</p>
        </div>

        <p v-if="props.description" class="card-description">{{ props.description }}</p>

        <div class="info-footer">
          <div v-if="props.tags && props.tags.length" class="tags-container">
            <span v-for="tag in props.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <span v-if="props.meta" class="meta-info">{{ props.meta }}</span>
        </div>
      </div>
    </div>

    <!-- 右侧装饰条纹 -->
    <div class="side-decoration right">
      <div class="decoration-line" v-for="n in 3" :key="'right-' + n"></div>
    </div>

    <!-- 装饰性边缘 -->
    <div class="decorative-edge left"></div>
    <div class="decorative-edge right"></div>
  </article>
</template>

<style lang="scss" scoped>
.modern-ticket-card {
  --card-width: 380px;
  --card-height: 160px;
  --primary-color: #2563eb;
  --secondary-color: #3b82f6;
  --accent-color: #60a5fa;
  --bg-color: var(--ld-bg-card, #ffffff);
  --text-primary: var(--c-text-1, #1f2937);
  --text-secondary: var(--c-text-2, #6b7280);
  --border-color: var(--c-border, #e5e7eb);
  --shadow-color: var(--ld-shadow, rgba(0, 0, 0, 0.08));
  --hover-shadow-color: var(--ld-shadow-hover, rgba(0, 0, 0, 0.15));

  /* 男性主题 - 蓝色 */
  &.male {
    --primary-color: #1e40af;
    --secondary-color: #3b82f6;
    --accent-color: #60a5fa;
  }

  /* 女性主题 - 粉色 */
  &.female {
    --primary-color: #be185d;
    --secondary-color: #ec4899;
    --accent-color: #f472b6;
  }

  width: var(--card-width);
  height: var(--card-height);
  background: var(--bg-color);
  border-radius: 16px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 2px 12px var(--shadow-color),
    0 0 0 1px var(--border-color);
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 8px 25px var(--hover-shadow-color),
      0 0 0 1px var(--primary-color);
    
    .decorative-edge {
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    }
  }

  &:active {
    transform: translateY(0);
    transition: all 0.1s ease;
  }
}

.card-content {
  display: flex;
  height: 100%;
  padding: 20px;
  gap: 16px;
  position: relative;
  z-index: 2;
}

/* 头像区域 */
.avatar-section {
  position: relative;
  flex-shrink: 0;

  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    object-fit: cover;
    border: 2px solid var(--border-color);
    background: linear-gradient(135deg, var(--ld-bg-subtle), var(--ld-bg-muted));
  }

  .status-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.7rem;
    font-weight: 600;
    border: 2px solid var(--bg-color);
  }

  .recommendation-badge {
    position: absolute;
    top: -8px;
    left: -8px;
    color: white;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 700;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    z-index: 4;
    white-space: nowrap;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    transform: rotate(-5deg);
    animation: pulse 2s infinite;
    border: 2px solid var(--bg-color);
  }

  @keyframes pulse {
    0%, 100% {
      transform: rotate(-5deg) scale(1);
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
    }
    50% {
      transform: rotate(-5deg) scale(1.05);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
  }

  /* 悬停时推荐标签效果 */
  .avatar-section:hover .recommendation-badge {
    animation: none;
    transform: rotate(-5deg) scale(1.1);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
  }
}

/* 信息区域 */
.info-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
}

.info-header {
  margin-bottom: 8px;

  .card-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 4px 0;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card-subtitle {
    font-size: 0.85rem;
    color: var(--primary-color);
    margin: 0;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.card-description {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin: 0 0 12px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.info-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.tags-container {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  
  .tag {
    padding: 2px 8px;
    background: linear-gradient(135deg, var(--accent-color), var(--secondary-color));
    color: white;
    border-radius: 10px;
    font-size: 0.75rem;
    font-weight: 500;
    white-space: nowrap;
  }
}

.meta-info {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 500;
  white-space: nowrap;
}

/* 侧边装饰条纹 */
.side-decoration {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  z-index: 1;

  &.left {
    left: 4px;
  }

  &.right {
    right: 4px;
  }

  .decoration-line {
    width: 2px;
    height: 20px;
    background: linear-gradient(
      to bottom,
      var(--primary-color),
      var(--secondary-color)
    );
    border-radius: 1px;
    opacity: 0.6;
    transition: all 0.3s ease;
  }
}

/* 装饰性边缘 - 重新设计 */
.decorative-edge {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(
    to bottom,
    var(--primary-color) 0%,
    var(--secondary-color) 50%,
    var(--accent-color) 100%
  );
  transition: all 0.3s ease;
  z-index: 0;
  opacity: 0.8;

  &.left {
    left: 0;
    border-radius: 12px 0 0 12px;
    box-shadow: 2px 0 8px var(--shadow-color);
  }

  &.right {
    right: 0;
    border-radius: 0 12px 12px 0;
    box-shadow: -2px 0 8px var(--shadow-color);
  }
}

/* 悬停时效果增强 */
.modern-ticket-card:hover {
  .side-decoration .decoration-line {
    opacity: 0.9;
    height: 24px;
    background: linear-gradient(
      to bottom,
      var(--secondary-color),
      var(--primary-color)
    );
  }

  .decorative-edge {
    opacity: 1;
    width: 5px;
    
    &.left {
      box-shadow: 3px 0 12px var(--hover-shadow-color);
    }
    
    &.right {
      box-shadow: -3px 0 12px var(--hover-shadow-color);
    }
  }
}

/* 添加角部装饰 */
.modern-ticket-card::before,
.modern-ticket-card::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--bg-color);
  z-index: 2;
  box-shadow: 0 2px 4px var(--shadow-color);
}

.modern-ticket-card::before {
  top: -4px;
  left: -4px;
  border-radius: 0 0 8px 0;
}

.modern-ticket-card::after {
  top: -4px;
  right: -4px;
  border-radius: 0 0 0 8px;
}

/* 四角圆点装饰 */
.modern-ticket-card::before,
.modern-ticket-card::after {
  &::before {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    background: var(--primary-color);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.6;
  }
}



/* 响应式设计 */
@media (max-width: 768px) {
  .modern-ticket-card {
    --card-width: 320px;
    --card-height: 120px;
    
    .card-content {
      padding: 16px;
      gap: 12px;
    }
    
    .avatar {
      width: 50px;
      height: 50px;
    }
    
    .card-title {
      font-size: 1rem;
    }
    
    .card-subtitle {
      font-size: 0.8rem;
    }
    
    .card-description {
      font-size: 0.75rem;
    }
  }
}

/* 确保可访问性 */
.modern-ticket-card:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}
</style>