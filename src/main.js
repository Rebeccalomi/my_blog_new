/*
 * @Author: your name
 * @Date: 2022-04-14 12:57:54
 * @LastEditTime: 2022-04-19 23:27:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /my_blog_new/src/main.js
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import lodash from 'lodash'
import router from './router'
import store from './store'

//自定义css
import './assets/css/base.css'

import 'animate.css';

//element
import ElementUI from 'element-ui'
import './assets/theme/index.css'
Vue.use(ElementUI);

// semantic-ui
import 'semantic-ui-css/semantic.min.css'
//阿里云
import './assets/ali-icon/iconfont.css'
import './assets/font/font.css'
//雪花特效
import LetItSnow from 'vue-let-it-snow';
Vue.use(LetItSnow);
//鼠标特效
import Mouse from "@/components/gotop/Mouse";
//弹幕
import { vueBaberrage } from "vue-baberrage";
Vue.use(vueBaberrage);
//v-viewer
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
Vue.use(Viewer);

import {formatTime,formatdate} from "./utils/time";
Object.defineProperty(Vue.prototype, '$_', { value: lodash })
// 全局组件挂载
Vue.component('mouse', Mouse)
Vue.config.productionTip = false



Vue.filter('format', formatTime);
Vue.filter('formatdate', formatdate);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})