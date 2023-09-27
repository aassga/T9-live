import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { locale as CN } from '@/common/config/i18n/cn'
import { locale as TW } from '@/common/config/i18n/tw'
import { locale as EN } from '@/common/config/i18n/en'
import { locale as JP } from '@/common/config/i18n/jp'
import { locale as TH } from '@/common/config/i18n/th'
Vue.use(VueI18n)
let messages = {}
messages = { ...messages, CN, TW, EN, JP, TH }
const lang = localStorage.getItem('language') || 'CN'
const i18n = new VueI18n({
  locale: lang,
  messages,
})
export default i18n