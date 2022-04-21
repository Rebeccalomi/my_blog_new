<template>
  <div id="home">

    <el-container>
      <base-aside width="20%" :activeIndex="activeIndex"></base-aside>
      <el-container direction="vertical">
            <router-view class="my-container" />
        <div
          @mouseenter="enterHeader()"
          @mouseleave="leaveHeader()"
          class="display"
        >
          <el-collapse-transition>
            <base-header v-show="headerShow"></base-header>
          </el-collapse-transition>
        </div>
        <div
          @mouseenter="enterFooter()"
          @mouseleave="leaveFooter()"
          class="display"
          style="bottom:0px;"
        >
          <el-collapse-transition>
            <base-footer v-show="footerShow"></base-footer>
          </el-collapse-transition>
        </div>
      </el-container>
    </el-container>

  </div>

</template>
<script>
import BaseHeader from "@/components/BaseHeader";
import BaseFooter from "@/components/BaseFooter";
import BaseAside from "@/components/BaseAside";
export default {
  name: "Home",
  data() {
    return {
      mnuTimeout: "",
      activeIndex: "/",
      footerShow: false,
      headerShow: false,
      loginBg:
        "url(https://img.rebecana.top/wallhaven-pkxqpm.jpg)",

      //loginBg: 'url(https://img.rebecana.top/3fb775d1-91c6-4ce7-99de-cf218051ec35.jpg)',
    };
  },
  components: {
    "base-header": BaseHeader,
    "base-footer": BaseFooter,
    "base-aside": BaseAside
  },
  mounted() {
    // 添加背景图片
    document.body.style.backgroundSize = "100%";
    document.body.style.backgroundImage = this.loginBg;
    this.show=true;
  },
  methods: {
    enterFooter() {
      this.footerShow = true;
    },
    leaveFooter() {
      this.footerShow = false;
    },
    enterHeader() {
      this.headerShow = true;
    },
    leaveHeader() {
      this.headerShow = false;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.activeIndex = to.path;
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.activeIndex = to.path;
    next();
  }
};
</script>

<style scoped>
html,
body,
#home,
#app,
.el-container {
  height: 100%;
}

.display {
  position: absolute;
  left: 300px;
  width: calc(100% - 300px);
  background-color: rgba(103, 39, 135, 0);
  height: 100px;
}

.el-header,
.el-footer {
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  color: #333;
  text-align: center;
  line-height: 200px;
}

.my-container {
  color: #333;
  width: calc(100vw - 280px);
  height: 100%;
  top: 0%;
}
</style>
