<script setup lang="ts">
import { ref, watch, nextTick, computed, useAttrs } from 'vue';
import { twMerge } from 'tailwind-merge';

const attrs = useAttrs();

// 过滤掉class属性，保留其他所有属性和事件
const filteredAttrs = computed(() => {
    const { class: _, ...rest } = attrs;
    return rest;
});

const props = defineProps<{
    modelValue?: string | null;
    maxSizeMB?: number;
    class?: string;
    inputClass?: string;
    noImageContainerClass?: string;
    iconClass?: string;
    imageContainerClass?: string;
    imageClass?: string;
    overlayClass?: string;
    editButtonClass?: string;
    deleteButtonClass?: string;
    buttonIconClass?: string;
}>();

const emit = defineEmits<{
    'update:modelValue': [value: string | null];
}>();
const maxSizeMB = props.maxSizeMB ?? 1;

// 合并根容器 class（用户 class 优先级高）
const mergedRootClass = computed(() => {
    return twMerge('w-20 aspect-square border border-dashed rounded-xl m-2 overflow-hidden relative cursor-pointer', props.class);
});

// 合并文件输入框 class（用户 class 优先级高）
const mergedInputClass = computed(() => {
    return twMerge('hidden', props.inputClass);
});

// 合并无图片状态容器 class（用户 class 优先级高）
const mergedNoImageContainerClass = computed(() => {
    return twMerge('w-full h-full flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors', props.noImageContainerClass);
});

// 合并图标 class（用户 class 优先级高）
const mergedAddIconClass = computed(() => {
    return twMerge('w-1/2 h-1/2 text-gray-400', props.iconClass);
});

// 合并有图片状态容器 class（用户 class 优先级高）
const mergedImageContainerClass = computed(() => {
    return twMerge('relative w-full h-full group', props.imageContainerClass);
});

// 合并图片 class（用户 class 优先级高）
const mergedImageClass = computed(() => {
    return twMerge('w-full h-full object-contain', props.imageClass);
});

// 合并操作按钮层 class（用户 class 优先级高）
const mergedOverlayClass = computed(() => {
    return twMerge('absolute inset-0 bg-black/80 flex items-center justify-evenly cursor-default', props.overlayClass);
});

// 合并编辑按钮 class（用户 class 优先级高）
const mergedEditButtonClass = computed(() => {
    return twMerge('w-1/3 aspect-square bg-black border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-blue-500 shadow-lg transition-all cursor-pointer', props.editButtonClass);
});

// 合并删除按钮 class（用户 class 优先级高）
const mergedDeleteButtonClass = computed(() => {
    return twMerge('w-1/3 aspect-square bg-black border-2 border-white rounded-full flex items-center justify-center text-white hover:bg-red-500 shadow-lg transition-all cursor-pointer', props.deleteButtonClass);
});

// 合并按钮图标 class（用户 class 优先级高）
const mergedButtonIconClass = computed(() => {
    return twMerge('w-1/2 h-1/2', props.buttonIconClass);
});

const fileInput = ref<HTMLInputElement | null>(null);
const imageUrl = computed({
    get: () => props.modelValue ?? null,
    set: (value) => emit('update:modelValue', value)
});
const fileRef = ref<File | null>(null);
const isHover = ref(false); // 使用 boolean 类型而非 Boolean 对象
const isLoading = ref(false); // 图片加载状态

// 开发环境日志函数
const devLog = (...args: any[]) => {
    if (import.meta.env.DEV) {
        console.log(...args);
    }
};

// 触发文件选择
const handleTriggerFileInput = () => {
    devLog('触发文件选择器');
    isLoading.value = true;
    // 清空文件输入框的值，确保选择同一文件时也能触发change事件
    if (fileInput.value) {
        fileInput.value.value = '';
    }

    // 监听文件选择器的取消操作
    const handleCancel = () => {
        devLog('用户取消了文件选择');
        isLoading.value = false;
        if (fileInput.value) {
            fileInput.value.removeEventListener('cancel', handleCancel);
        }
    };

    if (fileInput.value) {
        fileInput.value.addEventListener('cancel', handleCancel);
    }

    fileInput.value?.click();
};

// 加载图片
const handleLoadImage = (event: Event) => {
    devLog('开始处理图片上传');
    isLoading.value = true;

    // 移除可能存在的cancel事件监听器
    if (fileInput.value) {
        fileInput.value.removeEventListener('cancel', () => { });
    }
    const file = (event.target as HTMLInputElement).files?.[0];

    if (!file) {
        devLog('未选择文件');
        isLoading.value = false;
        return;
    }

    if (!file.type.startsWith('image/')) {
        devLog('选择的文件不是图片类型:', file.type);
        isLoading.value = false;
        return;
    }

    devLog('选择的图片信息:', {
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
        type: file.type
    });

    if (file.size > maxSizeMB * 1024 * 1024) {
        devLog(`图片大小超限: ${(file.size / 1024 / 1024).toFixed(2)}MB > ${maxSizeMB}MB`);
        alert(`图片大小不能超过${maxSizeMB}MB`);
        isLoading.value = false;
        return;
    }

    if (imageUrl.value) {
        devLog('释放之前的图片URL');
        URL.revokeObjectURL(imageUrl.value);
    }

    const newImageUrl = URL.createObjectURL(file);
    imageUrl.value = newImageUrl;
    fileRef.value = file;
    devLog('图片上传成功，生成预览URL:', newImageUrl);

    // 使用nextTick确保DOM更新完成后再重置悬浮状态
    nextTick(() => {
        // 增加延迟时间，确保浏览器完成所有事件处理和渲染
        setTimeout(() => {
            isHover.value = false;
            isLoading.value = false;
            devLog('DOM更新完成，重置isHover状态');
        }, 50);
    });
};

// 移除图片
const handleRemoveImage = () => {
    devLog('开始移除图片');

    if (imageUrl.value) {
        devLog('释放图片URL:', imageUrl.value);
        URL.revokeObjectURL(imageUrl.value);
    }

    imageUrl.value = null;
    fileRef.value = null;

    if (fileInput.value) {
        fileInput.value.value = '';
        devLog('清空文件输入框');
    }

    devLog('图片移除完成');

    // 重置悬浮状态
    isHover.value = false;
};

// 监听isHover状态变动
watch(isHover, (newValue, oldValue) => {
    if (import.meta.env.DEV) {
        console.log(`isHover状态变动: ${oldValue} -> ${newValue}`);
        console.trace('isHover状态变动调用栈:');
    }
});

defineExpose({
    getFile: () => fileRef.value,
    getImageUrl: () => imageUrl.value
});
</script>

<template>
    <div :class="mergedRootClass" v-bind="filteredAttrs">
        <input type="file" accept="image/*" :class="mergedInputClass" @change="handleLoadImage" ref="fileInput" />

        <!-- 无图片状态 -->
        <div v-if="!imageUrl" :class="mergedNoImageContainerClass" @click="handleTriggerFileInput">
            <slot name="add-icon" :class="mergedAddIconClass">
                <svg viewBox="0 0 24 24" :class="mergedAddIconClass" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
            </slot>
        </div>

        <!-- 有图片状态 -->
        <div v-else :class="mergedImageContainerClass" @mouseenter="!isLoading && (isHover = true)"
            @mouseleave="!isLoading && (isHover = false)">
            <img :src="imageUrl" :class="mergedImageClass" />

            <!-- 操作按钮层 -->
            <transition name="fade">
                <div v-if="isHover" :class="mergedOverlayClass">
                    <button @click.stop="handleTriggerFileInput(); isHover = false" :class="mergedEditButtonClass">
                        <slot name="edit-icon" :class="mergedButtonIconClass">
                            <svg viewBox="0 0 24 24" :class="mergedButtonIconClass" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="m18.5 2.5-8 8v4h4l8-8a2.828 2.828 0 1 0-4-4z"></path>
                            </svg>
                        </slot>
                    </button>
                    <button @click.stop="handleRemoveImage" :class="mergedDeleteButtonClass">
                        <slot name="delete-icon" :class="mergedButtonIconClass">
                            <svg viewBox="0 0 24 24" :class="mergedButtonIconClass" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </slot>
                    </button>
                </div>
            </transition>
        </div>
    </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>