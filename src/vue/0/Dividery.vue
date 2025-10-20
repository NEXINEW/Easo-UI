<template>
    <div :class="mergedRootClass" v-bind="filteredAttrs">
        <div :class="mergedLineClass"></div>
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
    lineClass?: string
}

// 使用 withDefaults 提供默认值并确保类型安全
const props = defineProps<Props>()

// 继承DOM非props的原生属性和事件监听
const attrs = useAttrs()

// 剔除DOM原生的class属性和事件监听
const filteredAttrs = computed(() => {
    const { class: _, ...rest } = attrs;
    return rest;
});

// 合并根元素样式
const mergedRootClass = computed(() => {
    return twMerge('flex h-full', attrs.class?.toString());
});

// 合并分割线样式
const mergedLineClass = computed(() => {
    return twMerge('h-full border-l', props.lineClass)
})
</script>