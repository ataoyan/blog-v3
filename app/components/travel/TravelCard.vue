<script setup lang="ts">
import type { TravelItem } from '~/travels'
import { navigateTo } from '#imports'

const props = defineProps<{ item: TravelItem }>()

const handleClick = async () => {
  try {
    await navigateTo(`/travels/detail/${props.item.id}`, {
      replace: false,
      external: false,
      open: {
        target: '_self'
      }
    })
  } catch (error) {
    console.error('导航失败:', error)
    // 如果导航失败，尝试强制刷新
    window.location.href = `/travels/detail/${props.item.id}`
  }
}
</script>

<template>
  <div class="travel-card" @click="handleClick">
    <div class="card-content">
      <div class="image-container">
        <NuxtImg 
          class="cover" 
          :src="props.item.coverImage + '?t=' + Date.now()" 
          :alt="props.item.location" 
          loading="lazy" 
          :width="300" 
          :quality="90" 
          densities="x1 x1.5 x2 x3" 
          sizes="200px" 
          :modifiers="{ fit: 'cover', background: 'transparent' }" 
        />
      </div>
      
      <div class="province-badge">{{ props.item.province }}</div>
      <div class="meta">
        <div class="info-row">
          <span class="year">{{ props.item.year }}年{{ props.item.date.split('-')[1] }}月</span>
          <span class="dot">·</span>
          <span class="location">{{ props.item.location }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.travel-card {
  padding: 1rem;
  border-radius: 1rem;
  background: var(--ld-bg-card);
  border: 1px solid var(--c-border);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 200px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px) scale(1.02);
    border-color: var(--c-primary);
    box-shadow: 
      0 8px 24px rgba(0, 0, 0, 0.08),
      0 2px 6px rgba(0, 0, 0, 0.02);
  }
  
  .card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    position: relative;
  }

  .image-container {
    position: relative;
    width: 100%;
    height: 140px;
    border-radius: 0.75rem;
    overflow: hidden;
    background: var(--ld-bg-subtle);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
  }

  .meta {
    width: 100%;
    text-align: center;
    margin-top: 0.25rem;
    padding: 0 0.25rem;
    position: relative;
    
    .info-row {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      
      .year {
        font-size: 0.875rem;
        color: var(--c-text-2);
        font-weight: 500;
      }
      
      .dot {
        color: var(--c-text-3);
        font-weight: bold;
        font-size: 2em;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        margin-top: -2px;
      }
      
      .location {
        margin: 0;
        font-weight: 700;
        font-size: 1rem;
        line-height: 1.2;
        color: var(--c-text-1);
        letter-spacing: -0.01em;
      }
    }
    
  }

  .province-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.75rem;
    background: var(--c-primary);
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }

@media (max-width: 640px) {
  .travel-card {
    padding: 0.75rem;
    min-height: 180px;

    .image-container {
      height: 110px;
    }

    .meta {
      .location {
        font-size: 0.875rem;
      }
    }
  }
}
}
</style>