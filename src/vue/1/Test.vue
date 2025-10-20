<template>
    <pre class="p-4 bg-gray-50 rounded overflow-x-auto">
        <code ref="codeRef" class="text-sm font-mono">
          <slot></slot>
        </code>
    </pre>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick, defineExpose } from 'vue'

// 创建一个 ref 来引用 <code> 元素
const codeRef = ref<HTMLElement | null>(null)

// 定义一个响应式变量来存储代码内容
const codeContent = ref('')

// 定义一个响应式变量来控制复制成功提示的显示
const copySuccess = ref(false)

// 在组件挂载后获取代码内容
onMounted(() => {
    updateCodeContent()
})

// 定义一个方法来更新 codeContent
const updateCodeContent = () => {
    if (codeRef.value) {
        // 获取 <code> 元素内的纯文本内容
        codeContent.value = codeRef.value.textContent || ''
        console.log('当前插槽中的代码内容:', codeContent.value)
    }
}

// 复制代码到剪贴板的方法
const copyCode = async () => {
    if (!codeContent.value) return

    try {
        // 使用 Clipboard API 复制文本
        await navigator.clipboard.writeText(codeContent.value)

        // 显示复制成功提示
        copySuccess.value = true

        // 3秒后隐藏提示
        setTimeout(() => {
            copySuccess.value = false
        }, 3000)
    } catch (error) {
        console.error('复制失败:', error)
        // 备选方案：使用 document.execCommand('copy')
        const textarea = document.createElement('textarea')
        textarea.value = codeContent.value
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()

        try {
            document.execCommand('copy')
            copySuccess.value = true
            setTimeout(() => {
                copySuccess.value = false
            }, 3000)
        } catch (err) {
            console.error('备选复制方法失败:', err)
        } finally {
            document.body.removeChild(textarea)
        }
    }
}

// 如果你希望暴露这个内容给父组件使用，可以使用 defineExpose
defineExpose({
    getCodeContent: () => codeContent.value,
    updateCodeContent
})
</script>

<style scoped>
pre {
    position: relative;
}

code {
    display: block;
    white-space: pre-wrap;
    word-break: break-all;
}
</style>