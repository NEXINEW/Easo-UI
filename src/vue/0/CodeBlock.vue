<template>
    <pre :class="mergedRootClass"><code :class="mergedCodeClass"><slot/></code></pre>
</template>

<script lang="ts">
export default {
    inheritAttrs: false
}
</script>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { twMerge } from 'tailwind-merge';

interface Props {
    codeClass?: string
}

const props = defineProps<Props>()

const attrs = useAttrs()

const mergedRootClass = computed(() => {
    return twMerge('bg-black overflow-auto', attrs.class?.toString());
});

const mergedCodeClass = computed(() => {
    return twMerge('text-white', props.codeClass?.toString());
});
</script>
<style scoped>
pre {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.5) transparent;
}

pre::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background: transparent;
}

pre::-webkit-scrollbar-thumb {
    background-color: rgba(99, 102, 241, 0.5);
    border-radius: 4px;
}

pre::-webkit-scrollbar-track {
    background: transparent;
}
</style>