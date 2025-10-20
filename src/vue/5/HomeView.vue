<!--
 * @description 首页视图组件，展示EasoUI组件库的介绍和导航
 * @file HomeView.vue
 * @author EasoUI Team
-->

<template>
    <div class="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
        <!-- Header -->
        <header class="flex items-center justify-between px-8 py-4 bg-white shadow">
            <h1 class="text-2xl font-bold">Easo UI</h1>
            <nav class="space-x-6">
                <a href="#docs" class="hover:text-blue-600">文档</a>
                <a href="#github" class="hover:text-blue-600" target="_blank">GitHub</a>
            </nav>
        </header>

        <!-- Hero -->
        <main class="flex-grow flex flex-col justify-center items-center px-6 text-center max-w-3xl mx-auto">
            <h2 class="text-4xl font-extrabold mb-4">轻量、高效的 Vue 组件库</h2>
            <p class="text-lg text-gray-700 mb-8">
                基于 Vue 3 和 Tailwind CSS，帮助你快速构建现代化界面。
            </p>
            <a href="/components"
                class="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
                探索组件
            </a>
        </main>

        <!-- Footer -->
        <footer class="text-center py-8 text-gray-500 text-sm">
            © 2025 真彩珠宝 版权所有
        </footer>
    </div>
</template>

<script setup>
// 无需逻辑
</script>