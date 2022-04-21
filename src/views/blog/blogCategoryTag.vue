<template>
  <el-scrollbar style="height: 100vh" ref="myScrollbar">
    <el-container>
      <el-main>
        <div class="friend">
          <div
            style="background: #ebe8ed;border-radius: 20px 20px 20px 20px;margin-bottom:20px;"
          >
            <template v-if="this.$route.params.type === 'tag'">
              <h1>标签：{{ ct.tagName }}</h1>
            </template>

            <template v-else>
              <h1>分类：{{ ct.categoryName }}</h1>
              <h2>描述： {{ ct.description }}</h2>
            </template>
          </div>
          <article-scroll-page
            v-bind="article"
            ref="list"
          ></article-scroll-page>
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
import ArticleScrollPage from "@/views/common/ArticleScrollPage";
import { getArticlesByCategory, getArticlesByTag } from "@/api/article";
import { getTagDetail } from "@/api/tag";
import { getCategoryDetail } from "@/api/category";

export default {
  name: "blogCategoryTag",
  created() {
    this.getCategoryOrTagAndArticles();
  },
  watch: {
    $route: "getCategoryOrTagAndArticles"
  },
  data() {
    return {
      ct: {},
      article: {
        query: {
          tagId: "",
          categoryId: ""
        }
      },
      visible: false
    };
  },
  computed: {
    title() {
      if (this.$route.params.type === "tag") {
        return `${this.ct.tagName} - rebecana_world - 标签`;
      }
      return `${this.ct.categoryName} - rebecana_world - 文章分类`;
    }
  },
  mounted() {
    this.handleScroll();
  },
  methods: {
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
          scrollbarEl.scrollTop >
          scrollbarEl.scrollHeight - window.screen.height
        ) {
          _self.$nextTick(() => {
            _self.$refs.list.load();
          });
        }
      };
    },
    totop() {
      this.$refs.myScrollbar.wrap.scrollTop = 0;
    },
    getCategoryOrTagAndArticles() {
      let id = this.$route.params.id;
      let type = this.$route.params.type;
      if ("tag" === type) {
        this.getTagDetail(id);
        this.article.query.tagId = id;
      } else {
        this.getCategoryDetail(id);
        this.article.query.categoryId = id;
      }
    },
    getCategoryDetail(id) {
      let that = this;
      getCategoryDetail(id)
        .then(data => {
          that.ct = data.data;
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "文章分类加载失败",
              showClose: true
            });
          }
        });
    },
    getTagDetail(id) {
      let that = this;
      getTagDetail(id)
        .then(data => {
          that.ct = data.data;
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "标签加载失败",
              showClose: true
            });
          }
        });
    },
    getArticlesByCategory(id) {
      let that = this;
      getArticlesByCategory(id)
        .then(data => {
          that.articles = data.data;
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "文章加载失败",
              showClose: true
            });
          }
        });
    },
    getArticlesByTag(id) {
      let that = this;
      getArticlesByTag(id)
        .then(data => {
          that.articles = data.data;
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "文章加载失败",
              showClose: true
            });
          }
        });
    }
  },
  components: {
    ArticleScrollPage,
    Time,
    Banner,
    "card-article": CardArticle
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
  margin-left: 2%;
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
  padding-bottom: 5px;
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
#feiji {
  position: absolute;
  left: calc(100% - 280px);
  top: 80%;
  text-align: center;
  background: none !important;
  border: none !important;
}
</style>
