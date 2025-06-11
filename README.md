# Easo UI

轻量级、完全可控的 Vue 3 UI 组件集，专为 Tailwind CSS 用户设计。

用户目前仅需安装两个库：
- [`tailwindcss`](https://tailwindcss.com/)
- [`tailwind-merge`](https://github.com/dcastil/tailwind-merge)

   ```bash
   # 使用 npm
   npm install tailwindcss tailwind-merge
   
   # 或者使用 yarn
   yarn add tailwindcss tailwind-merge
   
   # 或者 pnpm
   pnpm add tailwindcss tailwind-merge

## ✨ 特性

✅ 直接复制组件代码到项目的组件文件夹中使用，每个组件都可作为模板自由修改  
✅ 预设样式可覆盖：所有 class 可在父组件中使用 Tailwind 自定义，内部已使用 `tailwind-merge` 合并样式，**传入的 class 优先**

## 🚀 使用方式

1. **复制组件代码到项目中**

   例如，将以下代码复制到 `src/components/ui/Button.vue` 中：

   ```vue
   <!-- Button.vue -->
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

   ```vue
        <script setup lang="ts">
        import { twMerge } from 'tailwind-merge';
        import { computed, useAttrs } from 'vue';

        const props = defineProps<{}>();

        // 过滤掉 class 属性，保留其他所有属性
        const filteredAttrs = computed(() => {
            const { class: _, ...rest } = attrs;
            return rest;
        });

        const attrs = useAttrs();

        // 合并根元素 class（用户 class 优先级高）
        const mergedRootClass = computed(() => {
            return twMerge(
                // 基础样式
                'w-16 h-8',
                'flex items-center justify-center',
                // 正常状态
                'bg-gray-200 cursor-pointer hover:opacity-80',
                // 焦点状态
                'focus-visible:ring-2',
                // 激活状态
                'enabled:active:scale-80 enabled:active:bg-gray-300',
                // 禁用状态
                'disabled:opacity-30 disabled:cursor-not-allowed',
                // 动画状态
                'transform transition-transform',
                // 动态类
                attrs.class?.toString()
            );
        });
        </script>

        <template>
            <button :class="mergedRootClass" v-bind="filteredAttrs">
                <slot />
            </button>
        </template>

2. **在页面中导入并使用组件**
    ```vue
        <script setup lang="ts">
        import Button from '@/vue_01_base/Button.vue'

        const handleClick = () => {
            console.log('Button clicked')
        }
        </script>

        <template>
            <Button class="px-4 py-2 bg-red-500 text-white hover:bg-blue-600" @click="handleClick">
                确定
            </Button>
        </template>

