<template>
  <div class="debug-page">
    <h1>Content 模块调试</h1>
    
    <div class="debug-section">
      <h2>文章数据查询</h2>
      <button @click="fetchPosts">查询文章数据</button>
      
      <div v-if="posts">
        <h3>查询结果: {{ posts.length }} 篇文章</h3>
        <div v-for="post in posts.slice(0, 5)" :key="post._path" class="post-item">
          <p><strong>标题:</strong> {{ post.title }}</p>
          <p><strong>路径:</strong> {{ post._path }}</p>
          <p><strong>日期:</strong> {{ post.date }}</p>
        </div>
      </div>
      
      <div v-if="error" class="error">
        <h3>错误信息:</h3>
        <pre>{{ error }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const posts = ref<any[]>([])
const error = ref<string>('')

const fetchPosts = async () => {
  try {
    console.log('开始查询文章数据...')
    
    // 由于有 hideContentPrefixes: ['/posts'] 配置，需要查询原始路径
    const allContent = await queryContent().find()
    console.log('所有内容:', allContent)
    
    // 查找包含原始路径的文章
    const postsWithOriginalPath = allContent.filter(item => 
      item._file?.includes('posts/') || 
      item._path?.includes('posts/') ||
      item._dir?.includes('posts/')
    )
    
    console.log('包含posts路径的文章:', postsWithOriginalPath)
    
    // 也可以尝试查询所有内容，然后过滤出文章
    const allPosts = allContent.filter(item => 
      item._type === 'markdown' && 
      !item._path?.includes('/preview') &&
      !item._partial
    )
    
    console.log('所有文章:', allPosts)
    
    posts.value = postsWithOriginalPath.length > 0 ? postsWithOriginalPath : allPosts
  } catch (err) {
    console.error('查询出错:', err)
    error.value = err instanceof Error ? err.message : String(err)
  }
}
</script>

<style scoped>
.debug-page {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.debug-section {
  margin: 2rem 0;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.post-item {
  margin: 1rem 0;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 4px;
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
}

button:hover {
  background: #2563eb;
}
</style>