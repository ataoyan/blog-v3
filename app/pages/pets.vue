<script setup lang="ts">
import pets from '~/pets'
import PetCard from '~/components/pet/PetCard.vue'
import PetProfile from '~/components/pet/PetProfile.vue'
import { useLayoutStore } from '~/stores/layout'
import { useAppConfig } from '#imports'
import { ref, computed, watch } from 'vue'
import type { WidgetName } from '~/composables/useWidgets'

const layoutStore = useLayoutStore()
const appConfig = useAppConfig()

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

const selectedPetId = ref<string>(pets[0]?.id || '')
const selectedPet = ref(pets.find(pet => pet.id === selectedPetId.value) || undefined)

const selectPet = (petId: string) => {
  selectedPetId.value = petId
  const foundPet = pets.find(pet => pet.id === petId)
  selectedPet.value = foundPet ? { ...foundPet } : undefined
}
</script>

<template>
<div class="page-pets">
  <div class="header">
    <div class="tabs">
      <button
        v-for="pet in pets"
        :key="pet.id"
        :class="['tab', { active: selectedPetId === pet.id }]"
        @click="selectPet(pet.id)"
      >
        {{ pet.name }}
      </button>
    </div>
  </div>

  <div class="content">
    <div class="pets-grid" v-if="selectedPet === null">
      <PetCard
        v-for="pet in pets"
        :key="pet.id"
        :pet="pet"
        @click="selectPet(pet.id)"
      />
    </div>

    <div class="pet-profile-container" v-else-if="selectedPet">
      <PetProfile :pet="selectedPet" />
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.page-pets {
  min-height: 90vh; /* 确保最小高度铺满整个视口高度 */
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 0.5rem 0 1rem;
    position: relative;

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
        color: var(--c-text-1);

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
  }

  .content {
    .pets-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .pet-profile-container {
      background: var(--ld-bg-card);
      border-radius: 1rem;
      box-shadow: 0 4px 20px var(--ld-shadow);
      overflow: hidden;
    }
  }
}

@media (max-width: 768px) {
  .page-pets {
    .header {
      flex-direction: column;
      gap: 1rem;
      align-items: stretch;
      margin: 0.5rem 0 1rem;

      .tabs {
        justify-content: center;
        
        .tab {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }
      }
    }

    .content {
      .pets-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }
  }
}
</style>