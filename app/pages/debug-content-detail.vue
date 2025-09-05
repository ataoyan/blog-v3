<script setup lang="ts">
const contentData = ref<any[]>([])
const error = ref<string>('')

const analyzeContent = async () => {
  try {
    console.log('开始分析 Content 数据...')
    
    // 获取所有内容
    const allContent = await queryContent().find()
    console.log('所有 Content 数据:', allContent)
    
    // 分析数据结构
    const analyzedData = allContent.map(item => ({
      _path: item._path,
      _file: item._file,
      _dir: item._dir,
      _type: item._type,
      _partial: item._partial,
      title: item.title,
      date: item.date,
      hasBody: !!item.body,
      keys: Object.keys(item).filter(key => !key.startsWith('_'))
    }))
    
    contentData.value = analyzedData
  } catch (err) {
    console.error('分析出错:', err)
    error.value = err instanceof Error ? err.message : String(err)
  }
}
</script>

<template>
  <div class="debug-page">
    <h1>Content 模块详细调试</h1>
    
    <div class="debug-section">
      <h2>Content 数据结构分析</h2>
      <button @click="analyzeContent">分析 Content 数据</button>
      
      <div v-if="contentData.length > 0">
        <h3>找到 {{ contentData.length }} 个内容项</h3>
        
        <div v-for="(item, index) in contentData.slice(0, 10)" :key="index" class="content-item">
          <h4>项目 {{ index + 1 }}</h4>
          <pre>{{ JSON.stringify(item, null, 2) }}</pre>
        </div>
        
        <div v-if="contentData.length > 10">
          <p>... 还有 {{ contentData.length - 10 }} 个项目</p>
        </div>
      </div>
      
      <div v-if="error" class="error">
        <h3>错误信息:</h3>
        <pre>{{ error }}</pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.debug-page {
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.debug-section {
  margin: 2rem 0;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.content-item {
  margin: 1rem 0;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 4px;
  overflow-x: auto;
}

.error {
  color: #ef4444;
  background: #fef2f2;
  padding: 1rem;
  border-radius: 4px;
}

button {
  background: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
}

button:hover {
  background: #2563eb;
}

pre {
  font-size: 12px;
  line-height: 1.4;
}
</style>