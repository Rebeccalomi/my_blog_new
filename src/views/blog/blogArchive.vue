<!--
 * @Author: your name
 * @Date: 2022-04-15 17:53:31
 * @LastEditTime: 2022-04-17 02:46:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /my_blog_new/src/views/Friend.vue
-->
<template>
  <el-scrollbar style="height: 100vh" ref="myScrollbar">
    <el-container>
      <el-main>
        <div class="friend">
          <h1>我的归档</h1>
          <el-divider></el-divider>
          <h2>To be better Me.我已经发表{{ count }}篇blog</h2>
          <div class="timeline">
            <div
              :class="colorObj[index % 5]"
              v-for="(value, key, index) in blogMap"
              :key="index"
            >
              <div class="tl-header">
                <a class="ui large label m-text-500">{{ key }}</a>
              </div>
              <div class="tl-item" v-for="blog in value" :key="blog.id">
                <div class="tl-wrap">
                  <span class="tl-date">{{ blog.day }}日</span>
                  <a  @click="view(blog.id)">
                    <div class="ui left pointing label tl-title">
                      {{ blog.title }}
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div class="tl-header">
              <a class="ui black large label m-text-500" id="header"
                >Hello World!</a
              >
            </div>
          </div>
        </div>
        <banner></banner>
      </el-main>
      <el-aside>
        <Time> </Time>
        <card-article></card-article>
      </el-aside>
    </el-container>
    <el-button
      type="primary"
      v-show="visible"
      class="iconfont ali-icon-feiji"
      id="feiji"
      @click="totop"
    ></el-button>
  </el-scrollbar>
</template>

<script>
import Time from "../../components/Aside/Time.vue";
import CardArticle from "../../components/Aside/CardArticle.vue";
import Banner from "../../components/Aside/Banner.vue";
import { listArchives } from "@/api/article";

export default {
  name: "blogArchive",
  components: {
    Time,
    Banner,
    "card-article": CardArticle
  },
  computed: {},
  data() {
    return {
      blogMap: {},
      count: 0,
      colorObj: {
        0: "tl-blue",
        1: "tl-dark",
        2: "tl-green",
        3: "tl-purple",
        4: "tl-red"
      },
      visible: false
    };
  },
  mounted() {
    this.handleScroll()
  },
  created() {
    this.getArchives();
  },
  methods: {
    getArchives() {
      listArchives().then(res => {
        if (res.success) {
          this.blogMap = res.data.blogMap;
          this.count = res.data.count;
        }
      });
    },
    view(id) {
      this.$router.push({ path: `/view/${id}` });
    },
    randomRGB() {
      const index = Math.floor(Math.random() * this.bgColor.length);
      return { backgroundColor: this.bgColor[index] };
    },
    handleScroll() {
      let _self = this;
      let scrollbarEl = this.$refs.myScrollbar.wrap;
      scrollbarEl.onscroll = function() {
        if (scrollbarEl.scrollTop > 200) {
          _self.visible = true;
        } else {
          _self.visible = false;
        }
      };
    },
    totop() {
      this.$refs.myScrollbar.wrap.scrollTop = 0;
    }
  }
};
</script>

<style scoped>
/*全局滚动条样式*/
.el-container {
  margin: 0px;
}
::-webkit-scrollbar-thumb {
  background-color: azure;
}
.el-scrollbar {
  background: none !important;
}
.el-aside {
  width: 280px;
}
.friend {
  background: #ebe8ed;
  margin-left:2%;
  width: 97%;  
  border-radius: 30px;
}

h1 {
  padding-top: 10px;
  font-family: "ZCOOLKuaiLe-Regular" !important;
  text-align: center;
  width: 100%;
  background-image: -webkit-linear-gradient(
    left,
    #00ccff,
    #00ffcc 10%,
    #ffff00 20%,
    #ffafcc 30%,
    #b388eb 40%,
    #00ccff 50%,
    #00ffcc 60%,
    #ffff00 70%,
    #ffafcc 80%,
    #b388eb 90%,
    #00ccff 100%
  );
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-background-size: 200% 100%;
  -webkit-animation: masked-animation 2s linear infinite;
  font-size: 40px;
}
h2 {
  font-family: "Helvetica Neue", Helvetica, "XinHuaKaiTi-1";
  text-align: center;
  margin-top: 5px;
  font-size: 15px;
  font-weight: 50;
  color: #000;
}

@keyframes masked-animation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}
.timeline {
  width: 95%;
  margin: 20px 0;
  padding-bottom: 20px;
}
#header {
  color: #ebe8ed !important;
}
.tl-header {
  font-family: "Raleway", "XinHuaKaiTi-1";
  width: 12em;
  text-align: center;
}

.tl-date {
  position: relative;
  top: 10px;
  display: block;
  float: left;
  width: 4.5em;
  margin-left: -7.5em;
  text-align: right;
  color: #000 !important;
}

.tl-wrap {
  padding: 15px 0 15px 20px;
  margin-left: 6em;
  border-style: solid;
  border-width: 0 0 0 4px;
}

.tl-wrap:before {
  position: relative;
  top: 15px;
  float: left;
  width: 10px;
  height: 10px;
  margin-left: -27px;
  background: #fff;
  border-color: inherit;
  border-style: solid;
  border-width: 3px;
  border-radius: 50%;
  content: "";
  box-shadow: 0 0 0 4px #fff;
}

.tl-wrap:hover:before {
  background: 0 0;
  border-color: #fff;
}

.tl-title {
  margin-left: 0 !important;
  letter-spacing: 0.3px !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  padding: 12px 15px !important;
}

.tl-blue .tl-header a,
.tl-blue .tl-item .tl-title {
  background: #e0c3fc !important;
  color: #fff !important;
}

.tl-blue .tl-item .tl-wrap {
  border-color: #e0c3fc;
}

.tl-dark .tl-header a,
.tl-dark .tl-item .tl-title {
  background: #cbb2fe !important;
  color: #fff !important;
}

.tl-dark .tl-item .tl-wrap {
  border-color: #cbb2fe;
}

.tl-green .tl-header a,
.tl-green .tl-item .tl-title {
  background: #ada7ff !important;
  color: #fff !important;
}

.tl-green .tl-item .tl-wrap {
  border-color: #ada7ff;
}

.tl-purple .tl-header a,
.tl-purple .tl-item .tl-title {
  background: #8e94f2 !important;
  color: #fff !important;
}

.tl-purple .tl-item .tl-wrap {
  border-color: #8e94f2;
}

.tl-red .tl-header a,
.tl-red .tl-item .tl-title {
  background: #757bc8 !important;
  color: #fff !important;
}

.tl-red .tl-item .tl-wrap {
  border-color: #757bc8;
}
#feiji {
  position: absolute;
  left: calc(100% - 280px);
  top: 80%;
  text-align: center;
  background: none !important;
  border: none !important;
}
</style>
