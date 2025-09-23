<script setup lang="ts">
// 设置页面元数据
definePageMeta({
  name: 'travel-detail'
})

import travels from '~/travels'
import { useRoute, useHead, onMounted, ref, computed, watch } from '#imports'
import { createError } from '#imports'
import { useLayoutStore } from '~/stores/layout'
import { useAppConfig } from '#imports'
import type { WidgetName } from '~/composables/useWidgets'

const route = useRoute()
const travelId = ref(route.params.id as string)
const travel = ref<typeof travels[0] | null>(null)
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
  if (travel.value && travel.value.photos) {
    currentPhotoIndex.value = (currentPhotoIndex.value + 1) % travel.value.photos.length
    const photo = travel.value.photos[currentPhotoIndex.value]
    if (photo) {
      currentPhoto.value = photo
    }
  }
}

// 切换到上一张照片
const prevPhoto = () => {
  if (travel.value && travel.value.photos) {
    currentPhotoIndex.value = (currentPhotoIndex.value - 1 + travel.value.photos.length) % travel.value.photos.length
    const photo = travel.value.photos[currentPhotoIndex.value]
    if (photo) {
      currentPhoto.value = photo
    }
  }
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

// 设置布局
const layoutStore = useLayoutStore()

// 根据配置决定是否显示侧边栏图片
const asideWidgets = computed<WidgetName[]>(() => {
  const widgets: WidgetName[] = ['blog-stats', 'announcement-card', 'theme-card']
  
  // 如果启用了侧边栏图片，在公告后添加图片组件
  if (appConfig.sidebarImage?.enabled) {
    // 在 'announcement-card' 后插入 'sidebar-image'
    const announcementIndex = widgets.indexOf('announcement-card')
    if (announcementIndex !== -1) {
      widgets.splice(announcementIndex + 1, 0, 'sidebar-image')
    }
  }
  
  return widgets
})

watch(asideWidgets, (newWidgets) => {
  layoutStore.setAside(newWidgets)
}, { immediate: true })

// 在组件挂载后确保能正确获取路由参数
onMounted(() => {
  // 增加更多调试信息
  console.log('Route params (mounted):', route.params)
  console.log('Full route (mounted):', route)
  console.log('Travel ID (mounted):', travelId.value)
  console.log('Available travels:', travels.map(t => t.id))

  // 确保 travelId 是字符串并且不为空
  if (!travelId.value || typeof travelId.value !== 'string') {
    console.error('Invalid travel ID:', travelId.value)
    throw createError({ statusCode: 400, statusMessage: '无效的旅行ID' })
  }

  // 查找对应的旅行数据
  const foundTravel = travels.find(t => t.id === travelId.value)
  
  if (!foundTravel) {
    console.error('Travel not found:', travelId.value)
    throw createError({ statusCode: 404, statusMessage: '旅行记录未找到' })
  }
  
  travel.value = foundTravel
  console.log('Found travel:', travel.value)
})

// 初始化时也尝试查找旅行数据
const initialTravel = travels.find(t => t.id === travelId.value)
if (initialTravel) {
  travel.value = initialTravel
  console.log('Initial travel found:', travel.value)
} else {
  console.warn('Initial travel not found, waiting for mount:', travelId.value)
}

// 设置页面标题
useHead({
  title: travel.value ? `${travel.value.location}旅行 - ${travel.value.date.split('-')[0]}年` : '旅行详情'
})
</script>

<template>
  <div class="travel-detail">
    <div v-if="travel && travel.id">
      <h1 class="page-title">{{ travel.location }}旅行</h1>
      <!-- 头部信息区域 -->
      <div class="header-section">
        <div class="cover-image">
          <NuxtImg 
            :src="travel.coverImage" 
            :alt="travel.location" 
            loading="eager" 
            :width="800" 
            :quality="95" 
            densities="x1 x1.5 x2 x3" 
            sizes="100vw" 
            :modifiers="{ fit: 'cover', background: 'transparent' }" 
            class="main-cover"
          />
        </div>
        
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
            
            <div class="info-item">
              <div class="label">交通工具</div>
              <div class="value">
                <Icon :name="appConfig.travel?.transportation?.[travel.transportation]?.icon || 'ph:question-bold'" 
                      class="transport-icon" />
                {{ travel.transportation }}
              </div>
            </div>
            
            <div class="info-item">
              <div class="label">游玩天数</div>
              <div class="value">{{ travel.duration }}</div>
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
          >
            <NuxtImg 
              :src="photo" 
              :alt="`${travel.location} 照片 ${index + 1}`" 
              loading="lazy" 
              :width="400" 
              :height="300"
              :quality="90" 
              densities="x1 x1.5 x2 x3" 
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" 
              :modifiers="{ fit: 'cover', background: 'transparent' }" 
              class="photo-image"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="loading-state">
      <p>正在加载旅行信息...</p>
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
        
        <img 
          :src="currentPhoto" 
          :alt="`旅行照片 ${currentPhotoIndex + 1}`"
          class="preview-image"
        />
        
        <button v-if="travel?.photos && travel.photos.length > 1" class="nav-btn next-btn" @click="nextPhoto">
          <Icon name="ph:caret-right-bold" size="32" />
        </button>
      </div>

      <div v-if="travel?.photos && travel.photos.length > 1" class="photo-counter">
        {{ currentPhotoIndex + 1 }} / {{ travel.photos.length }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.travel-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  
  .page-title {
    font-size: 2rem;
    font-weight: 800;
    text-align: center;
    margin-bottom: 2rem;
    color: var(--c-primary);
  }
  
  .loading-state {
    text-align: center;
    padding: 3rem 0;
    font-size: 1.2rem;
    color: var(--c-text-2);
  }
  
  .header-section {
    margin-bottom: 3rem;
    
    .cover-image {
      width: 100%;
      height: 400px;
      border-radius: 1.5rem;
      overflow: hidden;
      margin-bottom: 2rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
      
      .main-cover {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
    
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
            gap: 0.5rem;
          }
          
          .transport-icon {
            font-size: 1.2rem;
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
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 1.5rem;
      
      .photo-item {
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
        
        &:hover {
          transform: translateY(-4px);
        }
        
        .photo-image {
          width: 100%;
          height: 300px;
          object-fit: cover;
          object-position: center;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .travel-detail {
    padding: 1rem 0.5rem;
    
    .header-section {
      .cover-image {
        height: 300px;
        border-radius: 1rem;
      }
      
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
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
        
        .photo-item {
          .photo-image {
            height: 250px;
          }
        }
      }
    }
  }
}

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
}

.photo-preview-modal .preview-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: var(--ld-bg-card);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.photo-preview-modal .close-btn {
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
  color: var(--c-primary);
  cursor: pointer;
  backdrop-filter: blur(20px);
  transition: all 0.2s ease;
  z-index: 10;
}

.photo-preview-modal .close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.photo-preview-modal .preview-image-container {
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 20px;
  width: 1000px;
  height: 700px;
  position: relative;
}

.photo-preview-modal .preview-image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
}

/* 左右导航按钮 */
.photo-preview-modal .nav-btn {
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
  color: var(--c-primary);
  cursor: pointer;
  backdrop-filter: blur(20px);
  transition: all 0.2s ease;
  opacity: 0.8;
  z-index: 10;
  box-shadow: 0 0 0 2px var(--c-primary), 0 4px 12px rgba(0, 0, 0, 0.3);
}

.photo-preview-modal .nav-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  opacity: 1;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 0 0 3px var(--c-primary), 0 6px 16px rgba(0, 0, 0, 0.4);
}

.photo-preview-modal .nav-btn.prev-btn {
  left: 20px;
}

.photo-preview-modal .nav-btn.next-btn {
  right: 20px;
}

/* 页码指示器 */
.photo-preview-modal .photo-counter {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.9);
  padding: 0.75rem 2rem;
  border-radius: 2rem;
  color: var(--c-primary);
  font-size: 1.2rem;
  font-weight: 700;
  z-index: 10;
  box-shadow: 0 0 0 2px var(--c-primary), 0 4px 12px rgba(0, 0, 0, 0.3);
  border: 2px solid var(--c-primary);
}

@media (max-width: 768px) {
  .photo-preview-modal .preview-content .close-btn {
    top: 0.5rem;
    right: 0.5rem;
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .photo-preview-modal .preview-content .nav-btn {
    width: 50px;
    height: 50px;
  }
  
  .photo-preview-modal .preview-content .nav-btn.prev-btn {
    left: 10px;
  }
  
  .photo-preview-modal .preview-content .nav-btn.next-btn {
    right: 10px;
  }
}

@media (max-width: 480px) {
  .travel-detail .header-section .info-panel .info-grid {
    grid-template-columns: 1fr;
  }
  
  .photo-preview-modal .photo-counter {
    font-size: 1rem;
    padding: 0.5rem 1.5rem;
    bottom: 1.5rem;
  }
  
  .photo-preview-modal .preview-image-container {
    width: 90vw;
    height: 70vh;
    padding: 15px;
  }
}
</style>