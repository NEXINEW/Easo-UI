<template>
    <div :class="mergedRootClass">
        <!-- 左侧插槽（有内容时显示） -->
        <div v-if="$slots.left" class="h-full aspect-[12/10] flex items-center justify-center">
            <slot name="left" />
            <div
                class=" relative after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-[2px] after:h-3 after:bg-black">
            </div>
        </div>

        <!-- 输入框（根据是否有左右插槽调整padding） -->
        <div class="flex-1 px-2 flex justify-center items-center">
            <input class="h-full w-full outline-none flex items-center justify-center" v-bind="filteredAttrs"
                :value="props.modelValue" @input="onInput" />
        </div>

        <!-- 右侧插槽（有内容时显示） -->
        <div v-if="$slots.right" class="h-full aspect-[12/10] flex items-center justify-center">
            <div
                class="bg-gray-200 relative after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-[2px] after:h-3 after:bg-black">
            </div>
            <slot name="right" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { computed, useAttrs } from 'vue';

const props = defineProps<{
    modelValue: string;
}>();
const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const onInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    emit('update:modelValue', target.value);
};


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
        'w-66 h-6 overflow-hidden bg-gray-200',
        'flex items-center justify-center',
        // 动画状态
        'transform transition-transform',
        // 动态类
        attrs.class?.toString()
    );
});
</script>