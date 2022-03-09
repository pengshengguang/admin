import i18n from '@/i18n'
import { watch } from 'vue'
import store from '@/store'

export function generateTitle(title) {
  return i18n.global.t('msg.route.' + title)
}

/**
 *
 * @param  {...any} cbs 所有的回调
 */
export function watchSwitchLang(...cbs) {
  watch(
    () => store.getters.language, // 厉害了！ watch的第一个参数 是返回值的getter函数，或者ref！！！！
    () => {
      console.log(store.getters)
      cbs.forEach(cb => cb(store.getters.language))
    }
  )
}
