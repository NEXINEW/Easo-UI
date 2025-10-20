<template>
    <div class="w-screen h-screen flex overflow-hidden bg-gray-50">
        <!-- 左侧导航栏 -->
        <div class="w-64 h-full bg-gradient-to-b from-blue-600 to-indigo-700 text-white flex flex-col shadow-lg">
            <!-- 标题和图标 -->
            <div class="p-6 flex items-center space-x-3 border-b border-blue-500/30">
                <!-- 图标 -->
                <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
                    <span class="text-blue-600 font-bold text-xl">E</span>
                </div>
                <!-- 标题 -->
                <span class="text-xl font-bold">Easo UI</span>
            </div>

            <!-- 搜索框 -->
            <div class="px-6 pt-6 pb-4">
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-blue-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                    <input type="text" placeholder="搜索组件..."
                        class="w-full pl-10 pr-4 py-2 bg-blue-700/30 border border-blue-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-white placeholder-blue-300">
                </div>
            </div>

            <!-- 组件分类和组件列表 -->
            <div class="flex-1 overflow-y-auto px-4 py-2">
                <!-- 通用组件 -->
                <div class="mb-6">
                    <h2 class="text-xs uppercase tracking-wider text-blue-200 font-semibold mb-3 px-2">通用</h2>
                    <div class="space-y-1">
                        <a href="#"
                            class="flex items-center px-3 py-2 text-sm rounded-lg hover:bg-blue-700/50 transition-colors duration-200">
                            <svg class="w-5 h-5 mr-3 text-blue-300" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122">
                                </path>
                            </svg>
                            按钮
                        </a>
                        <a href="#"
                            class="flex items-center px-3 py-2 text-sm rounded-lg hover:bg-blue-700/50 transition-colors duration-200">
                            <svg class="w-5 h-5 mr-3 text-blue-300" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z">
                                </path>
                            </svg>
                            分隔符
                        </a>
                        <a href="#"
                            class="flex items-center px-3 py-2 text-sm rounded-lg hover:bg-blue-700/50 transition-colors duration-200">
                            <svg class="w-5 h-5 mr-3 text-blue-300" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                            </svg>
                            切换开关
                        </a>
                    </div>
                </div>

                <!-- 表单组件 -->
                <div class="mb-6">
                    <h2 class="text-xs uppercase tracking-wider text-blue-200 font-semibold mb-3 px-2">表单</h2>
                    <div class="space-y-1">
                        <a href="#"
                            class="flex items-center px-3 py-2 text-sm rounded-lg bg-blue-700/50 transition-colors duration-200">
                            <svg class="w-5 h-5 mr-3 text-blue-300" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                                </path>
                            </svg>
                            输入框
                        </a>
                        <a href="#"
                            class="flex items-center px-3 py-2 text-sm rounded-lg hover:bg-blue-700/50 transition-colors duration-200">
                            <svg class="w-5 h-5 mr-3 text-blue-300" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
                            </svg>
                            选择器
                        </a>
                        <a href="#"
                            class="flex items-center px-3 py-2 text-sm rounded-lg hover:bg-blue-700/50 transition-colors duration-200">
                            <svg class="w-5 h-5 mr-3 text-blue-300" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                                </path>
                            </svg>
                            日期选择器
                        </a>
                        <a href="#"
                            class="flex items-center px-3 py-2 text-sm rounded-lg hover:bg-blue-700/50 transition-colors duration-200">
                            <svg class="w-5 h-5 mr-3 text-blue-300" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            时间选择器
                        </a>
                        <a href="#"
                            class="flex items-center px-3 py-2 text-sm rounded-lg hover:bg-blue-700/50 transition-colors duration-200">
                            <svg class="w-5 h-5 mr-3 text-blue-300" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
                            </svg>
                            数字输入框
                        </a>
                    </div>
                </div>

                <!-- 布局组件 -->
                <div class="mb-6">
                    <h2 class="text-xs uppercase tracking-wider text-blue-200 font-semibold mb-3 px-2">布局</h2>
                    <div class="space-y-1">
                        <a href="#"
                            class="flex items-center px-3 py-2 text-sm rounded-lg hover:bg-blue-700/50 transition-colors duration-200">
                            <svg class="w-5 h-5 mr-3 text-blue-300" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
                                </path>
                            </svg>
                            栅格系统
                        </a>
                        <a href="#"
                            class="flex items-center px-3 py-2 text-sm rounded-lg hover:bg-blue-700/50 transition-colors duration-200">
                            <svg class="w-5 h-5 mr-3 text-blue-300" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                            </svg>
                            间距
                        </a>
                        <a href="#"
                            class="flex items-center px-3 py-2 text-sm rounded-lg hover:bg-blue-700/50 transition-colors duration-200">
                            <svg class="w-5 h-5 mr-3 text-blue-300" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                            对齐方式
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- 右侧组件展示区 -->
        <div class="flex-1 h-full overflow-hidden p-4">
            <div class="h-full flex flex-col">
                <!-- 组件网格 -->
                <div class="grid grid-cols-3 grid-rows-2 gap-4 flex-1">
                    <!-- 按钮组件卡片 -->
                    <div v-for="i in 6" :key="i"
                        class="bg-white w-full h-full rounded-xl shadow-sm  hover:shadow-lg transition-all duration-300 border border-gray-100 group">
                        <div
                            class="h-36 bg-gray-50 flex items-center justify-center p-4 border-b border-gray-100 relative">
                            {{ i }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// 这里可以添加组件的逻辑代码
</script>