<script setup lang="ts">
import type { PetItem } from '~/pets'

const props = defineProps<{ pet: PetItem }>()

const getGenderImage = (gender: string) => {
  return gender === 'male' 
    ? 'https://cdn.atao.cyou/Web/male.png'
    : 'https://cdn.atao.cyou/Web/female.png'
}
</script>

<template>
<div class="pet-card">
  <div class="pet-image">
    <img :src="pet.image" :alt="pet.name" class="cover" />
    <div class="pet-badge">
      <img :src="getGenderImage(pet.gender)" :alt="pet.gender" class="gender-image" />
    </div>
  </div>
  
  <div class="pet-info">
    <h3 class="pet-name">{{ pet.name }}</h3>
    <p class="pet-breed">{{ pet.breed }}</p>
    
    <div class="pet-stats">
      <div class="stat">
        <span class="stat-label">年龄</span>
        <span class="stat-value">{{ pet.age }} 岁</span>
      </div>
      <div class="stat">
        <span class="stat-label">体重</span>
        <span class="stat-value">{{ pet.weight }} 斤</span>
      </div>
    </div>
    
    <p v-if="pet.description" class="pet-description">{{ pet.description }}</p>
  </div>
</div>
</template>

<style lang="scss" scoped>
.pet-card {
  padding: 1.5rem;
  border-radius: 1rem;
  background: transparent;
  border: 2px solid var(--c-border);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    border-color: rgba(var(--c-primary-rgb, 66, 184, 131), 0.5);
    box-shadow: 
      0 8px 24px rgba(0, 0, 0, 0.08),
      0 2px 6px rgba(0, 0, 0, 0.02);
  }

  .pet-image {
    position: relative;
    width: 100%;
    height: 200px;
    border-radius: 0.75rem;
    overflow: hidden;
    background: var(--ld-bg-subtle);
    margin-bottom: 1rem;
    
    .cover {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
    
    .pet-badge {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      
      .gender-icon {
        font-size: 1.25rem;
        font-weight: bold;
        background: rgba(255, 255, 255, 0.9);
        padding: 0.25rem 0.5rem;
        border-radius: 0.375rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    }
  }

  .pet-info {
    .pet-name {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--c-text-1);
      margin: 0 0 0.25rem 0;
    }
    
    .pet-breed {
      font-size: 0.875rem;
      color: var(--c-text-2);
      margin: 0 0 1rem 0;
      opacity: 0.8;
    }
    
    .pet-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
      margin-bottom: 1rem;
      
      .stat {
        text-align: center;
        padding: 0.5rem;
        background: var(--ld-bg-subtle);
        border-radius: 0.5rem;
        
        .stat-label {
          display: block;
          font-size: 0.75rem;
          color: var(--c-text-3);
          margin-bottom: 0.25rem;
        }
        
        .stat-value {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--c-text-1);
          font-family: 'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif;
        }
      }
    }
    
    .pet-description {
      font-size: 0.875rem;
      color: var(--c-text-2);
      line-height: 1.5;
      margin: 0;
    }
  }
}

@media (max-width: 640px) {
  .pet-card {
    padding: 1rem;
    
    .pet-image {
      height: 160px;
    }
    
    .pet-info {
      .pet-name {
        font-size: 1.125rem;
      }
      
      .pet-stats {
        grid-template-columns: 1fr;
        gap: 0.5rem;
      }
    }
  }
}
</style>