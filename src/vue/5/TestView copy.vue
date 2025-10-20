<template>
    <div class="space-y-2">
        <div class="flex flex-wrap gap-2">
            <Button :loading="loading"
                class="bg-slate-500 text-white hover:bg-slate-400 active:bg-slate-600">slate</Button>
            <Button :loading="loading" class="bg-gray-500 text-white hover:bg-gray-400 active:bg-gray-600">gray</Button>
            <Button :loading="loading" class="bg-zinc-500 text-white hover:bg-zinc-400 active:bg-zinc-600">zinc</Button>
            <Button :loading="loading"
                class="bg-neutral-500 text-white hover:bg-neutral-400 active:bg-neutral-600">neutral</Button>
            <Button :loading="loading"
                class="bg-stone-500 text-white hover:bg-stone-400 active:bg-stone-600">stone</Button>
            <Button :loading="loading" class="bg-red-500 text-white hover:bg-red-400 active:bg-red-600">red</Button>
            <Button :loading="loading"
                class="bg-orange-500 text-white hover:bg-orange-400 active:bg-orange-600">orange</Button>
            <Button :loading="loading"
                class="bg-amber-500 text-white hover:bg-amber-400 active:bg-amber-600">amber</Button>
            <Button :loading="loading"
                class="bg-yellow-500 text-white hover:bg-yellow-400 active:bg-yellow-600">yellow</Button>
            <Button :loading="loading" class="bg-lime-500 text-white hover:bg-lime-400 active:bg-lime-600">lime</Button>
            <Button :loading="loading"
                class="bg-green-500 text-white hover:bg-green-400 active:bg-green-600">green</Button>
            <Button :loading="loading"
                class="bg-emerald-500 text-white hover:bg-emerald-400 active:bg-emerald-600">emerald</Button>
            <Button :loading="loading" class="bg-teal-500 text-white hover:bg-teal-400 active:bg-teal-600">teal</Button>
            <Button :loading="loading" class="bg-cyan-500 text-white hover:bg-cyan-400 active:bg-cyan-600">cyan</Button>
            <Button :loading="loading" class="bg-sky-500 text-white hover:bg-sky-400 active:bg-sky-600">sky</Button>
            <Button :loading="loading" class="bg-blue-500 text-white hover:bg-blue-400 active:bg-blue-600">blue</Button>
            <Button :loading="loading"
                class="bg-indigo-500 text-white hover:bg-indigo-400 active:bg-indigo-600">indigo</Button>
            <Button :loading="loading"
                class="bg-violet-500 text-white hover:bg-violet-400 active:bg-violet-600">violet</Button>
            <Button :loading="loading"
                class="bg-purple-500 text-white hover:bg-purple-400 active:bg-purple-600">purple</Button>
            <Button :loading="loading"
                class="bg-fuchsia-500 text-white hover:bg-fuchsia-400 active:bg-fuchsia-600">fuchsia</Button>
            <Button :loading="loading" class="bg-pink-500 text-white hover:bg-pink-400 active:bg-pink-600">pink</Button>
            <Button :loading="loading" class="bg-rose-500 text-white hover:bg-rose-400 active:bg-rose-600">rose</Button>
        </div>

        <div class="flex flex-wrap gap-2">
            <!-- 小按钮 -->
            <Button :loading="loading" class="w-16 h-8 text-xs">
                xs
            </Button>
            <!-- 较小按钮 -->
            <Button :loading="loading" class="w-20 h-9 text-sm">
                sm
            </Button>
            <!-- 中按钮 -->
            <Button :loading="loading" class="w-24 h-10 text-base">
                base
            </Button>
            <!-- 较大按钮 -->
            <Button :loading="loading" class="w-28 h-11 text-lg">
                lg
            </Button>
            <!-- 大按钮 -->
            <Button :loading="loading" class="w-32 h-12 text-xl">
                xl
            </Button>
            <!-- 大按钮 -->
            <Button :loading="loading" class="w-36 h-13 text-2xl">
                2xl
            </Button>
            <Button :loading="loading" class="w-40 h-14 text-3xl">
                3xl
            </Button>
        </div>
        <div class="flex flex-wrap gap-2">
            <Button :loading="loading" class="w-[10%]">10%父元素宽度</Button>
            <Button :loading="loading" class="w-[15%]">15%父元素宽度</Button>
            <Button :loading="loading" class="w-[20%]">20%父元素宽度</Button>
        </div>
        <div class="flex flex-wrap gap-2">
            <Button :loading="loading" class="rounded-none">无圆角</Button>
            <Button :loading="loading" class="rounded-sm ">小圆角</Button>
            <Button :loading="loading" class="rounded">默认圆角</Button>
            <Button :loading="loading" class="rounded-md">中圆角</Button>
            <Button :loading="loading" class="rounded-lg ">大圆角</Button>
            <Button :loading="loading" class="rounded-xl">更大圆角</Button>
            <Button :loading="loading" class="rounded-2xl">超大圆角</Button>
            <Button :loading="loading" class="rounded-full">全圆角</Button>
        </div>
        <div class="flex flex-wrap gap-2">
            <Button :loading="loading"
                class="bg-gray-200 text-blue-500 hover:bg-blue-500 hover:text-white active:bg-slate-600 disabled:text-black">slate</Button>
        </div>

        <button class="bg-black text-white px-3 py-1 rounded" @click="loading = !loading">
            {{ loading ? '加载中' : '切换加载' }}
        </button>
    </div>
</template>

<script setup>
import Button from '@/components/examples/Button.vue'
import { ref } from 'vue'
const loading = ref(false)
</script>