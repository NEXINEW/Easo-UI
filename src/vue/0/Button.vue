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