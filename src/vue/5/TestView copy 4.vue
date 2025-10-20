<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import DynamicRenderer from '@/vue/1/DynamicRenderer.vue'

const dynamicFolder = 'button'

// 扫描所有子文件夹下的 .vue 文件（静态路径）
const allModules = import.meta.glob('@/vue/2/*/*.vue')

// 过滤出指定文件夹的组件
const modules = Object.fromEntries(
    Object.entries(allModules).filter(([path]) =>
        path.includes(`/vue/2/${dynamicFolder}/`)
    )
)

// 转为组件数组
const components = Object.entries(modules).map(([path, loader]) => {
    const name = path.split('/').pop()?.replace('.vue', '') || ''
    return {
        name,
        component: defineAsyncComponent(loader as () => Promise<any>)
    }
})
</script>

<template>
    <div class="space-y-4 p-4">

        <div v-for="item in components" :key="item.name" class="rounded-2xl p-4">
            <div class="flex justify-center">
                <h2 class="font-bold mb-2">{{ item.name }}</h2>
            </div>
            <div class="flex justify-center items-center border p-4 min-h-20">
                <DynamicRenderer :is="item.component" />
            </div>
        </div>
    </div>
</template>
