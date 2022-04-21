<template>
  <div style="overflow: hidden">
    <article-item v-for="a in articles" :key="a.id" v-bind="a"></article-item>
    <div
      style="height: 100px;margin-top: 10px;z-index: 1"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(245,245,245)"
    >
    </div>
  </div>
</template>

<script>
import ArticleItem from "@/components/article/ArticleItem";
import ScrollPage from "@/components/scrollpage";
import { getArticles } from "@/api/article";

export default {
  name: "ArticleScrollPage",
  mounted() {
  },
  props: {
    offset: {
      type: Number,
      default: 100
    },
    page: {
      type: Object,
      default() {
        return {};
      }
    },
    query: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  watch: {
    query: {
      handler() {
        this.noData = false;
        this.articles = [];
        this.innerPage.pageNumber = 1;
        this.getArticles();
      },
      deep: true
    },
    page: {
      handler() {
        this.noData = false;
        this.articles = [];
        this.innerPage = this.page;
        this.getArticles();
      },
      deep: true
    }
  },
  created() {
    this.getArticles();
  },
  data() {
    return {
      loading: false,
      noData: false,
      innerPage: {
        pageSize: 2,
        pageNumber: 1,
        name: "a.createDate",
        sort: "desc"
      },
      articles: []
    };
  },
  methods: {
    load() {
      if(!this.loading){
        this.getArticles();
      }
    },
    view(id) {
      this.$router.push({ path: `/view/${id}` });
    },
    getArticles() {
      let that = this;
      that.loading = true;
      getArticles(that.query, that.innerPage)
        .then(data => {
          let newArticles = data.data;
          if (newArticles && newArticles.length > 0) {
            that.innerPage.pageNumber += 1;
            console.log(that.innerPage.pageNumber);
            that.articles = that.articles.concat(newArticles);
          } else {
            that.noData = true;
          }
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "文章加载失败!",
              showClose: true
            });
          }
        })
        .finally(() => {
          that.loading = false;
        });
    }
  },
  components: {
    "article-item": ArticleItem,
    "scroll-page": ScrollPage
  }
};
</script>

<style scoped>
.el-card {
  border-radius: 0;
}

.el-card:not(:first-child) {
  margin-top: 10px;
}
</style>
