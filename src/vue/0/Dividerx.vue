<template>
    <div :class="mergedRootClass" v-bind="filteredAttrs">
        <!-- 使用计算属性绑定宽度，添加单位 -->
        <div class="flex items-center justify-end" :style="{ width: `${leftSize}%` }">
            <div :class="mergedLineClass"></div>
        </div>
        <!-- 中间插槽区域 -->
        <div :class="mergedContentClass">
            <slot></slot>
        </div>
        <!-- 使用计算属性绑定宽度，添加单位 -->
        <div class="flex items-center justify-start" :style="{ width: `${rightSize}%` }">
            <div :class="mergedLineClass"></div>
        </div>
    </div>
</template>

<script lang="ts">
// 阻止属性和事件监听的默认透传
export default {
    inheritAttrs: false
}
</script>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { twMerge } from 'tailwind-merge';

// 类型声明
interface Props {
    size?: number,
    lineClass?: string
    contentClass?: string
}

// 使用 withDefaults 提供默认值并确保类型安全
const props = withDefaults(defineProps<Props>(), {
    size: 50 // 默认值为 50，确保有值
})

// 继承DOM非props的原生属性和事件监听
const attrs = useAttrs()

// 剔除DOM原生的class属性和事件监听
const filteredAttrs = computed(() => {
    const { class: _, ...rest } = attrs;
    return rest;
});

// 合并根元素样式
const mergedRootClass = computed(() => {
    return twMerge('flex', attrs.class?.toString());
});

// 合并分割线样式
const mergedLineClass = computed(() => {
    return twMerge('w-full border-t', props.lineClass)
})

// 合并内容样式
const mergedContentClass = computed(() => {
    return twMerge('w-20 flex justify-center items-center', props.contentClass)
})

// 计算属性，自动类型推导为 number
const leftSize = computed(() => Math.min(100, Math.max(0, props.size)))
const rightSize = computed(() => 100 - leftSize.value)
</script>