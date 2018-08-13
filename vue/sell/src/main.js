import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';
import VueResource from 'vue-resource';
import 'common/stylus/index.styl';

Vue.use(VueRouter);
Vue.use(VueResource);
const routes = [
  {path: '/', redirect: 'goods'}, // 设置默认路由，重定向
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller }
];
const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  data: {
    eventHub: new Vue()
  }
});
