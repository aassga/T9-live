import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import moment from 'moment'
import md5 from 'js-md5';
import 'element-ui/lib/theme-chalk/index.css'

// 样式重置
import "reset-css";

//导入全局样式
import './styles.scss'
import './styles.css'


// 引入根组件mixins 日期格式
import mixins from './mixins/root.js'
Vue.use(ElementUI);

Vue.prototype.$md5 = md5;
Vue.prototype.$moment = moment;
Vue.config.productionTip = false


new Vue({
  mixins: [mixins],
  router,
  store,
  render: h => h(App)
}).$mount('#app')
