<script setup lang="ts">
import Button from '@/vue/1/Button.vue'
import { ref } from 'vue'
const isLoading = ref<boolean>(false)
const isDisabled = ref<boolean>(false)
const handleAlert = () => {
    alert("点击事件执行成功")
}
</script>
<template>
    <div class="w-full flex flex-col justify-center items-center gap-2">

        <Button :loading="isLoading" :disabled="isDisabled" content-class="gap-2" loading-class="gap-2"
            @click="handleAlert()"
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400 active:bg-gray-600 disabled:hover:bg-gray-500">
            <template #loadingIcon>
                <svg t="1750389672026" class="icon w-4 h-4 animate-ping" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="11723" width="200" height="200">
                    <path
                        d="M512 512m-346.06933593 0a5.40733338 5.40733338 0 1 0 692.13867186 0 5.40733338 5.40733338 0 1 0-692.13867186 0Z"
                        fill="currentColor" p-id="11724"></path>
                </svg>
            </template>
            <template #loadingText>
                请稍后...
            </template>
            <template #leftIcon>
                <svg t="1750387821102" class="icon w-4 h-4" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="6476" width="200" height="200">
                    <path
                        d="M912 208H427.872l-50.368-94.176A63.936 63.936 0 0 0 321.056 80H112c-35.296 0-64 28.704-64 64v736c0 35.296 28.704 64 64 64h800c35.296 0 64-28.704 64-64v-608c0-35.296-28.704-64-64-64z m-800-64h209.056l68.448 128H912v97.984c-0.416 0-0.8-0.128-1.216-0.128H113.248c-0.416 0-0.8 0.128-1.248 0.128V144z m0 736v-96l1.248-350.144 798.752 1.216V784h0.064v96H112z"
                        fill="currentColor" p-id="6477"></path>
                </svg>
            </template>
            <template #rightIcon>
                <svg t="1750388096585" class="icon w-4 h-4" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="10475" width="200" height="200">
                    <path
                        d="M826.61 365.066c0 0 0 0 0 0-58.569 0-106.04800001 47.479-106.048 106.048 0 58.569 47.479 106.04800001 106.04799999 106.048 0 0 0 0 0 0 58.569 0 106.04800001-47.479 106.04800001-106.04800001 0-58.569-47.479-106.04800001-106.048-106.04799999 0 0 0 0 0 0z"
                        fill="currentColor" p-id="10476"></path>
                    <path
                        d="M512 365.066c0 0 0 0 0 0-58.569 0-106.04800001 47.479-106.04800001 106.048 0 58.569 47.479 106.04800001 106.04800001 106.04800001 0 0 0 0 0 0 58.569 0 106.04800001-47.479 106.04800001-106.04800001 0-58.569-47.479-106.04800001-106.04800001-106.048 0 0 0 0 0 0z"
                        fill="currentColor" p-id="10477"></path>
                    <path
                        d="M197.39 365.066c0 0 0 0 0 0-58.569 0-106.04800001 47.479-106.048 106.04799999 0 58.569 47.479 106.04800001 106.04800001 106.04800001 0 0 0 0 0 0 58.569 0 106.04800001-47.479 106.04799999-106.048 0-58.569-47.479-106.04800001-106.048-106.048 0 0 0 0 0 0z"
                        fill="currentColor" p-id="10478"></path>
                </svg>
            </template>
            文件夹
        </Button>
        <div class="space-x-2">
            <button class="w-20 cursor-pointer" @click="isLoading = !isLoading">
                {{ isLoading ? '默认状态' : '加载状态' }}
            </button>
            <button class="w-20 cursor-pointer" @click="isDisabled = !isDisabled">
                {{ isDisabled ? '解除禁用' : '禁用' }}
            </button>
        </div>
    </div>



</template>
