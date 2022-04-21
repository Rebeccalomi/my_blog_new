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
          <h1>关于我</h1>
          <el-divider></el-divider>
          <markdown-it-vue-light
            class="js-toc-content markdown"
            :content="content"
            v-viewer
          />
          <div class="prize">
          <p>It's Life,我们终究是世界的星星微尘，但却也可以是你的世界最闪亮的星</p>
            
            <img :src="prize"></img>
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
import MarkdownItVueLight from "markdown-it-vue/dist/markdown-it-vue-light.umd.min.js";
import "markdown-it-vue/dist/markdown-it-vue-light.css";
import Time from "../../components/Aside/Time.vue";
import CardArticle from "../../components/Aside/CardArticle.vue";
import Banner from "../../components/Aside/Banner.vue";
import { getAllCategorysDetail } from "@/api/category";
import { getOption } from "@/api/msgfriend";
export default {
  name: "blogMe",
  components: {
    Time,
    Banner,
    "card-article": CardArticle,
    "markdown-it-vue-light": MarkdownItVueLight,
  },
  computed: {},
  data() {
    return {
      visible: false,
      content:'',
      prize:''
    };
  },
  mounted() {
    this.handleScroll()
  },
  created() {
    this.getOptiondetail()
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
      };
    },
    totop() {
      this.$refs.myScrollbar.wrap.scrollTop = 0;
    },
    getOptiondetail(){
      let that = this;
      getOption().then(data => {
          that.content = data.data.aboutMe;
          that.prize=data.data.prize;
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "关于我加载失败",
              showClose: true
            });
          }
        });
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
  margin-left: 2%;
  width: 97%;
  border-radius: 30px;
  padding-bottom: 30px;
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
#feiji {
  position: absolute;
  left: calc(100% - 280px);
  top: 80%;
  text-align: center;
  background: none !important;
  border: none !important;
}
.markdown {
  width: 95%;
  margin-left: 2%;
}
.prize{
  background:#BEB6C4;
  padding:10px 0px 20px 0px;
  margin-top:20px;
  width:40%;
  margin-left: 30%;
  border:#542673 solid 2px;
  border-radius:10px;
}
.prize p{
    text-align:center;
}
.prize img{
  width:250px;
  margin-left:calc(50% - 125px);
}
</style>
