<script setup lang="ts">
import type { PetItem } from '~/pets'
import { getPetStatus } from '~/pet-status'
import { computed } from 'vue'

const props = defineProps<{ pet: PetItem }>()

const petStatus = computed(() => getPetStatus(props.pet.id))

const getGenderImage = (gender: string) => {
  return gender === 'male' 
    ? 'https://cdn.atao.cyou/Web/male.png'
    : 'https://cdn.atao.cyou/Web/female.png'
}

const calculateAge = (birthday: string) => {
  const birthDate = new Date(birthday)
  const today = new Date()
  
  // 计算总月份差异
  const totalMonths = (today.getFullYear() - birthDate.getFullYear()) * 12 + 
                     (today.getMonth() - birthDate.getMonth())
  
  // 计算天数差异
  const dayDiff = today.getDate() - birthDate.getDate()
  
  // 计算精确年龄（年 + 月/12）
  let exactAge = totalMonths / 12
  
  // 如果天数差为负，调整月份
  if (dayDiff < 0) {
    exactAge -= 1/12 // 减去约0.0833年（1个月）
  }
  
  // 返回精确到1位小数的年龄
  return exactAge.toFixed(1)
}


</script>

<template>
<div class="pet-profile">
  <div class="profile-header">
    <div class="pet-image-large">
      <img :src="pet.image" :alt="pet.name" class="cover" />
    </div>
    
    <div class="pet-basic-info">
      <h1 class="pet-name">{{ pet.name }}</h1>
      <div class="pet-meta">
        <span class="breed">{{ pet.breed }}</span>
        <img :src="getGenderImage(pet.gender)" :alt="pet.gender" class="gender-image" width="16px" height="16px"/>
      </div>
    </div>
  </div>

  <div class="profile-content">
    <div class="info-section" v-if="pet.description">
        <h3>简介</h3>
        <p class="description">{{ pet.description }}</p>
    </div>
    <div class="info-grid">
      <div class="info-item">
        <span class="label">生日</span>
        <span class="value">{{ pet.birthday }}</span>
      </div>
      <div class="info-item">
        <span class="label">年龄</span>
        <span class="value">{{ calculateAge(pet.birthday) }} 岁</span>
      </div>
      <div class="info-item">
        <span class="label">体重</span>
        <span class="value">{{ pet.weight }} 斤</span>
      </div>
      <div class="info-item" v-if="pet.color">
        <span class="label">毛色</span>
        <span class="value">{{ pet.color }}</span>
      </div>
    </div>
    <div class="info-grid" v-if="pet.healthStatus || pet.vaccinationStatus">
      <div class="info-item" v-if="pet.healthStatus">
        <span class="label">健康状况</span>
        <span class="value" :class="{ 'health-good': pet.healthStatus === '良好' }">{{ pet.healthStatus }}</span>
      </div>
      <div class="info-item" v-if="pet.vaccinationStatus">
        <span class="label">疫苗接种</span>
        <span class="value">{{ pet.vaccinationStatus }}</span>
      </div>
    </div>

    <div class="status-timeline" v-if="petStatus.length > 0">
      <h3>最近状态</h3>
      <div class="status-list">
        <div v-for="status in petStatus" :key="status.id" class="status-item">
          <div class="status-date-badge">{{ status.date }}</div>
          <div class="status-content-wrapper">
            <div class="status-content" :class="status.type">
              <img 
                v-if="status.type === 'image'" 
                :src="status.content" 
                :alt="status.description || '状态图片'"
                class="status-image"
              />
              <div v-else class="status-text-content">
                <p class="status-message">{{ status.content }}</p>
              </div>
              <p v-if="status.description" class="status-description">{{ status.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-section" v-if="pet.ownerNotes">
      <h3>主人备注</h3>
      <p class="notes">{{ pet.ownerNotes }}</p>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.pet-profile {
  padding: 2rem;
  border-radius: 1rem;
  background: linear-gradient(135deg, var(--c-bg-soft) 0%, var(--c-bg-card) 100%);
  border: 1px solid var(--c-border);

  .profile-header {
    display: flex;
    gap: 2rem;
    align-items: flex-start;
    margin-bottom: 1.5rem;

    .pet-image-large {
      width: 200px;
      height: 200px;
      border-radius: 1rem;
      overflow: hidden;
      background: #f8f9fa;
      flex-shrink: 0;

      .cover {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }

    .pet-basic-info {
      .pet-name {
        font-size: 2rem;
        font-weight: 700;
        color: var(--c-text-1);
        margin: 0 0 0.5rem 0;
      }

      .pet-meta {
        display: flex;
        gap: 1rem;
        align-items: center;

        .breed {
          font-size: 1.125rem;
          color: var(--c-text-2);
        }

        .gender {
          font-size: 1rem;
          font-weight: 600;
          padding: 0.25rem 0.75rem;
          border-radius: 0.5rem;
          background: rgba(0, 0, 0, 0.05);
        }
      }
    }
  }

  .profile-content {
    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      padding: 1rem;
      background: rgba(0, 0, 0, 0.03);
      border-radius: 0.75rem;

      .label {
        font-size: 0.875rem;
        color: var(--c-text-3);
        margin-bottom: 0.25rem;
      }

      .value {
        font-size: 1rem;
        font-weight: 600;
        color: var(--c-text-1);
        font-family: 'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif;
      }
      
      .health-good {
        color: #10b981;
        font-weight: 700;
      }
    }

    .info-section {
      margin-bottom: 2rem;

      h3 {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--c-text-1);
        margin: 0 0 1rem 0;
      }

      .description, .notes {
        font-size: 1rem;
        line-height: 1.6;
        color: var(--c-text-2);
        margin: 0;
      }
    }
  }
}

.status-timeline {
  margin: 3rem 0 2rem 0;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  padding-top: 2rem;

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--c-text-1);
    margin: 0 0 1.5rem 0;
  }

  .status-list {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    max-height: 800px;
    overflow-y: auto;
    padding-right: 0.5rem;
    
    &::-webkit-scrollbar {
      width: 6px;
    }
    
    &::-webkit-scrollbar-track {
      background: var(--ld-bg-subtle);
      border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: var(--c-text-3);
      border-radius: 3px;
      
      &:hover {
        background: var(--c-text-2);
      }
    }
  }

  .status-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;

    .status-date-badge {
      flex-shrink: 0;
      padding: 0.5rem 0.75rem;
      background: var(--ld-bg-subtle);
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--c-text-2);
      min-width: 80px;
      text-align: center;
    }

    .status-content-wrapper {
      flex: 1;
    }

    .status-content {
      background: var(--ld-bg-card);
      border: 1px solid var(--c-border);
      border-radius: 0.75rem;
      padding: 1rem;
      box-shadow: 0 2px 8px var(--ld-shadow);

      &.image {
        .status-image {
          width: 100%;
          max-height: 300px;
          object-fit: cover;
          border-radius: 0.5rem;
          margin-bottom: 0.75rem;
        }
      }

      &.text {
        .status-message {
          font-size: 1rem;
          line-height: 1.5;
          color: var(--c-text-2);
          margin: 0 0 0.75rem 0;
        }
      }

      .status-description {
        font-size: 0.875rem;
        color: var(--c-text-3);
        font-style: italic;
        margin: 0;
        padding-top: 0.75rem;
        border-top: 1px solid var(--c-border);
      }
    }
  }
}

@media (max-width: 768px) {
  .pet-profile {
    padding: 1.5rem;

    .profile-header {
      flex-direction: column;
      text-align: center;
      gap: 1.5rem;

      .pet-image-large {
        width: 150px;
        height: 150px;
      }

      .pet-basic-info {
        .pet-name {
          font-size: 1.75rem;
        }
      }
    }

    .profile-content {
      .info-grid {
        grid-template-columns: 1fr;
      }
    }

    .status-timeline {
      margin: 2rem 0 1.5rem 0;
      padding-top: 1.5rem;

      .status-item {
        flex-direction: column;
        gap: 0.75rem;

        .status-date-badge {
          align-self: flex-start;
          min-width: auto;
          padding: 0.375rem 0.75rem;
        }
      }
    }
  }
}
</style>