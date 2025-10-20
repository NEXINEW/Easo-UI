<script lang="ts">
export default {
    inheritAttrs: false
}
</script>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { computed, useAttrs } from 'vue';

interface Props {
    ellipsis?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    ellipsis: true
})

const attrs = useAttrs()
const mergedRootClass = computed(() => {
    return twMerge(
        'shadow-lg m-2 ',
        "overflow-hidden whitespace-nowrap min-w-0",
        props.ellipsis !== false ? "text-ellipsis" : "",
        attrs.class?.toString()
    )
})

const filteredAttrs = computed(() => {
    const { class: _, ...rest } = attrs
    return rest
})
</script>

<template>
    <div :class="mergedRootClass" v-bind="filteredAttrs">
        <slot />
    </div>
</template>