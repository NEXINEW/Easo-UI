<script lang="ts">
export default {
    inheritAttrs: false
}
</script>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { twMerge } from 'tailwind-merge'

interface Props {
    visible: boolean
    placement?: 'top' | 'bottom' | 'left' | 'right'
    offset?: number
}

const props = withDefaults(defineProps<Props>(), {
    placement: 'bottom',
    offset: 0
})

// 获取非props属性
const attrs = useAttrs()

// 剔除DOM原生的class属性和事件监听
const filteredAttrs = computed(() => {
    const { class: _, ...rest } = attrs;
    return rest;
});

// 合并根元素样式
const mergedRootClass = computed(() => {
    return twMerge('relative inline-block', attrs.class?.toString());
});

// 获取位置类
const placementClass = computed(() => {
    const offsetClass = props.offset ? `m${props.placement === 'top' ? 'b' : props.placement === 'bottom' ? 't' : props.placement === 'left' ? 'r' : 'l'}-[${props.offset}px]` : '';

    const baseClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 w-full h-0',
        bottom: 'top-full left-1/2 -translate-x-1/2 w-full h-0',
        left: 'right-full top-1/2 -translate-y-1/2 h-full w-0',
        right: 'left-full top-1/2 -translate-y-1/2 h-full w-0'
    };

    return twMerge(baseClasses[props.placement] || '', offsetClass);
});

// 合并弹窗样式
const mergedPopupClass = computed(() => {
    return twMerge('absolute z-10 bg-white ', placementClass.value);
});
</script>

<template>
    <div :class="mergedRootClass" v-bind="filteredAttrs">
        <slot></slot>

        <div v-if="visible" :class="mergedPopupClass">
            <slot name="content"></slot>
        </div>
    </div>
</template>