<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { twMerge } from 'tailwind-merge'

interface Props {
    remoteSrc?: string // 主图（远程图）
    localSrc?: string  // 备用图（本地图）
    textClass?: string
    iconClass?: string
    alt?: string
}

const props = defineProps<Props>()

const isRemoteLoading = ref(true) // 标记远程图是否正在加载
const currentSrc = ref<string | undefined>(props.remoteSrc || props.localSrc) // 当前显示的图片源

// 尝试加载图片
const tryLoadImage = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
        if (!url) {
            resolve(false)
            return
        }
        const img = new Image()
        img.onload = () => {
            resolve(true)
        }
        img.onerror = () => resolve(false)
        img.src = url
    })
}

// 加载逻辑
const load = async () => {
    isRemoteLoading.value = true
    if (props.remoteSrc) {
        if (await tryLoadImage(props.remoteSrc)) {
            currentSrc.value = props.remoteSrc
        } else if (props.localSrc) {
            currentSrc.value = props.localSrc
        }
    } else if (props.localSrc) {
        currentSrc.value = props.localSrc
    }
    isRemoteLoading.value = false
}

// 监听 remoteSrc 变化
watch(() => props.remoteSrc, (newVal) => {
    if (newVal) {
        load() // 当 remoteSrc 更新时，重新加载
    }
}, { immediate: true })

onMounted(() => {
    load() // 初始加载
})

const defaultRootClass = 'w-10 h-10 flex justify-center items-center'
const defaultIconClass = 'w-full h-full flex justify-center items-center font-bold object-cover'

const iconClass = computed(() =>
    twMerge(defaultIconClass, props.iconClass || '')
)
</script>

<template>
    <div :class="defaultRootClass">
        <img :class="iconClass" :src="currentSrc" :alt="alt" v-if="!isRemoteLoading">
        <!-- 可以添加 loading 状态或其他内容 -->
        <p v-if="isRemoteLoading">Loading...</p>
    </div>
</template>