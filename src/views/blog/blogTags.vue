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
          <h1>我的标签</h1>
          <el-divider></el-divider>
          <div class="card-item">
            <div class="card" v-for="c in tags" @click="view(c.id)" :key="c.id">
              <a @click="view(c.id)">
                <div class="card-image">
                  <img :src="c.avatar" alt="Orange" />
                </div>
                <div class="cardback" :style="randomRGB()">
                  <h2>
                    {{ c.tagName }}
                  </h2>
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
import { getAllTagsDetail } from "@/api/tag";
export default {
  name: "blogTags",
  components: {
    Time,
    Banner,
    "card-article": CardArticle
  },
  computed: {},
  data() {
    return {
      currentActiveName: "tag",
      tags: [],
      bgColor: [
        "#fea802",
        "#fe7434",
        "#ea515f",
        "#d94a8c",
        "#b4418e",
        "#6fb1a0",
        "#15a2a2",
        "#1184a7",
        "#046dc8",
        "#0450b4",
        "#00a74a",
        "#6f2dbd"
      ],
      visible: false
    };
  },
  mounted() {
    this.handleScroll()
  },
  created() {
    this.getTags();
  },
  methods: {
    getTags() {
      let that = this;
      getAllTagsDetail()
        .then(data => {
          that.tags = data.data;
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
    randomRGB() {
      const index = Math.floor(Math.random() * this.bgColor.length);
      return { backgroundColor: this.bgColor[index] };
    },
    view(id) {
      this.$router.push({ path: `/${this.currentActiveName}/${id}` });
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
  font-family: "Helvetica Neue", Helvetica, "ZCOOLKuaiLe-Regular";
  text-align: center;
  margin-top: 10px;
  padding-top: 5px;
  font-size: 15px;
  font-weight: 50;
  color: #fff;
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
.card-item {
  min-height: 50px;
  width: 100%;
  padding: 5px 20px 25px 50px;
  text-align: left;
}
.card {
  display: inline-block;
  text-align: left;
  margin: 20px 0px 10px 33px;
  border-radius: 10px;
  width: 200px;
  border-bottom: #fff solid 5px;
}
.card a {
  text-decoration: none;
}
.card-image {
  float: left;
  border-radius: 10px 10px 0px 10px;
  height: 50px;
  width: 50px;
  overflow: hidden;
}
.card-image img {
  width: 100%;
  height: 100%;
}
.card-body {
  width: 150px;
  float: left;
  text-align: center;
}
.cardback {
  margin-top: 24px;
  width: 100%;
  border-radius: 10px 10px 10px 10px;
  height: 30px;
}
.cardback:hover {
  background: rgb(119, 216, 207) !important;
}

</style>
