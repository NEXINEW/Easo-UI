<script lang="ts">
// 禁止自动透传属性绑定在根元素上
export default {
    inheritAttrs: false
}
</script>

<script setup lang="ts">
// 导入 Vue 提供的核心响应式 API 和工具函数。
import { ref, computed, useAttrs } from 'vue'
// 用于安全地合并 Tailwind CSS 类名，避免冲突。
import { twMerge } from 'tailwind-merge'

// 定义组件的 Props 接口
interface Props {
    urls: string[]
    alt?: string
    fallbackUrl?: string
}

// 使用 `defineProps` 宏来定义并接收上述 Props。
const props = defineProps<Props>()

// 响应式变量：记录当前已成功加载的图片 URL。
const loadedUrl = ref('')

// 响应式变量：标记是否所有提供的图片 URL 都加载失败。
const hasError = ref(false)

// 处理图片成功加载的事件回调函数。
// 接收一个参数 `url`，表示成功加载的图片 URL。
// 如果 `loadedUrl` 已经有值（即已经有图片加载成功），则直接返回，避免重复设置。
// 否则，将 `loadedUrl` 设置为传入的 `url`，触发视图更新。
const handleLoad = (url: string) => {
    if (loadedUrl.value) return
    loadedUrl.value = url
}

// 处理图片加载失败的事件回调函数。
// 当监听的任一图片 `@error` 事件触发时调用。
// 只有在 `loadedUrl` 仍为空（即尚无图片成功加载）的情况下，才将 `hasError` 设为 `true`。
// 这确保了只要有一张图片加载成功，就不会进入错误备用状态。
const handleError = () => {
    if (!loadedUrl.value) {
        hasError.value = true
    }
}

// 使用 `useAttrs()` 获取传递给当前组件但未在 `props` 中声明的所有 attribute（如 class, style, data-* 等）。
// 因为 `inheritAttrs: false`，这些 attribute 不会自动绑定到根元素，需要手动处理。
const attrs = useAttrs()

// 计算属性：合并组件内部默认的 Tailwind CSS 类名和用户通过 `class` 传递的类名。
const mergedRootClass = computed(() => {
    const userClass = typeof attrs.class === 'string' ? attrs.class : undefined
    return twMerge('w-10 h-10 object-cover', userClass)
})

// 计算属性：过滤掉 `attrs` 中的 `class` 属性，返回其他所有 attribute。
const filteredAttrs = computed(() => {
    const { class: _, ...rest } = attrs
    return rest
})
</script>

<template>
    <!-- 条件渲染 1: 当图片加载出错（hasError 为 true）且提供了 fallbackUrl 时 -->
    <template v-if="hasError && fallbackUrl">
        <img :src="fallbackUrl" :alt="alt" :class="mergedRootClass" v-bind="filteredAttrs" />
    </template>

    <!-- 条件渲染 2: 默认情况（未出错或无备用图） -->
    <template v-else>
        <img v-for="url in urls" :alt="alt" :key="url" :src="url" :class="mergedRootClass" v-bind="filteredAttrs"
            @load="handleLoad(url)" @error="handleError" v-show="loadedUrl === url" />
    </template>
</template>
