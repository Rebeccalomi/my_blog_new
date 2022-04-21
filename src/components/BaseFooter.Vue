<template>

  <el-footer class="me-area">

    <div class="foot">
        <a :href="'https://github.com/Rebeccalomi'" target="_blank" class="iconfont ali-icon-github"></a>
        <a :href="'https://space.bilibili.com/2092151'" target="_blank" class="iconfont ali-icon-Bzhan"></a>
        <el-popover
          placement="top-start"
          width="180"
          trigger="hover">
          <img src="https://s2.loli.net/2022/04/15/Ge2yqg5bzWRKOFn.png" class="iconimg"/>
          <el-button slot="reference" class="iconfont ali-icon-QQ" id="icon"></el-button>
        </el-popover>
        <el-popover
          placement="top-start"
          width="180"
          trigger="hover">
          <img src="https://s2.loli.net/2022/04/15/6bin2ErZIB5QSdu.png" class="iconimg"/>
          <el-button slot="reference" class="iconfont ali-icon-weixin" id="icon"></el-button>
        </el-popover>
        <el-divider direction="vertical"></el-divider>
        皖ICP备20004510号 <el-divider direction="vertical"></el-divider> Design By Rebecca <el-divider direction="vertical"></el-divider> 
    </div>  
    <el-divider content-position="center">To a better way.</el-divider>
    <div class="github-badge">
      <a href="./" title="©2022&nbsp;Rebecca">
        <span class="badge-subject">Power</span
        ><span class="badge-value bg-blue">SpringBoot</span>
      </a>
    </div>
    &nbsp;|&nbsp;
    <div class="github-badge">
      <a
        href="https://cn.vuejs.org/"
        target="_blank"
        title="SPA"
        style="
          cursor: url('/usr/plugins/HoerMouse/static/image/dew/link.cur'),
          pointer;
        "
      >
        <span class="badge-subject">SPA</span
        ><span class="badge-value bg-green">Vue.js</span>
      </a>
    </div>
    &nbsp;|&nbsp;
    <div class="github-badge">
      <a
        href="https://semantic-ui.com/"
        target="_blank"
        title="UI Semantic-UI"
        style="
          cursor: url('/usr/plugins/HoerMouse/static/image/dew/link.cur'),
            pointer;
        "
      >
        <span class="badge-subject">UI</span
        ><span class="badge-value bg-red">Semantic-Ui</span>
      </a>
    </div>
    &nbsp;|&nbsp;
    <div class="github-badge">
      <a
        href="https://element.eleme.cn/#/zh-CN"
        target="_blank"
        title="UI ELEMENT-UI"
        style="
          cursor: url('/usr/plugins/HoerMouse/static/image/dew/link.cur'),
            pointer;
        "
      >
        <span class="badge-subject">UI</span
        ><span class="badge-value bg-purple">Element-Ui</span>
      </a>
    </div>
    &nbsp;|&nbsp;
    <div class="github-badge">
      <a
        href="https://cloud.tencent.com/"
        target="_blank"
        title="站点使用Tencent Cloud"
        style="
          cursor: url('/usr/plugins/HoerMouse/static/image/dew/link.cur'),
            pointer;
        "
      >
        <span class="badge-subject">CDN</span
        ><span class="badge-value bg-orange">Tencent Cloud</span>
      </a>
    </div>
    &nbsp;|&nbsp;
    <div class="github-badge">
      <a
        href="https://creativecommons.org/licenses/by/4.0/"
        target="_blank"
        title="This work © 2 by rebecca is licensed under CC BY 4.0"
        style="
          cursor: url('/usr/plugins/HoerMouse/static/image/dew/link.cur'),
            pointer;
        "
      >
        <span class="badge-subject">CC</span
        ><span class="badge-value bg-grey">4.0</span>
      </a>
    </div>
  </el-footer>
</template>

<script>

export default {
  name: "BaseFooter",
  data() {
    return {
    };
  },
  methods: {
  },
  mounted() {},
};
</script>

<style>
.el-popover{
  background:#495057;
  border:none;
}
.popper__arrow{
  border-top-color: #495057 !important;
}
.popper__arrow::after{
  border-top-color: #495057 !important;
}

#icon{
  background:none;
  border:none;
  padding: 0px;
}
.iconimg{
  width:150px;
  height:150px;
}
.el-divider{
  background-color: rgb(222, 198, 227,0.8);
  margin: 1px;
}
.el-divider__text{
  color:#fff !important;
  font-family: "BeauRivage-Regular";
  font-size: 30px !important;
  font-weight: 100;
  letter-spacing: 2px;
  background-color: #495057 !important;
  display: inline;
  line-height: 20px;
  padding: 0px;
}
.el-footer {
  background: #495057 !important;
  border-radius: 20px 20px 0px 0px;
  min-width: 100%;
  box-shadow: 0 -2px 3px hsla(0, 0%, 7%, 0.1), 0 0 0 1px hsla(0, 0%, 7%, 0.1);
  position: absolute;
  bottom: 0;
  left: 0%;
  z-index: 1024;
}
/*底部页脚*/
.github-badge {
  display: inline-block;
  border-radius: 4px;
  text-shadow: none;
  text-decoration: none;
  font-size: 12px;
  color: #fff;
  line-height: 15px;
  background-color: #abbac3;
  margin-bottom: 5px;
}

.github-badge .badge-subject {
  display: inline-block;
  background-color: #4d4d4d;
  padding: 4px 4px 4px 6px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.github-badge .badge-value {
  display: inline-block;
  padding: 4px 6px 4px 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.github-badge .bg-blue {
  background-color: #007ec6;
}

.github-badge .bg-orange {
  background-color: #ffa500;
}

.github-badge .bg-red {
  background-color: #f00;
}

.github-badge .bg-green {
  background-color: #3bca6e;
}

.github-badge .bg-purple {
  background-color: #ab34e9;
}

.github-badge .bg-grey {
  background-color: #B8B8B8;
}
.github-badge a {
  color: #fff;
}
.foot{
  color: #fff;
  font-size: 10px;
}
</style>