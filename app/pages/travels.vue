<script setup lang="ts">
import travels from '~/travels'
import TravelCard from '~/components/travel/TravelCard.vue'
import { useLayoutStore } from '~/stores/layout'
import { useRoute, useHead, navigateTo } from '#imports'
import { useAppConfig } from '#imports'

const route = useRoute()
const layoutStore = useLayoutStore()
layoutStore.setAside(['blog-stats', 'announcement-card', 'work-status', 'theme-card'])
const appConfig = useAppConfig()

// 照片预览状态
const showPreview = ref(false)
const currentPhoto = ref('')
const currentPhotoIndex = ref(0)

// 打开照片预览
const openPhotoPreview = (photo: string, index: number) => {
  currentPhoto.value = photo
  currentPhotoIndex.value = index
  showPreview.value = true
}

// 关闭照片预览
const closePhotoPreview = () => {
  showPreview.value = false
}

// 切换到下一张照片
const nextPhoto = () => {
  if (travel && travel.photos) {
    currentPhotoIndex.value = (currentPhotoIndex.value + 1) % travel.photos.length
    currentPhoto.value = travel.photos[currentPhotoIndex.value]
  }
}

// 切换到上一张照片
const prevPhoto = () => {
  if (travel && travel.photos) {
    currentPhotoIndex.value = (currentPhotoIndex.value - 1 + travel.photos.length) % travel.photos.length
    currentPhoto.value = travel.photos[currentPhotoIndex.value]
  }
}

// 返回旅行列表
const goBackToList = async () => {
  try {
    await navigateTo('/travels')
    // 如果导航成功但页面没有刷新，强制刷新
    setTimeout(() => {
      window.location.reload()
    }, 100)
  } catch (error) {
    console.error('导航失败:', error)
    // 如果导航失败，尝试强制跳转
    window.location.href = '/travels'
  }
}

// 检测是否为视频文件
const isVideoFile = (url: string) => {
  return url.toLowerCase().endsWith('.mp4') || url.toLowerCase().endsWith('.webm') || url.toLowerCase().endsWith('.ogg')
}

// 获取视频缩略图（使用客户端方式显示视频预览）
const getVideoThumbnail = (videoUrl: string) => {
  // 服务器不支持生成缩略图，使用客户端方式
  // 创建一个视频元素来显示视频预览
  return videoUrl
}

// 处理视频加载
const handleVideoLoad = (event: Event) => {
  const video = event.target as HTMLVideoElement
  // 确保视频不会自动播放，只显示第一帧
  video.currentTime = 0.1
  video.pause()
}

// 键盘事件监听
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (showPreview.value) {
      if (e.key === 'Escape') {
        closePhotoPreview()
      } else if (e.key === 'ArrowRight') {
        nextPhoto()
      } else if (e.key === 'ArrowLeft') {
        prevPhoto()
      }
    }
  }

  window.addEventListener('keydown', handleKeydown)
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
})

const travelId = route.params.id as string
const travel = travels.find(t => t.id === travelId)

if (travel) {
  useHead({
    title: `${travel.location}旅行 - ${travel.date.split('-')[0]}年`
  })
}
</script>

<template>
<div class="page-travels">
  <div v-if="!travel" class="grid">
    <TravelCard v-for="item in travels" :key="item.id" :item="item" />
  </div>
  <div v-else class="travel-detail">
    <div class="detail-header">
      <button @click="goBackToList" class="back-button">
        &larr; 返回旅行列表
      </button>
    </div>
    <!-- 头部信息区域 -->
    <div class="header-section">
      <div class="info-panel">
        <div class="info-grid">
          <div class="info-item">
            <div class="label">旅行日期</div>
            <div class="value">{{ travel.date }}</div>
          </div>
          
          <div class="info-item">
            <div class="label">地点</div>
            <div class="value">{{ travel.location }}</div>
          </div>
          
          <div class="info-item" v-if="travel.attractions && travel.attractions.length > 0">
            <div class="label">景点</div>
            <div class="value attractions-list">
              <span v-for="attraction in travel.attractions" :key="attraction.name" 
                    class="attraction-tag" :style="{ backgroundColor: attraction.color }">
                {{ attraction.name }}
              </span>
            </div>
          </div>
          
          <div class="info-item">
            <div class="label">游玩天数</div>
            <div class="value">{{ travel.duration }}</div>
          </div>
          
          <div class="info-item">
            <div class="label">交通工具</div>
              <div class="value">
                <Icon :name="appConfig.travel?.transportation?.[travel.transportation]?.icon || 'ph:question-bold'" 
                      class="transport-icon" />
                {{ travel.transportation }}
              </div>
          </div>
          
          <div class="info-item">
            <div class="label">天气</div>
            <div class="value">{{ travel.weather }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 照片集区域 -->
    <div class="photos-section">
      <h2 class="section-title">旅行照片集</h2>
      <div class="photos-grid">
        <div 
          v-for="(photo, index) in travel.photos" 
          :key="index" 
          class="photo-item"
          @click="openPhotoPreview(photo, index)"
        >
          <NuxtImg 
            v-if="!isVideoFile(photo)"
            :src="photo" 
            :alt="`${travel.location} 照片 ${index + 1}`" 
            loading="lazy" 
            :width="400" 
            :quality="90" 
            densities="x1 x1.5 x2 x3" 
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" 
            :modifiers="{ fit: 'cover', background: 'transparent' }" 
            class="photo-image"
          />
          <video
            v-else
            :src="getVideoThumbnail(photo)"
            :alt="`${travel.location} 视频 ${index + 1}`"
            class="photo-image"
            muted
            preload="metadata"
            @loadedmetadata="handleVideoLoad"
          />
          <div v-if="isVideoFile(photo)" class="video-indicator">
            <Icon name="ph:play-circle" size="24" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 照片预览模态框 -->
  <div v-if="showPreview" class="photo-preview-modal" @click="closePhotoPreview">
    <div class="preview-content" @click.stop>
      <button class="close-btn" @click="closePhotoPreview">
        <Icon name="ph:x-bold" />
      </button>
      
      <div class="preview-image-container">
        <button v-if="travel?.photos && travel.photos.length > 1" class="nav-btn prev-btn" @click="prevPhoto">
          <Icon name="ph:caret-left-bold" size="32" />
        </button>
        
        <NuxtImg 
          v-if="!isVideoFile(currentPhoto)"
          :src="currentPhoto" 
          :alt="`${travel.location} 照片 ${currentPhotoIndex + 1}`"
          class="preview-image"
        />
        <video
          v-else
          :src="currentPhoto"
          controls
          autoplay
          muted
          class="preview-video"
        >
          您的浏览器不支持视频播放。
        </video>
        
        <button v-if="travel?.photos && travel.photos.length > 1" class="nav-btn next-btn" @click="nextPhoto">
          <Icon name="ph:caret-right-bold" size="32" />
        </button>
      </div>

      <div class="photo-counter">
        {{ currentPhotoIndex + 1 }} / {{ travel.photos.length }}
      </div>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.page-travels {
  min-height: 90vh;
  
  .title {
    font-size: 1.6rem;
    font-weight: 800;
    margin: 0 0 1rem 0;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 0.5rem 0 1rem;
    gap: 1rem;
    position: relative;
  }

  .tabs {
    display: inline-flex;
    gap: 0.5rem;
    flex-wrap: wrap;

    .tab {
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      background: var(--ld-bg-card);
      border: 1px solid var(--c-border);
      box-shadow: 0 2px 10px var(--ld-shadow);
      transition: all 0.2s;
      font-weight: 600;

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 16px var(--ld-shadow);
      }

      &.active {
        background: var(--c-primary);
        border-color: transparent;
        color: white;
        box-shadow: 0 8px 20px var(--ld-shadow);
      }

      &:focus-visible {
        outline: 2px solid color-mix(in oklab, var(--c-primary) 60%, white);
        outline-offset: 2px;
      }
    }
  }

  .grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    justify-content: center;
    padding: 1rem 0;
  }

  @media (max-width: 1024px) {
    .grid {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 0.875rem;
    }
  }

  @media (max-width: 640px) {
    .grid {
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 0.75rem;
    }
  }
}

.travel-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  
  .detail-header {
    margin-bottom: 1.5rem;
    
    .back-button {
      display: inline-flex;
      align-items: center;
      padding: 0.5rem 1rem;
      background: transparent;
      border: 1px solid var(--c-border);
      border-radius: 0.5rem;
      color: var(--c-text-2);
      font-weight: 500;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        color: var(--c-primary);
        border-color: var(--c-primary);
      }
      
      &:active {
        transform: scale(0.98);
      }
    }
  }
  

  
  .header-section {
    margin-bottom: 3rem;
    
    .info-panel {
      background: var(--ld-bg-card);
      border-radius: 1rem;
      padding: 2rem;
      border: 1px solid var(--c-border);
      box-shadow: 0 4px 20px var(--ld-shadow);
      
      .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        
        .info-item {
          text-align: center;
          
          .label {
            font-size: 0.875rem;
            color: var(--c-text-2);
            font-weight: 500;
            margin-bottom: 0.5rem;
          }
          
          .value {
            font-size: 1.125rem;
            font-weight: 600;
            color: var(--c-text-1);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
          }
          
          .transport-icon {
            font-size: 1.2rem;
          }
          
          .attractions-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            justify-content: center;
          }
          
          .attraction-tag {
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            color: white;
            font-size: 0.875rem;
            font-weight: 500;
            white-space: nowrap;
          }
        }
      }
    }
  }
  
  .photos-section {
    .section-title {
      font-size: 1.75rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 2rem;
      color: var(--c-text-1);
    }
    
    .photos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      
      .photo-item {
        position: relative;
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
        
        &:hover {
          transform: translateY(-4px);
        }
        
        .photo-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
          object-position: center;
        }
        
        video.photo-image {
          background-color: #f0f0f0;
        }
        
        .video-indicator {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0, 0, 0, 0.7);
          border-radius: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          z-index: 2;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .travel-detail {
    padding: 1rem 0.5rem;
    
    .header-section {
      .info-panel {
        padding: 1.5rem;
        
        .info-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
      }
    }
    
    .photos-section {
      .photos-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
        
        .photo-item {
          .photo-image {
            height: 200px;
          }
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .travel-detail {
    .header-section {
      .info-panel {
        .info-grid {
          grid-template-columns: 1fr;
        }
      }
    }
  }
}

/* 照片预览模态框样式 */
.photo-preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
  
  .preview-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    background: var(--ld-bg-card);
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    
    .close-btn {
      position: absolute;
      top: -50px;
      right: 0;
      background: rgba(255, 255, 255, 0.12);
      border: none;
      border-radius: 50%;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      cursor: pointer;
      backdrop-filter: blur(20px);
      transition: all 0.2s ease;
      z-index: 10;
      
      &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: scale(1.1);
      }
    }
    
    .preview-image-container {
      max-width: 80vw;
      max-height: 70vh;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .preview-image {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        object-fit: contain;
      }
      
      .preview-video {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
    }
    
    /* 左右导航按钮 */
    .nav-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.12);
      border: none;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      cursor: pointer;
      backdrop-filter: blur(20px);
      transition: all 0.2s ease;
      opacity: 0.8;
      z-index: 10;
      
      &:hover {
        background: rgba(255, 255, 255, 0.2);
        opacity: 1;
        transform: translateY(-50%) scale(1.1);
      }
      
      &.prev-btn {
        left: 20px;
      }
      
      &.next-btn {
        right: 20px;
      }
    }
    
    /* 页码指示器 - 高对比度确保可读性 */
    .photo-counter {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(255, 255, 255, 0.95);
      padding: 0.75rem 2rem;
      border-radius: 2rem;
      color: #000;
      font-size: 1.2rem;
      font-weight: 700;
      z-index: 10;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
      border: 2px solid rgba(255, 255, 255, 0.8);
    }
      
      .control-btn {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        background: var(--c-primary);
        color: white;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        
        &:hover {
          background: var(--c-primary-dark);
          transform: scale(1.1);
        }
        
        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
      
      .photo-counter {
        font-size: 1.2rem;
        font-weight: 600;
        color: var(--c-text-1);
        min-width: 6rem;
        text-align: center;
      }
    }
  }


/* 响应式设计 */
@media (max-width: 768px) {
  .photo-preview-modal {
    .preview-content {
      .close-btn {
        top: 0.5rem;
        right: 0.5rem;
        width: 2.5rem;
        height: 2.5rem;
      }
      
      .nav-btn {
        width: 50px;
        height: 50px;
        
        &.prev-btn {
          left: 10px;
        }
        
        &.next-btn {
          right: 10px;
        }
      }
      
      .photo-counter {
        font-size: 1rem;
        padding: 0.5rem 1rem;
      }
    }
  }
}
</style>