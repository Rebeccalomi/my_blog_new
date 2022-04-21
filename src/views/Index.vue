<!--
 * @Author: your name
 * @Date: 2022-04-15 17:53:31
 * @LastEditTime: 2022-04-20 01:36:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /my_blog_new/src/views/Friend.vue
-->
<template>
  <el-scrollbar style="height: 100vh" ref="myScrollbar">
    <el-container>
      <el-main>
        <div class="friend">
          <el-carousel
            ref="carousel"
            @click.native="linkTo"
            style="height:40vh;overflow:hidden;margin-bottom:40px;"
          >
            <el-carousel-item
              v-for="item in hotArticles"
              :key="item.id"
              style="height:40vh;"
            >
              <img
                :src="item.titleImg"
                style="height:100%;width:100%;cursor: pointer;"
                alt="图片丢失了"
                :title="item.title"
              />
              <div class="zhezhao">
                <p>{{ item.title }}</p>
                <p style="font-size:15px;">{{ item.summary }}</p>
              </div>
            </el-carousel-item>
          </el-carousel>
          <article-scroll-page ref="list"></article-scroll-page>
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
import Time from "../components/Aside/Time.vue";
import CardArticle from "../components/Aside/CardArticle.vue";
import Banner from "../components/Aside/Banner.vue";
import { getArticles, getHotArtices, getNewArtices } from "@/api/article";
import { listArchives } from "@/api/article";
import ArticleScrollPage from "@/views/common/ArticleScrollPage";
export default {
  name: "Index",
  components: {
    Time,
    Banner,
    "card-article": CardArticle,
    ArticleScrollPage
  },
  computed: {},
  data() {
    return {
      visible: false,
      hotArticles: []
    };
  },
  mounted() {
    this.handleScroll();
  },
  created() {
    this.getHotArtices();
  },
  methods: {
    getHotArtices() {
      let that = this;
      getHotArtices()
        .then(data => {
          that.hotArticles = data.data;
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "最热文章加载失败!",
              showClose: true
            });
          }
        });
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
      if (
        scrollbarEl.scrollTop > (scrollbarEl.scrollHeight - window.screen.height)
      ){
        _self.$nextTick(() => {
          _self.$refs.list.load();
        });
      }
      };
    },
    linkTo() {
      let activeIndex = this.$refs.carousel.activeIndex;
      this.$router.push({ path: `/view/${this.hotArticles[activeIndex].id}` });
    },
    totop() {
      this.$refs.myScrollbar.wrap.scrollTop = 0;
    }
  }
};
</script>

<style scoped>
.zhezhao p {
  line-height: 1;
  color: #fff;
  text-align: left;
  font-size: 30px;
  padding-left: 1vw;
  margin: 0;
}

.zhezhao {
  width: 100%;
  height: 10vh;
  background-color: #000;
  position: absolute;
  bottom: 0vh;
  opacity: 0.5;
  /*z-index: 9999;*/
}
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
  margin-left: 2%;
  width: 97%;
  border-radius: 30px;
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
