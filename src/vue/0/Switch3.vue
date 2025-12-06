<script setup lang="ts">
import { useAttrs, computed, useTemplateRef, ref, onMounted, nextTick, onBeforeUnmount } from 'vue';
import { twMerge } from 'tailwind-merge';


defineOptions({
    inheritAttrs: false
})

const attrs = useAttrs()

const filterAttrs = computed(() => {
    const { class: _class, ...rest } = attrs
    return rest
})

interface Props {
    active: boolean
    gap?: number
};

const prop = withDefaults(defineProps<Props>(), {
    gap: 0,
})

const mergedRootClass = computed(() => {
    return twMerge(
        "w-12 h-4 rounded-full cursor-pointer flex items-center transition-colors duration-200 ease-out m-20",
        prop.active ? "bg-blue-400" : "bg-gray-400",
        attrs.class as string || ""
    )
})

const mergedThumbClass = computed(() => {
    return twMerge(
        "aspect-square bg-white -translate-y-[50%] rounded-full transition-all duration-200 ease-out",
    )
})

const root = useTemplateRef('root')
const forceUpdateKey = ref(0)

// 👇 监听尺寸变化
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
    if (root.value) {
        resizeObserver = new ResizeObserver(() => {
            nextTick(() => {
                forceUpdateKey.value++
            })
        })
        resizeObserver.observe(root.value)
    }
})

onBeforeUnmount(() => {
    if (resizeObserver) {
        resizeObserver.disconnect()
    }
})

const thumbHeight = computed(() => {
    forceUpdateKey.value
    if (!root.value) return 0
    return root.value.offsetHeight - 2 * prop.gap
})

const translateX = computed(() => {
    forceUpdateKey.value
    if (!root.value) return 0
    if (prop.active) {
        const x = root.value.offsetWidth - root.value.offsetHeight + prop.gap
        return x
    } else {
        const x = prop.gap
        return x
    }
})

</script>

<template>
    <div :class="mergedRootClass" v-bind="filterAttrs" ref="root">
        <div class="w-full h-0 shrink-0">
            <div :class="mergedThumbClass"
                :style="{ transform: `translateX(${translateX}px)`, height: `${thumbHeight}px` }"></div>
        </div>
    </div>
</template>
