<!-- 
    这个开关组件目前已经好了
    已经实现了thumb自动适配外层宽高
    以及间距自定义
    
    未来优化方向：
    将 thumb 的尺寸基准从“高度”改为“外层可用宽度”（即 width - 2*gap），以获得更一致的视觉比例并更好支持自定义宽高
    基于新尺寸模型，自然支持 gap 为负值（只要最终 thumb 尺寸 > 0）
    后续可考虑使用 transform: translate(-50%, -50%) + left/top 定位，使动画基准点为中心，便于扩展
-->

<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { computed, useAttrs, useTemplateRef } from 'vue';

defineOptions({
    inheritAttrs: false
})

const mergedRootClass = computed(() => {
    return twMerge(
        "w-12 h-6 rounded-full cursor-pointer transition-colors duration-200 ease-out",
        prop.active ? "bg-blue-400" : "bg-gray-400",
        attrs.class as string || ""
    )
})

const mergedThumbClass = computed(() => {
    return twMerge(
        "h-full aspect-square bg-white rounded-full transition-all duration-200 ease-out",
    )
})


const attrs = useAttrs()

const filteredAttrs = computed(() => {
    const { class: _class, ...rest } = attrs
    return rest
})


interface Props {
    active: boolean
    gap?: number
};

const prop = withDefaults(defineProps<Props>(), {
    gap: 2,
})

const sizeBox = useTemplateRef("sizeBox")



const translateX = computed(() => {
    if (!sizeBox.value) return 0
    if (prop.active) {
        const boxWidth = sizeBox.value.offsetWidth
        const boxHeight = sizeBox.value.offsetHeight
        return boxWidth - boxHeight
    } else {
        return 0
    }
})



</script>

<template>
    <button :class="mergedRootClass" v-bind="filteredAttrs" :style="{ padding: `${prop.gap}px` }">
        <div class="w-full h-full" ref="sizeBox">
            <div :class="mergedThumbClass" :style="{ transform: `translateX(${translateX}px)` }"></div>
        </div>
    </button>
</template>
