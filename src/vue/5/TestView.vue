<script lang="ts">

</script>

<script setup kang="ts">

</script>

<template>
    <div class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-5 rounded-2xl text-white w-sm bg-amber-400">
        <div class="flex gap-2 justify-start items-center">
            <slot name="icon">
                <svg t="1750660993388" class="icon w-6 h-6" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="5869" width="200" height="200">
                    <path
                        d="M1024 512c0-282.763636-229.236364-512-512-512C229.236364 0 0 229.236364 0 512c0 282.763636 229.236364 512 512 512C794.763636 1024 1024 794.763636 1024 512zM523.636364 232.727273c32.116364 0 58.181818 26.065455 58.181818 58.181818 0 32.116364-26.065455 58.181818-58.181818 58.181818C491.52 349.090909 465.454545 323.025455 465.454545 290.909091 465.454545 258.792727 491.52 232.727273 523.636364 232.727273zM395.636364 768 465.454545 768l0-325.818182L395.636364 442.181818l0-46.545455 186.181818 0 0 372.363636L651.636364 768l0 46.545455L395.636364 814.545455 395.636364 768z"
                        fill="currentColor" p-id="5870"></path>
                </svg>
            </slot>
            <span class="font-bold text-2xl">
                你好
            </span>
        </div>
        <div>
            <button>
                取消
            </button>
            <button>
                确认
            </button>
        </div>
    </div>
</template>