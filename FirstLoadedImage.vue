<script setup lang="ts">
import { ref, computed, useAttrs } from 'vue'
import { twMerge } from 'tailwind-merge'

interface Props {
    urls: string[]
}

const props = defineProps<Props>()

// 存储图片加载状态
const loadedUrl = ref<string | null>(null)
const hasWinner = ref(false)

const attrs = useAttrs()

// 处理图片加载成功
const handleLoad = (url: string) => {
    if (!hasWinner.value) {
        loadedUrl.value = url
        hasWinner.value = true
    }
}

// 默认样式
const defaultRootClass = 'w-10 h-10 object-cover'

const mergedRootClass = computed(() => {
    return twMerge([defaultRootClass, (attrs.class as string | undefined) ?? ''].filter(Boolean).join(' '))
})

// 过滤掉 class，透传其他属性
const filteredAttrs = computed(() => {
    const { class: _, ...rest } = attrs
    return rest
})
</script>

<template>
    <img v-for="url in urls" :key="url" :src="url" :class="mergedRootClass" v-bind="filteredAttrs"
        @load="handleLoad(url)" v-show="loadedUrl === url" />
</template>