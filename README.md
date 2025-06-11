# Easo UI

轻量级、完全可控的 Vue 3 UI 组件集，专为 Tailwind CSS 用户设计。

用户目前仅需安装两个库：
- [`tailwindcss`](https://tailwindcss.com/)
- [`tailwind-merge`](https://github.com/dcastil/tailwind-merge)

## ✨ 特性

✅ 直接复制组件代码到项目的组件文件夹中使用，每个组件都可作为模板自由修改  
✅ 预设样式可覆盖：所有 class 可在父组件中使用 Tailwind 自定义，内部已使用 `tailwind-merge` 合并样式，**传入的 class 优先**

## 🚀 使用方式

1. **复制组件代码到项目中**

   ```vue
   <!-- 示例：EaButton.vue -->
   <template>
     <button :class="mergedClass">
       <slot />
     </button>
   </template>

   <script setup>
   import { computed } from 'vue'
   import { twMerge } from 'tailwind-merge'
   const props = defineProps({ class: String })
   const mergedClass = computed(() => twMerge('px-4 py-2 rounded', props.class))
   </script>
