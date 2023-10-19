import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import moment from 'moment'
import md5 from 'js-md5';
import 'element-ui/lib/theme-chalk/index.css'

// 样式重置
// import "reset-css";

//导入全局样式
import './styles.css'
import './jquery.dialogbox.css'

//輪播
import VueAwesomeSwiper from 'vue-awesome-swiper'
import "swiper/css/swiper.css";
Vue.use(VueAwesomeSwiper)

//i18n
import i18n from './common/plugins/vue-i18n'

// 引入根组件mixins 日期格式
import mixins from './mixins/root'

// 監聽使用時間
// import './utils/checkUseTime'


Vue.use(ElementUI);

Vue.prototype.$md5 = md5;
Vue.prototype.$moment = moment;
Vue.config.productionTip = false


new Vue({
  mixins: [mixins],
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
