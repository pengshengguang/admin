// 1、导入所有的svg图标
// 2、完成SvgIcon的全局注册

import SvgIcon from '@/components/SvgIcon'

// https://webpack.docschina.org/guides/dependency-management/#requirecontext
// 通过 require.context() 函数来创建自己的 context
const svgRequire = require.context('./svg', false, /\.svg$/)
// 此时返回一个 require 的函数，可以接受一个 request 的参数，用于 require 的导入。
// 该函数提供了三个属性，可以通过 require.keys() 获取到所有的 svg 图标
// 遍历图标，把图标作为 request 传入到 require 导入函数中，完成本地 svg 图标的导入
svgRequire.keys().forEach(svgIcon => svgRequire(svgIcon))

export default app => {
  app.component('svg-icon', SvgIcon)
}
// 为什么要导出一个函数，这是因为vue2要全局注册一个组件，只需要Vue.compoent('svg-icon', {})，但是vue3没有Vue对象，因此要上述方法
// elementui就是用这个方法来导入的
