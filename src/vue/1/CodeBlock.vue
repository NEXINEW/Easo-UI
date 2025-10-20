<!--
 * @description Easo UI的代码块显示组件，用于展示代码并提供语法高亮和复制功能
 * @file CodeBlock.vue
 * @author EasoUI Team
-->

<template>
    <div class="overflow-auto flex flex-col w-full h-full ">
        <pre class="bg-white text-sm font-mono flex">
            <!-- 使用 highlight.js 的 javascript 语言包进行代码高亮 -->
            <code ref="codeBlock" class="language-javascript" style="width: 100%;"><slot/></code>
        </pre>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import hljs from 'highlight.js'
// 引入 javascript 语言包
import javascript from 'highlight.js/lib/languages/javascript'
// 引入 github-dark 主题
import 'highlight.js/styles/github-dark.css'
// 注册 javascript 语言包
hljs.registerLanguage('javascript', javascript)

// 定义Props接口
interface Props {
    title: string
}

// 定义Emits类型
type Emits = {
    copy: [content: string]
}

const codeBlock = ref<HTMLElement | null>(null)
const copyStatus = ref<string>('复制')
const copied = ref<boolean>(false)

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

// 获取代码内容
const getCodeText = (): string => {
    if (!codeBlock.value) return ''
    return codeBlock.value.textContent || ''
}

// 复制代码
const copyCode = (): void => {
    if (!codeBlock.value) return

    const codeText = getCodeText()
    navigator.clipboard.writeText(codeText)
        .then(() => {
            copyStatus.value = '已复制!'
            copied.value = true
            emit('copy', codeText) // 触发copy事件，传递复制的内容
            setTimeout(() => {
                copyStatus.value = '复制'
                copied.value = false
            }, 2000)
        })
        .catch((err: Error) => {
            console.error('复制失败:', err)
            copyStatus.value = '复制失败'
            copied.value = false
            setTimeout(() => {
                copyStatus.value = '复制'
            }, 2000)
        })
}

// 暴露方法给父组件
defineExpose({
    copyCode,
    getCodeText
})

onMounted(() => {
    if (codeBlock.value) {
        hljs.highlightElement(codeBlock.value)
    }
})
</script>

<style scoped>
pre {
    scrollbar-width: thin;
    scrollbar-color: rgba(99, 102, 241, 0.5) transparent;
}

pre::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background: transparent;
}

pre::-webkit-scrollbar-thumb {
    background-color: rgba(99, 102, 241, 0.5);
    border-radius: 4px;
}

pre::-webkit-scrollbar-track {
    background: transparent;
}
</style>
