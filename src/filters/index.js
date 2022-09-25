import dayjs from 'dayjs'

const dateFilter = (val, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }

  return dayjs(val).format(format)
}

// 如果全局属性与组件自己的属性冲突，组件自己的属性将具有更高的优先级。
export default app => {
  app.config.globalProperties.$filters = {
    dateFilter
  }
}
