import { defineComponent, h, ref, onMounted, computed, createVNode, render } from 'vue'

// 消息组件定义
const MessageComponent = defineComponent({
  props: {
    message: String,
    type: String,
    duration: Number,
    onClose: Function
  },
  setup(props) {
    const visible = ref(true)

    onMounted(() => {
      setTimeout(() => {
        visible.value = false
        setTimeout(() => props.onClose?.(), 300) // 等动画结束
      }, props.duration ?? 2000)
    })

    const typeClass = computed(() => {
      switch (props.type) {
        case 'success': return 'bg-green-500 text-white'
        case 'error': return 'bg-red-500 text-white'
        case 'warning': return 'bg-yellow-500 text-white'
        case 'info': return 'bg-blue-500 text-white'
        default: return 'bg-green-500 text-white'
      }
    })

    const typeIcon = computed(() => {
      const base = 'class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"'
      switch (props.type) {
        case 'success': return `<svg xmlns="http://www.w3.org/2000/svg" ${base}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>`
        case 'error': return `<svg xmlns="http://www.w3.org/2000/svg" ${base}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>`
        case 'warning': return `<svg xmlns="http://www.w3.org/2000/svg" ${base}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>`
        case 'info': return `<svg xmlns="http://www.w3.org/2000/svg" ${base}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
        default: return ''
      }
    })

    return () =>
      visible.value &&
      h(
        'div',
        {
          class:
            'fixed top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded shadow transition-opacity duration-300 flex items-center space-x-2 ' +
            typeClass.value
        },
        [
          typeIcon.value &&
            h('span', { class: 'flex-shrink-0', innerHTML: typeIcon.value }),
          h('span', props.message)
        ]
      )
  }
})

// 通用创建函数
function createMessage(
  text: string,
  type: 'success' | 'error' | 'warning' | 'info',
  duration = 2000
) {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const vnode = createVNode(MessageComponent, {
    message: text,
    type,
    duration,
    onClose: () => {
      render(null, container)
      document.body.removeChild(container)
    }
  })

  render(vnode, container)
}

// 导出 API
export const Msg = {
  success: (text: string, duration?: number) =>
    createMessage(text, 'success', duration),
  error: (text: string, duration?: number) =>
    createMessage(text, 'error', duration),
  warning: (text: string, duration?: number) =>
    createMessage(text, 'warning', duration),
  info: (text: string, duration?: number) =>
    createMessage(text, 'info', duration)
}
