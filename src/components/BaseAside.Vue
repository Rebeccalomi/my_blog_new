<template>
  <div class="tac">
    <div class="aboutme">
      <div class="block">
        <el-avatar :size="100" :src="me.avatar"></el-avatar>
      </div>
      <p class="title">rebecca_world</p>
      <p class="title1">写下我的诗</p>
      <el-divider></el-divider>
      <div class="mycount">
        阅览数：{{ me.viewCounts
        }}<el-divider direction="vertical"></el-divider>评论数：{{
          me.commentCounts
        }}
      </div>
      <el-divider></el-divider>
    </div>
    <div
      class="ui vertical menu"
      :default-active="activeIndex"
      v-for="(value, index) in this.navList"
      :key="index"
    >
      <a
        class="active teal item"
        @click="handleSelect(index)"
        @mouseenter="mouseover(index)"
        @mouseleave="mouseleave(index)"
      >
        <i
          :class="[value.icon]"
          v-if="!value.title"
          style="font-size: 40px"
        ></i>
        <span class="spantitle">{{ value.title }}</span>
      </a>
    </div>

    <el-divider></el-divider>
  </div>
</template>

<script>
import { getMe } from "@/api/article";
export default {
  name: "BaseAside",
  props: {
    activeIndex: String,
    simple: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      me: {
        avatar: "",
        viewCounts: "",
        commentCounts: "",
      },
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      navList: [
        {
          url: "/",
          title: "",
          icon: "iconfont ali-icon-dansetubiao-19",
        },
        {
          url: "/categorys",
          title: "",
          icon: "iconfont ali-icon-dansetubiao-16",
        },
        {
          url: "/tags",
          title: "",
          icon: "iconfont ali-icon-dansetubiao-5",
        },
        {
          url: "/archive",
          title: "",
          icon: "iconfont ali-icon-dansetubiao-15",
        },
        {
          url: "/friend",
          title: "",
          icon: "iconfont ali-icon-dansetubiao-11",
        },
        {
          url: "/messageBoard",
          title: "",
          icon: "iconfont ali-icon-dansetubiao-2",
        },
        {
          url: "/aboutme",
          title: "",
          icon: "iconfont ali-icon-dansetubiao-8",
        }
      ],
    };
  },
  created: function () {
    this.getme();
  },
  methods: {
    toMe(){
      this.$router.push({ path: '/aboutme' });
    },
    getme() {
      getMe().then((res) => {
        if (res.success) {
          this.me.avatar = res.data.avatar;
          this.me.viewCounts = res.data.viewCounts;
          this.me.commentCounts = res.data.commentCounts;
        }
      });
    },
    mouseover(index) {
      switch (index) {
        case 0:
          this.navList[index].title = "首页";
          break;
        case 1:
          this.navList[index].title = "分类";
          break;
        case 2:
          this.navList[index].title = "标签";
          break;
        case 3:
          this.navList[index].title = "归档";
          break;
        case 4:
          this.navList[index].title = "友链";
          break;
        case 5:
          this.navList[index].title = "留言板";
          break;
        case 6:
          this.navList[index].title = "关于我";
          break;
      }
    },
    mouseleave(index) {
      this.navList[index].title = "";
    },
    handleSelect(item) {
      this.$router.push({ path: this.navList[item].url });
    },
  },
  mounted() {},
};
</script>

<style scoped>
.spantitle {
  color: #ebe8ed !important;
  font-family: "ZCOOLKuaiLe-Regular";
  font-weight: 100;
}
.title {
  font-family: "BeauRivage-Regular";
  font-weight: 500;
  font-size: 40px;
  line-height: 1;
  letter-spacing: 2px;
  text-align: center;
  color: #ebe8ed;
  padding-bottom: -30px;
}
.title1 {
  font-family:'Raleway','XinHuaKaiTi-1';
  font-weight: 100;
  line-height: 0.5;
  font-size: 15px;
  letter-spacing: 2px;
  text-align: center;
  color: #ebe8ed;
  margin-top: -20px;
}
.tac {
  width: 280px;
  height: 95vh;
  border: none;
  margin-top: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 30px;
  background: url("https://img.rebecana.top/3.jpg");
  background-size: 100% 100%;
}
.block {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
}
.mycount {
  text-align: center;
  color: #ebe8ed;
  font-family: "ZCOOLKuaiLe-Regular";
}
.el-divider {
  margin-bottom: 10px;
  margin-top: 5px;
  background-color: rgb(222, 198, 227, 0.3);
}
.el-divider.el-divider--vertical {
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px 0px;
}
.ui.vertical.menu {
  text-align: center;
  margin: 0px;
  border: none;
  border-radius: 0px;
  width: 100%;
  background-color: rgb(235, 232, 237, 0) !important;
}
.active.teal.item {
  font-size: 30px;
  line-height: 1;
  padding: 7px 0px;
  background-color: rgb(235, 232, 237, 0.3) !important;
}
.active.teal.item:hover {
  background: none !important;
}
.ui.vertical.menu:hover {
  background: none !important;
}
</style>
