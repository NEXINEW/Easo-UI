<script setup lang="ts">
import { useAttrs, computed, useTemplateRef, ref, onMounted, nextTick, onBeforeUnmount } from 'vue';
import { twMerge } from 'tailwind-merge';

/**禁止默认的透传
 * 防止干扰到样式
 */
defineOptions({
    inheritAttrs: false
})

/**
 * 这是透传
 */
const attrs = useAttrs()

/**
 * 这是过滤后的透传
 * 剔除掉class
 */
const filterAttrs = computed(() => {
    const { class: _class, ...rest } = attrs
    return rest
})

/**
 * 这是props的声明
 */
interface Props {
    active: boolean
    trackBaseClass?: string
    thumbClass?: string
    duration?: number
    timingFunction?: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out'
};

/**
 * 根据props的声明构建prop实例
 */
const prop = withDefaults(defineProps<Props>(), {
    trackBaseClass: "",
    thumbClass: "",
    duration: 200,
    timingFunction: 'ease-out'
})

/**
 * 这是基础根样式与用户写的样式合并
 * 用户写的优先级更高
 */
const mergedRootClass = computed(() => {
    return twMerge(
        "w-12 h-4 rounded-full cursor-pointer bg-gray-400 m-20 flex relative",
        attrs.class as string || ""
    )
})

/**
 * 根据是否激活，返回不同的translateX
 */
const mergedTrackBaseClass = computed(() => {
    let trackBaseTransX;
    if (!prop.active) {
        trackBaseTransX = '-translate-x-1/1';
    } else {
        trackBaseTransX = '';
    }
    return twMerge(
        'h-full bg-blue-400 transition-all',
        prop.trackBaseClass,
        prop.timingFunction,
        trackBaseTransX
    );
});

/**
 * 滑块样式
 * 用户写的优先级更高
 */
const mergedThumbClass = computed(() => {
    return twMerge(
        "w-5 h-5 bg-white -translate-y-[50%] rounded-full",
        prop.thumbClass,
        prop.timingFunction
    )
})

const root = useTemplateRef('root')
const thumb = useTemplateRef('thumb')
const forceUpdateKey = ref(0)
const isReady = ref(false)


/**
 * 监听样式变化
 * 本来只需要监听尺寸变化的
 * 但是如果这样的话
 * 圆角就必须通过props传递
 * 在我看来
 * 既然样式与根的圆角统一
 * 那就监听样式变化吧
 * 功能稍微冗余了
 */
let mutationObserver: MutationObserver | null = null

onMounted(() => {
    nextTick(() => {
        /**
         * 确保dom完成后再采用动画
         * 为什么呢
         * 因为动画存在
         * thumb的初始translateX初始为0
         * 但本该为计算好的tanslateX
         * 这样首次加载存在抖动
         * 而加上这个就不存在该情况
         */
        setTimeout(() => {
            isReady.value = true
        }, 0)
    })
    if (root.value && thumb.value) {
        mutationObserver = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (
                    mutation.type === 'attributes' &&
                    (mutation.attributeName === 'style' || mutation.attributeName === 'class')
                ) {
                    // 触发更新
                    nextTick(() => {
                        forceUpdateKey.value++
                    })
                    break
                }
            }
        })

        mutationObserver.observe(root.value, {
            attributes: true,
            attributeFilter: ['style', 'class']
        })
        mutationObserver.observe(thumb.value, {
            attributes: true,
            attributeFilter: ['style', 'class']
        })
    }
})
/**
 * 卸载掉监听
 */
onBeforeUnmount(() => {
    if (mutationObserver) {
        mutationObserver.disconnect()
    }
})

/**
 * 激活与否返回不同的translateX
 */
const translateX = computed(() => {
    forceUpdateKey.value
    if (root.value && thumb.value) {
        if (prop.active) {
            const x = root.value.offsetWidth - root.value.offsetHeight / 2 - thumb.value.offsetWidth / 2
            return x
        } else {
            const x = root.value.offsetHeight / 2 - thumb.value.offsetWidth / 2
            return x
        }
    }

})

/**
 * 直接将root的圆角赋值给trackbase
 */
const rootBorderRadius = computed(() => {
    forceUpdateKey.value
    if (!root.value || typeof getComputedStyle === 'undefined') return
    const borderRadius = getComputedStyle(root.value).borderRadius
    return borderRadius
})
</script>

<template>
    <div :class="mergedRootClass" v-bind="filterAttrs" ref="root">
        <div class="w-full h-full overflow-hidden" :style="{ borderRadius: rootBorderRadius }">
            <div :class="mergedTrackBaseClass" :style="{ transitionDuration: `${prop.duration}ms` }"></div>
        </div>
        <div class="w-full h-0 bg-red-200 shrink-0 absolute top-1/2">
            <div :class="mergedThumbClass" ref="thumb"
                :style="{ transform: `translateX(${translateX}px)`, transitionDuration: isReady ? `${prop.duration}ms` : '0ms' }">
            </div>
        </div>
    </div>
</template>
