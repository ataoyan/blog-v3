#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// 颜色转换函数
function hexToHsl(hex) {
  // 移除 # 号
  hex = hex.replace('#', '')
  
  // 解析 RGB
  let r, g, b
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16) / 255
    g = parseInt(hex[1] + hex[1], 16) / 255
    b = parseInt(hex[2] + hex[2], 16) / 255
  } else {
    r = parseInt(hex.substring(0, 2), 16) / 255
    g = parseInt(hex.substring(2, 4), 16) / 255
    b = parseInt(hex.substring(4, 6), 16) / 255
  }
  
  // 计算 HSL
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2

  if (max === min) {
    h = s = 0 // 灰度
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }
  
  // 转换为度数和百分比
  h = Math.round(h * 360)
  s = Math.round(s * 100)
  l = Math.round(l * 100)
  
  return { h, s, l }
}

function generateColorScss(themeConfig) {
  const { primary, secondary, accent } = themeConfig
  
  // 转换颜色到 HSL
  const primaryHsl = hexToHsl(primary)
  const secondaryHsl = hexToHsl(secondary)
  const accentHsl = hexToHsl(accent)
  
  return `// 自动生成的颜色变量 - 请勿手动编辑
// 此文件由 scripts/generate-colors.js 自动生成

:root {
  // 基础色调（基于主色调）
  --hue-theme: ${primaryHsl.h}deg;

  // 文本颜色
  --c-text: hsl(var(--hue-theme) 0% 0%);
  --c-text-1: hsl(var(--hue-theme) 0% 20%);
  --c-text-2: hsl(var(--hue-theme) 0% 40%);
  --c-text-3: hsl(var(--hue-theme) 0% 70%);

  // 背景颜色
  --c-bg: hsl(var(--hue-theme) 0% 100%);
  --c-bg-1: hsl(var(--hue-theme) 20% 98%);
  --c-bg-2: hsl(var(--hue-theme) 10% 95%);
  --c-bg-3: hsl(var(--hue-theme) 10% 92%);
  --c-bg-soft: hsl(var(--hue-theme) 20% 20% / 10%);
  --c-border: hsl(var(--hue-theme) 10% 91%);
  --c-bg-a50: hsl(var(--hue-theme) 20% 98% / 50%);
  --c-bg-a80: hsl(var(--hue-theme) 20% 98% / 80%);

  // 主题色
  --c-primary: hsl(${primaryHsl.h}deg ${primaryHsl.s}% ${primaryHsl.l}%); /* ${primary} */
  --c-primary-soft: hsl(${primaryHsl.h}deg ${primaryHsl.s}% ${primaryHsl.l}% / 20%);
  --c-secondary: hsl(${secondaryHsl.h}deg ${secondaryHsl.s}% ${secondaryHsl.l}%); /* ${secondary} */
  --c-accent: hsl(${accentHsl.h}deg ${accentHsl.s}% ${accentHsl.l}%); /* ${accent} */

  // 功能色
  --c-success: hsl(143deg 56% 35%);
  --c-danger: hsl(0 87% 69%);

  // 布局变量
  --ld-bg-blur: var(--c-bg-1);
  --ld-bg-card: var(--c-bg);
  --ld-bg-active: var(--c-bg);
  --ld-shadow: var(--c-bg-soft);
}

.dark {
  // 深色模式文本颜色
  --c-text: hsl(var(--hue-theme) 0% 100%);
  --c-text-1: hsl(var(--hue-theme) 0% 90%);
  --c-text-2: hsl(var(--hue-theme) 0% 70%);
  --c-text-3: hsl(var(--hue-theme) 0% 50%);

  // 深色模式背景颜色
  --c-bg: hsl(var(--hue-theme) 0% 7%);
  --c-bg-1: hsl(var(--hue-theme) 10% 10%);
  --c-bg-2: hsl(var(--hue-theme) 10% 14%);
  --c-bg-3: hsl(var(--hue-theme) 10% 18%);
  --c-bg-soft: hsl(var(--hue-theme) 100% 95% / 15%);
  --c-border: hsl(var(--hue-theme) 10% 20%);
  --c-bg-a50: hsl(var(--hue-theme) 10% 10% / 50%);
  --c-bg-a80: hsl(var(--hue-theme) 10% 10% / 80%);

  // 深色模式布局变量
  --ld-bg-blur: var(--c-bg-a80);
  --ld-bg-card: var(--c-bg-3);
  --ld-bg-active: var(--c-primary-soft);
  --ld-shadow: var(--c-bg-a50);
}`
}

// 主函数
function main() {
  try {
    // 读取 app.config.ts
    const configPath = resolve(process.cwd(), 'app/app.config.ts')
    const configContent = readFileSync(configPath, 'utf8')
    
    // 提取主题配置（简单正则匹配）
    const themeMatch = configContent.match(/theme:\s*{([^}]+)}/)
    if (!themeMatch) {
      throw new Error('未找到 theme 配置')
    }
    
    const themeConfig = {}
    const themeContent = themeMatch[1]
    
    // 提取 primary, secondary, accent
    const primaryMatch = themeContent.match(/primary:\s*['"]([^'"]+)['"]/)
    const secondaryMatch = themeContent.match(/secondary:\s*['"]([^'"]+)['"]/)
    const accentMatch = themeContent.match(/accent:\s*['"]([^'"]+)['"]/)
    
    if (primaryMatch) themeConfig.primary = primaryMatch[1]
    if (secondaryMatch) themeConfig.secondary = secondaryMatch[1]
    if (accentMatch) themeConfig.accent = accentMatch[1]
    
    if (!themeConfig.primary) {
      throw new Error('未找到 primary 颜色配置')
    }
    
    // 生成 color.scss 内容
    const scssContent = generateColorScss(themeConfig)
    
    // 写入文件
    const outputPath = resolve(process.cwd(), 'app/assets/css/color.scss')
    writeFileSync(outputPath, scssContent, 'utf8')
    
    console.log('✅ color.scss 已自动生成')
    console.log(`🎨 主色调: ${themeConfig.primary}`)
    console.log(`🎨 辅助色: ${themeConfig.secondary || '未设置'}`)
    console.log(`🎨 强调色: ${themeConfig.accent || '未设置'}`)
    
  } catch (error) {
    console.error('❌ 生成颜色文件失败:', error.message)
    process.exit(1)
  }
}

main()