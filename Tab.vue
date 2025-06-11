<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { computed, useAttrs, ref, provide, watch } from 'vue';

const props = defineProps<{
    headerClass?: string;             // 用户自定义头部容器样式
    contentClass?: string;           // 用户自定义内容容器样式
    buttonClass?: string;            // 用户自定义标签按钮样式
    activeButtonClass?: string;      // 用户自定义激活标签按钮样式
    modelValue?: string | number;    // 双向绑定的当前激活标签
    defaultActive?: string | number; // 默认激活的标签
}>();

const emit = defineEmits(['update:modelValue', 'tab-change']);

// 过滤掉 class 属性，保留其他所有属性
const attrs = useAttrs();
const filteredAttrs = computed(() => {
    const { class: _, ...rest } = attrs;
    return rest;
});

// 标签数据
const tabs = ref<Array<{ id: string | number; title: string }>>([]);
const activeTab = ref(props.defaultActive || props.modelValue || '');

// 提供上下文给子组件
provide('tabs', {
    tabs,
    activeTab,
    registerTab: (id: string | number, title: string) => {
        if (!tabs.value.some(tab => tab.id === id)) {
            tabs.value.push({ id, title });
            if (!activeTab.value && tabs.value.length > 0) {
                activeTab.value = tabs.value[0].id;
            }
        }
    },
    unregisterTab: (id: string | number) => {
        tabs.value = tabs.value.filter(tab => tab.id !== id);
    }
});

// 监听 modelValue 变化
watch(() => props.modelValue, (newVal) => {
    if (newVal !== undefined && newVal !== activeTab.value) {
        activeTab.value = newVal;
    }
});

// 切换标签
const setActiveTab = (tabId: string | number) => {
    if (activeTab.value !== tabId) {
        activeTab.value = tabId;
        emit('update:modelValue', tabId);
        emit('tab-change', tabId);
    }
};

// 合并样式类
const mergedRootClass = computed(() => {
    return twMerge('w-sm flex flex-col bg-gray-200', attrs.class?.toString());
});

const mergedHeaderClass = computed(() => {
    return twMerge(
        'flex items-center',
        props.headerClass
    );
});

const mergedContentClass = computed(() => {
    return twMerge(
        'flex-1',
        props.contentClass
    );
});

const mergedButtonClass = computed(() => {
    return twMerge(
        'px-4 py-2 font-medium text-sm cursor-pointer',
        'hover:text-blue-500 focus:outline-none',
        'transition-colors duration-200',
        props.buttonClass
    );
});

const mergedActiveButtonClass = computed(() => {
    return twMerge(
        'text-blue-600 border-b-2 border-blue-600',
        props.activeButtonClass
    );
});
</script>

<template>
    <div :class="mergedRootClass" v-bind="filteredAttrs">
        <div :class="mergedHeaderClass">
            <button v-for="tab in tabs" :key="tab.id"
                :class="[mergedButtonClass, activeTab === tab.id && mergedActiveButtonClass]"
                @click="setActiveTab(tab.id)">
                {{ tab.title }}
            </button>
        </div>
        <div :class="mergedContentClass">
            <slot />
        </div>
    </div>
</template>