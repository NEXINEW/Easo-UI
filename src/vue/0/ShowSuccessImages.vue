<script lang="ts">
export default {
    inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { ref, computed, watch, TransitionGroup } from 'vue';
import { ClassNameValue, twMerge } from 'tailwind-merge';

interface Props {
    urls: string[];
    boxClass?: ClassNameValue;
    imgClass?: ClassNameValue;
}

const props = defineProps<Props>();
const attrs = useAttrs();

// 使用 defineModel 实现 v-model 双向绑定
const selectedUrl = defineModel<string | undefined>({ default: undefined });

// 存储加载成功的 URL
const successfulUrls = ref<string[]>([]);

// 合并根元素类名
const rootClass = computed(() =>
    twMerge('w-full grid grid-cols-8 gap-1', attrs.class as ClassNameValue)
);

// 合并图片容器类名，动态应用激活样式
const boxClass = computed(() => (url: string) =>
    twMerge(
        'w-full aspect-square flex items-center justify-center cursor-pointer transition-all duration-200',
        selectedUrl.value === url ? 'bg-red-200' : '',
        props.boxClass
    )
);

// 合并图片类名
const imgClass = computed(() =>
    twMerge('w-[50%] aspect-square object-cover rounded-lg shadow-md', props.imgClass)
);

// 剩余属性
const restAttrs = computed(() => {
    const { class: _, ...rest } = attrs;
    return rest;
});

// 加载图片
const loadImages = (urls: string[]) => {
    successfulUrls.value = [];
    if (selectedUrl.value && urls.includes(selectedUrl.value)) {
        successfulUrls.value = [selectedUrl.value];
    }
    const uniqueUrls = [...new Set(urls)];
    uniqueUrls.forEach((url) => {
        if (successfulUrls.value.includes(url)) return;
        const img = new Image();
        img.src = url;
        img.onload = () => {
            if (!successfulUrls.value.includes(url)) {
                successfulUrls.value = [...successfulUrls.value, url];
            }
        };
        img.onerror = () => {
            console.warn(`图片加载失败: ${url}`);
        };
    });
};

// 点击选择图片
const selectImage = (url: string) => {
    selectedUrl.value = url;
};

// 监听 urls 变化
watch(
    () => props.urls,
    (newUrls) => {
        if (newUrls?.length) {
            loadImages(newUrls);
        } else {
            successfulUrls.value = [];
            selectedUrl.value = undefined;
        }
    },
    { immediate: true }
);

// 监听 selectedUrl 变化，确保在 successfulUrls 中
watch(selectedUrl, (newSelectedUrl) => {
    if (newSelectedUrl && !successfulUrls.value.includes(newSelectedUrl)) {
        successfulUrls.value = [newSelectedUrl, ...successfulUrls.value];
    }
});
</script>

<template>
    <div :class="rootClass" v-bind="restAttrs">

        <TransitionGroup name="slide-in">
            <div v-for="(url, index) in successfulUrls" :key="url" :class="boxClass(url)" @click="selectImage(url)"
                @keyup.enter="selectImage(url)" tabindex="0" :style="{ '--delay': index * 0.1 + 's' }">
                <img :class="imgClass" :src="url" :alt="`Icon ${index + 1}`" />
            </div>
        </TransitionGroup>

    </div>
</template>
<style scoped>
.slide-in-enter-from {
    opacity: 0;
    transform: translateX(100%) scale(0.2);
}

.slide-in-enter-to {
    opacity: 1;
    transform: translateX(0) scale(1);
}

.slide-in-leave-from {
    opacity: 1;
    transform: translateX(0) scale(1);
}

.slide-in-leave-to {
    opacity: 0;
}

.slide-in-enter-active {
    transition: all 0.2s ease-out;
    transition-delay: var(--delay, 0s);
}

.slide-in-leave-active {
    transition: all 0.1s ease-in;
}
</style>
