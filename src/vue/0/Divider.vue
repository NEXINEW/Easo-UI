<template>
    <div :class="mergedRootClass" v-bind="filteredAttrs" role="分割线">
        <!-- 左侧分割线 -->
        <div :class="mergedLeftLineBoxClass">
            <div :class="mergedLineClass"></div>
        </div>
        <!-- 中间内容 -->
        <div v-if="$slots.default" :class="mergedContentBoxClass">
            <slot />
        </div>
        <!-- 右侧分割线 -->
        <div :class="mergedRightLineBoxClass">
            <div :class="mergedLineClass"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { computed, useAttrs } from 'vue';

const props = defineProps<{
    lineClass?: string;             // 用户自定义分割线样式
    lineBoxClass?: string;          // 用户自定义分割线外层容器样式
    contentBoxClass?: string;       // 用户自定义内容外层容器样式
}>();

// 过滤掉 class 属性，保留其他所有属性
const filteredAttrs = computed(() => {
    const { class: _, ...rest } = attrs;
    return rest;
});

const attrs = useAttrs();

// 合并根元素 class（用户 class 优先级高）
const mergedRootClass = computed(() => {
    return twMerge('w-full flex items-center', attrs.class?.toString());
});

// 合并分割线 class（用户 class 优先级高）
const mergedLineClass = computed(() => {
    return twMerge('w-full border-t', props.lineClass);
});

// 合并左侧分割线外层容器 class（用户 class 优先级高）
const mergedLeftLineBoxClass = computed(() => {
    return twMerge('h-full flex-1 flex items-center justify-end', props.lineBoxClass);
});

// 合并右侧分割线外层容器 class（用户 class 优先级高）
const mergedRightLineBoxClass = computed(() => {
    return twMerge('h-full flex-1 flex items-center', props.lineBoxClass);
});

// 合并内容外层容器 class（用户 class 优先级高）
const mergedContentBoxClass = computed(() => {
    return twMerge('h-full px-2 flex items-center justify-center', props.contentBoxClass);
});

</script>