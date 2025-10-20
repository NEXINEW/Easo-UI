<script lang="ts">
export default {
    inheritAttrs: false
}
</script>

<script setup lang="ts">
import Button from '@/vue/1/Button.vue'
import { useAttrs, computed, ref } from 'vue'

const props = defineProps({
    loading: Boolean,
})
const isDisabled = ref()

const attrs = useAttrs()

const filteredAttrs = computed(() => {
    const { class: _, disabled, ...rest } = attrs
    isDisabled.value = !!props.loading || !!attrs.disabled
    return rest
})
</script>
<template>
    <Button :loading="loading" :disabled="isDisabled" v-bind="filteredAttrs" content-class="gap-2" loading-class="gap-2"
        class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400 active:bg-gray-600 disabled:hover:bg-gray-500">
        <template #loadingIcon>
            <slot name="loadingIcon"></slot>
        </template>
        <template #loadingText>
            <slot name="loadingText"></slot>
        </template>
        <template #leftIcon>
            <slot name="leftIcon"></slot>
        </template>
        <template #rightIcon>
            <slot name="rightIcon"></slot>
        </template>
        <slot></slot>
    </Button>
</template>
