<script setup lang="ts">
import { inject, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
    id: string | number;
    title: string;
}>();

const { registerTab, unregisterTab, activeTab } = inject('tabs') as any;

onMounted(() => {
    registerTab(props.id, props.title);
});

onUnmounted(() => {
    unregisterTab(props.id);
});
</script>

<template>
    <div v-show="activeTab === id">
        <slot />
    </div>
</template>