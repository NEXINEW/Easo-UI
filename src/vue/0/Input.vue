<script lang="ts">
export default {
    inheritAttrs: false
}
</script>

<script setup lang="ts">
import { useAttrs, computed } from 'vue'
import { twMerge } from 'tailwind-merge'

const modelValue = defineModel<string>()

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()


const attrs = useAttrs()

const filteredAttrs = computed(() => {
    const { class: _, ...rest } = attrs
    return rest
})

const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    emit('update:modelValue', target.value)
}

const mergedRootClass = computed(() =>
    twMerge('flex items-center bg-gray-100 rounded px-2 py-1', attrs.class?.toString())
)
</script>

<template>
    <div :class="mergedRootClass">
        <slot name="left" />
        <input :value="modelValue" @input="handleInput" class="flex-1 focus:outline-none min-w-0 px-2 py-1"
            v-bind="filteredAttrs" />
        <slot name="right" />
    </div>
</template>
