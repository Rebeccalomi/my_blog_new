<template>
  <!--随机文章-->
  <div class="ui segments m-box">
    <div class="ui secondary segment">
      <i class="bookmark icon"></i>最新文章
    </div>
    <div class="ui purple segment">
      <div class="ui divided items">
        <div
          class="m-item"
          v-for="blog in articles"
          :key="blog.id"
          @click.prevent="view(blog.id)"
        >
          <div
            class="img"
            :style="{ 'background-image': 'url(' + blog.titleImg + ')' }"
          ></div>
          <div class="info">
            <div class="date">{{ blog.createDate | formatdate }}</div>
            <div class="title">{{ blog.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewArtices } from "@/api/article";
export default {
  name: "CardArticle",
  props: {
    itemStyle: Object
  },
  data() {
    return {
      cardHeader: "最新文章",
      articles: []
    };
  },
  created() {
    this.getNewArtices();
  },
  methods: {
    view(id) {
      this.$router.push({ path: `/view/${id}` });
    },
    getNewArtices() {
      let that = this;
      getNewArtices()
        .then(data => {
          that.articles = data.data;
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "最新文章加载失败!",
              showClose: true
            });
          }
        });
    }
  }
};
</script>

<style scoped>
.secondary.segment {
  background: #BEB6C4  !important;
  font-size: 15px;
}

.ui.segments.m-box {
  margin-top: 10px;
  margin-left: 10px;
  width: 280px;
  border-radius:10px;
}

.ui.purple.segment {
  background: #ebe8ed !important;
}
.ui.divided.items .m-item:first-child {
  margin-top: 0;
}

.ui.divided.items .m-item {
  margin-top: 1rem;
  height: 7rem;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
}

.ui.divided.items .m-item .img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  object-fit: cover;
  background-position-x: center;
  background-position-y: center;
  background-size: cover;
}

.ui.divided.items .m-item .info {
  z-index: 1;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.5rem !important;
  font-size: 14px;
  font-weight: 100;
  color: white;
}

.ui.divided.items .m-item .info .title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  word-break: break-word;
}
</style>
<style>
.el-card__header {
  padding: 10px 20px !important;
}
</style>
