<script lang="ts">
export default {
    inheritAttrs: false
}
</script>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import { computed, useAttrs } from 'vue'

const props = withDefaults(defineProps<{
    active: boolean
    activeClass?: string
}>(), {
    activeClass: 'justify-end bg-blue-400',
    inactiveClass: 'justify-start'
})

const attrs = useAttrs()

const filteredAttrs = computed(() => {
    const { class: _, ...rest } = attrs
    return rest
})

const mergedRootClass = computed(() =>
    twMerge([
        'bg-gray-200 rounded-full p-[1px] flex relative w-10 h-5 cursor-pointer',
        props.active ? props.activeClass : '',
        attrs.class?.toString()
    ])
)

</script>

<template>
    <button :class="mergedRootClass" v-bind="filteredAttrs">
        <div class="bg-white h-full aspect-[1] rounded-full"></div>
    </button>
</template>
