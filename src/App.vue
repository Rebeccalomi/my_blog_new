<!--
 * @Author: your name
 * @Date: 2022-04-14 12:57:54
 * @LastEditTime: 2022-04-17 02:12:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /my_blog_new/src/App.vue
-->
<template>
  <div id="app">
    <let-it-snow v-bind="snowConf" :show="show"> </let-it-snow>
    <mouse></mouse>
    <router-view />
    <GoTop></GoTop>
  </div>
</template>

<script>
import GoTop from "@/components/gotop/GoTop";
export default {
  name: "App",
  components: { GoTop },
  data() {
    return {
      snowConf: {
        windPower: 1,
        speed: 3,
        count: 20,
        size: 10,
        opacity: 1,
        images: [
          "https://img.rebecana.top/snow.png"
        ]
      },
      show: false
    };
  },
  mounted() {
    this.show=true;
  },
  method:{
  }
};
</script>
<style>
mouse{
  z-index: 1;
}
* {
  margin: 0;
  padding: 0;
}

body {
  height: 100%;
  font-weight: 400;
  font-family: "Helvetica Neue", Helvetica, "XinHuaKaiTi-1", "Hiragino Sans GB", "微软雅黑", Arial, sans-serif !important;
  line-height: 1.5;
}
body::-webkit-scrollbar {
  width: 0 !important;
}
body::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}

/*全局滚动条样式结束*/
a {
  cursor: pointer;
  text-decoration: none;
  transition: none 86ms ease-out;
}
a:hover {
  color: #ffffff;
}
.me-area {
  background-color: #fff;
}
html {
  height: 100%;
}
body {
  min-height: 100%;
}
body {
  position: relative;
}

.me-pull-right {
  float: right;
}
</style>
