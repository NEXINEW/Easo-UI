import { defineComponent, h, createApp } from 'vue' 
 
// 获取图标样式类
function getIconClass(iconType: string): string {
  switch (iconType) {
    case 'success':
      return 'bg-green-500'
    case 'warning':
      return 'bg-yellow-500'
    case 'error':
      return 'bg-red-500'
    case 'info':
    default:
      return 'bg-blue-500'
  }
}

// 获取图标内容
function getIconContent(iconType: string): string {
  switch (iconType) {
    case 'success':
      return '✓'
    case 'warning':
      return '!'
    case 'error':
      return '×'
    case 'info':
    default:
      return 'i'
  }
}

// 定义Alert组件的Props类型
export interface AlertProps {
  onClose: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  showCancel?: boolean;
  confirmText?: string;
  cancelText?: string;
  icon?: string;      // 图标类型：success, warning, error, info
  showIcon?: boolean; // 是否显示图标
}

// 导出Alert组件（内部使用，不直接暴露给用户）
const AlertComponent = defineComponent({ 
  props: { 
    onClose: { type: Function, required: true }, 
    onConfirm: { type: Function, default: null }, 
    onCancel: { type: Function, default: null }, 
    showCancel: { type: Boolean, default: false }, 
    confirmText: { type: String, default: '确定' }, 
    cancelText: { type: String, default: '取消' },
    icon: { type: String, default: '' }, // 图标类型：success, warning, error, info
    showIcon: { type: Boolean, default: true } // 是否显示图标
  }, 
  setup(props, { slots }) { 
    return () => 
      h('div', { class: 'fixed inset-0 flex items-center justify-center z-50' }, [ 
        h('div', { 
          class: 'absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300', 
          onClick: () => props.showCancel && props.onCancel ? props.onCancel() : props.onClose() 
        }), 
        h('div', { class: 'relative bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-auto z-10 transition-all duration-300' }, [ 
          // 图标和内容区域
          h('div', { class: 'flex items-center mb-6' }, [
            // 如果需要显示图标
            props.showIcon && props.icon && h('div', { class: 'mr-4 flex-shrink-0' }, [
              // 根据图标类型显示不同的图标
              h('div', { 
                class: `w-8 h-8 rounded-full flex items-center justify-center ${getIconClass(props.icon)}` 
              }, [
                h('span', { class: 'text-white text-sm font-bold' }, getIconContent(props.icon))
              ])
            ]),
            // 内容
            h('div', { class: 'flex-1 text-base' }, slots.default?.())
          ]),
          // 按钮区域
          h('div', { class: 'flex justify-end space-x-3 mt-6' }, [ 
            props.showCancel && 
              h('button', { 
                class: 'px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors duration-200 cursor-pointer', 
                onClick: () => props.onCancel ? props.onCancel() : props.onClose() 
              }, props.cancelText), 
            h('button', { 
              class: 'px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-200 cursor-pointer', 
              onClick: () => props.onConfirm ? props.onConfirm() : props.onClose() 
            }, props.confirmText) 
          ]) 
        ]) 
      ]) 
  } 
})

interface AlertOptions { 
  content: string 
  showCancel?: boolean 
  confirmText?: string 
  cancelText?: string 
  icon?: string      // 图标类型：success, warning, error, info
  showIcon?: boolean // 是否显示图标
} 
 
function mountAlert(opts: { 
  content: string 
  onClose: () => void 
  onConfirm?: () => void 
  onCancel?: () => void 
  showCancel?: boolean 
  confirmText?: string 
  cancelText?: string 
  icon?: string      // 图标类型
  showIcon?: boolean // 是否显示图标
}) { 
  const container = document.createElement('div') 
  document.body.appendChild(container) 
 
  const app = createApp({ 
    render: () => h(AlertComponent, { 
      ...opts 
    }, { 
      default: () => opts.content 
    }) 
  }) 
 
  app.mount(container) 
 
  return () => { 
    app.unmount() 
    document.body.removeChild(container) 
  } 
} 
 
export function showAlert(content: string, icon: string = 'info') { 
  const close = mountAlert({ 
    content, 
    icon,           // 传递图标类型
    showIcon: true, // 默认显示图标
    onClose: () => close() 
  }) 
  return close 
} 
 
// 创建基础的showAlertAsync函数
function baseShowAlertAsync(contentOrOptions: string | AlertOptions, iconType: string = 'info'): Promise<boolean> {
  const options = typeof contentOrOptions === 'string' ? { content: contentOrOptions } : contentOrOptions 
 
  return new Promise((resolve) => { 
    const close = mountAlert({ 
      ...options, 
      showCancel: options.showCancel ?? true, 
      confirmText: options.confirmText ?? '确定', 
      cancelText: options.cancelText ?? '取消', 
      icon: options.icon ?? iconType,      // 使用传入的图标类型
      showIcon: options.showIcon ?? true,  // 默认显示图标
      onClose: () => { 
        close() 
        resolve(false) 
      }, 
      onCancel: () => { 
        close() 
        resolve(false) 
      }, 
      onConfirm: () => { 
        close() 
        resolve(true) 
      } 
    }) 
  }) 
}

// 创建支持链式调用的AlertAsync类型
type AlertAsyncFunction = {
  (contentOrOptions: string | AlertOptions): Promise<boolean>;
  info: (contentOrOptions: string | AlertOptions) => Promise<boolean>;
  success: (contentOrOptions: string | AlertOptions) => Promise<boolean>;
  warning: (contentOrOptions: string | AlertOptions) => Promise<boolean>;
  error: (contentOrOptions: string | AlertOptions) => Promise<boolean>;
}

// 创建并导出showAlertAsync对象（保留向后兼容性）
export const showAlertAsync: AlertAsyncFunction = Object.assign(
  (contentOrOptions: string | AlertOptions) => baseShowAlertAsync(contentOrOptions, 'info'),
  {
    info: (contentOrOptions: string | AlertOptions) => baseShowAlertAsync(contentOrOptions, 'info'),
    success: (contentOrOptions: string | AlertOptions) => baseShowAlertAsync(contentOrOptions, 'success'),
    warning: (contentOrOptions: string | AlertOptions) => baseShowAlertAsync(contentOrOptions, 'warning'),
    error: (contentOrOptions: string | AlertOptions) => baseShowAlertAsync(contentOrOptions, 'error')
  }
)

// 创建并导出Alert对象（与Alert组件同名，提供更简洁的API）
export const Alert: AlertAsyncFunction = Object.assign(
  (contentOrOptions: string | AlertOptions) => baseShowAlertAsync(contentOrOptions, 'info'),
  {
    info: (contentOrOptions: string | AlertOptions) => baseShowAlertAsync(contentOrOptions, 'info'),
    success: (contentOrOptions: string | AlertOptions) => baseShowAlertAsync(contentOrOptions, 'success'),
    warning: (contentOrOptions: string | AlertOptions) => baseShowAlertAsync(contentOrOptions, 'warning'),
    error: (contentOrOptions: string | AlertOptions) => baseShowAlertAsync(contentOrOptions, 'error')
  }
)
