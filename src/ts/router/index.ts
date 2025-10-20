import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/vue/5/HomeView.vue'),
        },
        {
            path: '/components',
            name: 'components',
            component: () => import('@/vue/5/ComponentView.vue'),
        },
        {
            path: '/test',
            name: 'test',
            component: () => import('@/vue/5/TestView.vue'),
        },
    ]
})

export default router
