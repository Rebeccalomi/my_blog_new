<!--
 * @Author: your name
 * @Date: 2022-04-15 17:53:31
 * @LastEditTime: 2022-04-19 00:11:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /my_blog_new/src/views/Friend.vue
-->
<template>
  <el-scrollbar style="height: 100vh" ref="myScrollbar">
    <el-container>
      <el-main>
        <div class="friend">
          <h1>我的分类</h1>
          <el-divider></el-divider>
          <div class="card-item">
            <div
              class="card"
              v-for="c in categorys"
              @click="view(c.id)"
              :key="c.id"
            >
              <a @click="view(c.id)">
                <div class="card-image">
                  <img :src="c.avatar" alt="Orange" />
                </div>
                <div class="card-body">
                  <div class="card-date">
                    <time> {{ c.count }} 篇文章 </time>
                  </div>
                  <div class="card-title">
                    <h3>
                      {{ c.categoryName }}
                    </h3>
                  </div>
                  <div class="card-exceprt">
                    <p>
                      {{ c.description }}
                    </p>
                  </div>
                </div>
              </a>
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
import { getAllCategorysDetail } from "@/api/category";
export default {
  name: "blogCategorys",
  components: {
    Time,
    Banner,
    "card-article": CardArticle
  },
  computed: {},
  data() {
    return {
      categorys: [],
      currentActiveName: "category",
      visible: false
    };
  },
  mounted() {
    this.handleScroll()
  },
  created() {
    this.getCategorys();
  },
  methods: {
    view(id) {
      this.$router.push({ path: `/${this.currentActiveName}/${id}` });
    },
    getCategorys() {
      let that = this;
      getAllCategorysDetail()
        .then(data => {
          that.categorys = data.data;
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
  padding-bottom: 20px;
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
.card-item {
  min-height: 220px;
  width: 100%;
  text-align: left;
}
.card {
  display: inline-block;
  text-align: left;
  margin: 20px 0px 10px 35px;
  border-radius: 10px;
  width: 150px;
  background-color: white;
  box-shadow: 0px 5px 20px #999;
}
.card a {
  color: #333;
  text-decoration: none;
}
.card:hover .card-image img {
  width: 160%;
  filter: grayscale(0);
}
.card-image {
  border-radius: 10px 10px 0px 0px;
  height: 145px;
  position: relative;
  overflow: hidden;
}
.card-image img {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: grayscale(0.2);
  transition-property: filter width;
  transition-duration: 0.3s;
  transition-timing-function: ease;
}
.card-body {
  text-align: center;
  padding: 15px 20px;
  box-sizing: border-box;
}
.card-date {
  font-family: "Source Sans Pro", sans-serif, "微软雅黑" !important;
}
.card-title,
.card-excerpt {
  font-family: serif, "微软雅黑" !important;
}
.card-date,
.card-title {
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
}
.card-date,
.card-excerpt {
  color: #777;
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
