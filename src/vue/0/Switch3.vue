<!-- 
这个比上一个的好处是 
计算不算复杂
简单直观
当然也丰富了功能
实现了背景颜色滑动
-->

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
    trackBaseClass?: string
    trackClass?: string
    thumbClass?: string
};

const prop = withDefaults(defineProps<Props>(), {
    trackBaseClass: "",
    trackClass: ""
})

const mergedRootClass = computed(() => {
    return twMerge(
        "w-12 h-4 rounded-full cursor-pointer bg-gray-400 m-20 flex relative",
        attrs.class as string || ""
    )
})

const mergedTrackBaseClass = computed(() => {
    let trackBaseWidth;
    if (!prop.active) {
        trackBaseWidth = 'w-0';
    } else {
        trackBaseWidth = 'w-full';
    }
    return twMerge(
        'h-full rounded-full bg-blue-400 transition-all duration-200 ease-out rounded-full',
        prop.trackBaseClass,
        trackBaseWidth
    );
});

const mergedTrackClass = computed(() => {
    return twMerge(
        "absolute top-1/2 transition-all duration-200 ease-out",
        prop.trackClass
    )
})

const mergedThumbClass = computed(() => {
    return twMerge(
        "absolute h-6 w-6 right-0 bg-white rounded-full translate-x-1/2 -translate-y-1/2",
        prop.thumbClass
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

const trackWidth = computed(() => {
    forceUpdateKey.value
    if (root.value) {
        const width = root.value.offsetWidth - root.value.offsetHeight
        return width
    }
})

const placeholderLeft = computed(() => {
    forceUpdateKey.value
    if (root.value) {
        const width = root.value.offsetHeight / 2
        return width
    }
})
</script>
<template>
    <!-- 这是组件 -->
    <div :class="mergedRootClass" v-bind="filterAttrs" ref="root">
        <!-- 这是防止颜色溢出容器，即使rounded-full，当宽度到0的时候，会变成竖线，很显眼 -->
        <div class="w-full h-full rounded-full overflow-hidden">
            <!-- 这是背景 -->
            <div :class="mergedTrackBaseClass">
            </div>
        </div>

        <!-- 这是轨道 -->
        <div :class="mergedTrackClass"
            :style="{ left: `${placeholderLeft}px`, width: prop.active ? `${trackWidth}px` : '0' }">
            <!-- 这是滑块 -->
            <div :class="mergedThumbClass"></div>
        </div>
    </div>
</template>
