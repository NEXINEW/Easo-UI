<template>
    <div class="p-6 max-w-4xl mx-auto">
        <h1 class="text-2xl font-bold mb-6 text-center">Tailwind CSS 按钮风格合集</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- 1. 扁平化按钮 (Flat Design) -->
            <div class="p-4 bg-gray-50 rounded-lg">
                <h3 class="font-medium mb-2">1. 扁平化按钮</h3>
                <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                    扁平化按钮
                </button>
            </div>

            <!-- 2. 拟物化按钮 (Skeuomorphism) -->
            <div class="p-4 bg-gray-50 rounded-lg">
                <h3 class="font-medium mb-2">2. 拟物化按钮</h3>
                <button
                    class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    拟物化按钮
                </button>
            </div>

            <!-- 3. 微拟物按钮 (Neumorphism) -->
            <div class="p-4 bg-gray-50 rounded-lg">
                <h3 class="font-medium mb-2">3. 微拟物按钮</h3>
                <button
                    class="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff] hover:shadow-[8px_8px_15px_#d1d9e6,-8px_-8px_15px_#ffffff] transition-shadow">
                    微拟物按钮
                </button>
            </div>

            <!-- 4. 极简主义按钮 (Minimalism) -->
            <div class="p-4 bg-gray-50 rounded-lg">
                <h3 class="font-medium mb-2">4. 极简主义按钮</h3>
                <button
                    class="px-4 py-2 text-blue-500 border border-blue-500 rounded hover:bg-blue-50 transition-colors">
                    极简按钮
                </button>
            </div>

            <!-- 5. 材质设计按钮 (Material Design) -->
            <div class="p-4 bg-gray-50 rounded-lg">
                <h3 class="font-medium mb-2">5. 材质设计按钮</h3>
                <button
                    class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:shadow-lg hover:bg-blue-600 transition-all">
                    材质按钮
                </button>
            </div>

            <!-- 6. 玻璃拟态按钮 (Glassmorphism) -->
            <div class="p-4 bg-gray-500 rounded-lg">
                <h3 class="font-medium mb-2">6. 玻璃拟态按钮</h3>
                <button
                    class="px-4 py-2 bg-white/30 backdrop-blur-sm text-black rounded-lg border border-white/20 hover:bg-white/50 transition-all">
                    玻璃按钮
                </button>
            </div>

            <!-- 7. 复古风格按钮 (Retro) -->
            <div class="p-4 bg-gray-50 rounded-lg">
                <h3 class="font-medium mb-2">7. 复古风格按钮</h3>
                <button
                    class="px-4 py-2 bg-yellow-400 text-black rounded font-bold shadow-md hover:bg-yellow-500 transition-colors">
                    复古按钮
                </button>
            </div>

            <!-- 8. 3D 按钮 (3D Style) -->
            <div class="p-4 bg-gray-50 rounded-lg">
                <h3 class="font-medium mb-2">8. 3D 按钮</h3>
                <button
                    class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-[0_8px_0_#1e40af] hover:shadow-[0_4px_0_#1e40af] hover:translate-y-1 transition-all">
                    3D 按钮
                </button>
            </div>

            <!-- 9. 暗黑模式按钮 (Dark Mode) -->
            <div class="p-4 bg-gray-50 rounded-lg">
                <h3 class="font-medium mb-2">9. 暗黑模式按钮</h3>
                <button
                    class="px-4 py-2 bg-white text-gray-800 rounded shadow-md hover:bg-gray-100 transition-colors dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                    暗黑按钮
                </button>
            </div>

            <!-- 10. 渐变按钮 (Gradient) -->
            <div class="p-4 bg-gray-50 rounded-lg">
                <h3 class="font-medium mb-2">10. 渐变按钮</h3>
                <button
                    class="px-4 py-2 bg-gradient-to-r from-red-500 to-purple-600 text-white rounded-lg shadow-md hover:from-red-600 hover:to-purple-700 transition-all">
                    渐变按钮
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
// Vue 3 组合式 API
// 不需要额外的逻辑
</script>

<style scoped>
/* 如果需要自定义样式可以在这里添加 */
</style>