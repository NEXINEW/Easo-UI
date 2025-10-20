<template>
    <div :class="mergedRootClass" v-bind="filteredAttrs">
        <slot />
    </div>
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
    visibleTime?: number
}

const props = withDefaults(defineProps<Props>(), {
    visibleTime: 2000
})

const emit = defineEmits(['close'])

setTimeout(() => {
    emit('close')
}, props.visibleTime)

const attrs = useAttrs()

const filteredAttrs = computed(() => {
    const { class: _, ...rest } = attrs
    return rest
})

const mergedRootClass = computed(() =>
    twMerge('py-1 px-2 rounded fixed top-4 left-1/2 transform -translate-x-1/2', attrs.class?.toString() ?? '')
)
</script>