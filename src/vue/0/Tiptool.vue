<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { twMerge } from 'tailwind-merge';

interface Props {
    isVisible: boolean;
    placement: 'top' | 'bottom' | 'left' | 'right';
}
const props = defineProps<Props>()

const placementMap: Record<string, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 ',
    bottom: 'top-full left-1/2 -translate-x-1/2 ',
    left: 'top-1/2 right-full -translate-y-1/2 ',
    right: 'top-1/2 left-full -translate-y-1/2 ',
};

const placementClass = computed(() => {
    return placementMap[props.placement]
});

const tipClass = computed(() => {
    return twMerge(
        'absolute whitespace-nowrap',
        placementClass.value,
    );
});

const attrs = useAttrs()

const rootClass = computed(() => {
    const userClass = typeof attrs.class === 'string' ? attrs.class : undefined
    return twMerge(
        'relative inline-block',
        userClass,
    )
})

const filteredAttrs = computed(() => {
    const { class: _, ...rest } = attrs
    return rest
})
</script>

<template>
    <div :class="rootClass" v-bind="filteredAttrs">
        <slot name="trigger" />
        <div v-show="isVisible" :class="tipClass">
            <slot name="tip" />
        </div>
    </div>
</template>