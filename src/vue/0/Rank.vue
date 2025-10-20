<template>
    <div :class="mergedRootClass" v-bind="filteredAttrs">
        <div v-for="(item, index) in items" :key="index" :class="mergedItemBoxClass" :style="ItemBoxStyle">
            <slot :item="item"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { twMerge } from 'tailwind-merge';

interface Props {
    cols?: number;
    itemBoxClass?: string;
    items: any[];
}

const props = defineProps<Props>();
const attrs = useAttrs();

const cols = props.cols ?? 3;

// 过滤掉 class 属性，保留其他所有属性
const filteredAttrs = computed(() => {
    const { class: _, ...rest } = attrs;
    return rest;
});

// 合并根元素 class（用户 class 优先）
const mergedRootClass = computed(() => {
    return twMerge(
        'rank-container flex flex-wrap gap-x-2 gap-y-2 w-[500px]',
        attrs.class?.toString()
    );
});

// 合并每个项目元素 class（不含宽度）
const mergedItemBoxClass = computed(() => {
    return twMerge(
        'aspect-square flex items-center justify-center',
        props.itemBoxClass,
    );
});

// 动态宽度样式
const ItemBoxStyle = computed(() => {
    const widthPercentage = 100 / cols;
    const gapCompensation = (cols - 1) * 8 / cols;
    return {
        width: `calc(${widthPercentage}% - ${gapCompensation}px)`
    };
});
</script>
