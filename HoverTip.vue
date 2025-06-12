<script setup lang="ts">
import { ref, onMounted, watch, nextTick, computed } from 'vue'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(...inputs))
}

const props = withDefaults(
    defineProps<{
        open: boolean
        placement: 'top' | 'bottom' | 'left' | 'right'
        tipClass?: string
        arrowClass?: string
        showArrow?: boolean
    }>(),
    {
        open: false,
        showArrow: true,
    }
)

const triggerRef = ref<HTMLElement | null>(null)
const tipRef = ref<HTMLElement | null>(null)

// 自定义防抖函数
const debounce = <T extends (...args: any[]) => void>(fn: T, wait: number) => {
    let timeout: ReturnType<typeof setTimeout> | null = null
    return (...args: Parameters<T>) => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => fn(...args), wait)
    }
}

// 动态更新工具提示尺寸
const updateTipSize = debounce(() => {
    if (!triggerRef.value || !tipRef.value) {
        if (import.meta.env.DEV) {
            console.warn('Tooltip: triggerRef or tipRef is not available')
        }
        return
    }
    const rect = triggerRef.value.getBoundingClientRect()
    if (props.placement === 'top' || props.placement === 'bottom') {
        tipRef.value.style.width = `${rect.width}px`
        tipRef.value.style.height = 'auto'
    } else {
        tipRef.value.style.height = `${rect.height}px`
        tipRef.value.style.width = 'auto'
    }
}, 100)

// 监听尺寸变化
onMounted(() => {
    updateTipSize()
    const observer = new ResizeObserver(updateTipSize)
    if (triggerRef.value) observer.observe(triggerRef.value)
    if (tipRef.value) observer.observe(tipRef.value)
    return () => observer.disconnect()
})

// 监听 open 变化
watch(() => props.open, (val) => {
    if (val) nextTick(updateTipSize)
})

// 工具提示的动态类名，在 computed 中完成所有类合并
const tipClasses = computed(() =>
    cn(
        'absolute z-10 flex items-center justify-center bg-blue-300 text-white rounded-md shadow-lg p-2',
        {
            'top-full left-1/2 -translate-x-1/2 mt-2 translate-y-1': props.placement === 'bottom',
            'bottom-full left-1/2 -translate-x-1/2 mb-2 -translate-y-1': props.placement === 'top',
            'left-full top-1/2 -translate-y-1/2 ml-2 translate-x-1': props.placement === 'right',
            'right-full top-1/2 -translate-y-1/2 ml-2 -translate-x-1': props.placement === 'left',
        },
        props.tipClass
    )
)

// 箭头的动态类名
const arrowClasses = computed(() =>
    cn(
        'absolute w-2 h-2 bg-blue-300 rotate-45 z-0',
        {
            'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2': props.placement === 'bottom',
            'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2': props.placement === 'top',
            'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2': props.placement === 'right',
            'right-0 top-1/2 translate-x-1/2 -translate-y-1/2': props.placement === 'left',
        },
        props.arrowClass
    )
)
</script>

<template>
    <div class="relative">
        <div ref="triggerRef">
            <slot name="trigger" />
        </div>
        <Transition>
            <div v-show="props.open" :class="tipClasses" ref="tipRef">
                <div v-if="props.showArrow" :class="arrowClasses" />
                <div class="relative z-10">
                    <slot name="content" />
                </div>
            </div>
        </Transition>
    </div>
</template>
