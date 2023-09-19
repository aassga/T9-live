import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { locale as cn } from '@/common/config/i18n/cn'
import { locale as tw } from '@/common/config/i18n/tw'
import { locale as en } from '@/common/config/i18n/en'
import { locale as jp } from '@/common/config/i18n/jp'
import { locale as th } from '@/common/config/i18n/th'
Vue.use(VueI18n)
let messages = {}
messages = { ...messages, cn, tw, en, jp, th }
const lang = localStorage.getItem('language')
const i18n = new VueI18n({
  locale: lang,
  messages,
})
export default i18n