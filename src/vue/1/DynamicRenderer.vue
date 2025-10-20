<script setup lang="ts">
const props = defineProps<{
    is: any
    props?: Record<string, any>
}>()
</script>

<template>
    <component :is="is" v-bind="props.props" />
</template>
