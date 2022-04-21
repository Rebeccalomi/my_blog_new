<!--
 * @Author: your name
 * @Date: 2022-04-15 17:53:31
 * @LastEditTime: 2022-04-20 00:45:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /my_blog_new/src/views/Friend.vue
-->
<template>
  <el-scrollbar style="height: 100vh" ref="myScrollbar">
    <el-container>
      <el-main>
        <div class="friend">
        <img class="me-title-picture" :src="article.titleimg" v-if="article.titleimg"></img>
        <el-divider></el-divider>
          <div class="title">
            <p class="titleitem">{{ article.title }}</p>
            <p class="titleinfo">
              阅读数：{{ article.viewCounts }} 评论数：{{
                article.commentCounts
              }}
              创建时间：{{ article.createDate  }} 最后更新时间：{{
                article.updateDate 
              }}
            </p>
            <div class="but">
              <button class="pulse" @click="thisShow()">专注模式</button>
              <button class="pulse" v-if="this.article.author.id == this.$store.state.id" @click="editArticle()" >编辑</button>
            </div>
            
          </div>
          <div class="markdown">
          <markdown-it-vue-light class="js-toc-content md-body" :content="article.editor.value"  v-viewer />
          </div>

					<div class="me-view-tag">
						标签：
						<!--<el-tag v-for="t in article.tags" :key="t.id" class="me-view-tag-item" size="mini" type="success">{{t.tagName}}</el-tag>-->
						<el-button @click="tagOrCategory('tag', t.id)" size="mini" type="primary"
							v-for="t in article.tags" :key="t.id" round plain>{{t.tagName}}</el-button>
					</div>

					<div class="me-view-tag">
						文章分类：
						<!--<span style="font-weight: 600">{{article.category.categoryName}}</span>-->
						<el-button @click="tagOrCategory('category', article.category.id)" size="mini" type="primary"
							round plain>{{article.category.categoryName}}</el-button>
					</div>
          <div class="ui attached positive message">
            <ul class="list">
              <li>作者：{{ article.author.nickname }}
                <router-link to="/aboutme">（联系作者）</router-link>
              </li>
              <li>发表时间：{{ article.createDate }}</li>
              <li>最后修改：{{ article.updateDate  }}</li>
              <li>本站点采用<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank"> 署名 4.0 国际 (CC BY 4.0) </a>创作共享协议。可自由转载、引用，并且允许商业性使用。但需署名作者且注明文章出处。</li>
            </ul>
          </div>
        </div>
        		<!--博客信息-->

          <div class="me-view-comment">
          <div class="me-view-comment-write">
                <el-row :gutter="20">
                  <el-col :span="2">
                    <a class="">
                      <img class="me-view-picture" :src="avatar" v-if="avatar"></img>
                      <img class="me-view-picture" src="http://img.rebecana.top/image-20220411160751809.png" v-if="!avatar"></img>
                    </a>
                  </el-col>
                  <el-col :span="22">
                    <el-input type="textarea" :autosize="{ minRows: 2}" placeholder="你的评论..."
                      class="me-view-comment-text" v-model="comment.content" resize="none">
                    </el-input>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="2" :offset="22">
                    <el-button size="mini" type="primary" class="me-button" @click="publishComment()">评论</el-button>
                  </el-col>
                </el-row>
              </div>
            <div class="me-view-comment-title">
            <br/>
							<span class="commentcount"> &nbsp; {{article.commentCounts}} 条评论</span>
						</div>
              <commment-item v-for="(c,index) in comments" :comment="c" :articleId="0" :index="index"
                :rootCommentCounts="comments.length" @commentCountsIncrement="commentCountsIncrement"
                :key="c.id">
              </commment-item>
            </div>
        <banner></banner>
      </el-main>
      <el-aside>
        <Time v-show="thisshow"></Time>
        <Tocbot />
        <card-article v-show="thisshow"></card-article>
      </el-aside>
    </el-container>
    <el-button
      type="primary"
      v-if="visible"
      class="iconfont ali-icon-feiji"
      id="feiji"
      @click="totop"
    ></el-button>
  </el-scrollbar>
</template>

<script>
import MarkdownItVueLight from "markdown-it-vue/dist/markdown-it-vue-light.umd.min.js";
import "markdown-it-vue/dist/markdown-it-vue-light.css";
import Banner from "../../components/Aside/Banner.vue";
import CommmentItem from "@/components/Comment/CommentItem";
import Time from "../../components/Aside/Time.vue";
import CardArticle from "../../components/Aside/CardArticle.vue";
import { viewArticle } from "@/api/article";
import { getCommentsByArticle, publishComment } from "@/api/comment";
import Tocbot from "@/components/Aside/Tocbot";
import MarkdownEditor from "@/components/markdown/MarkdownEditor";
import { SET_IS_BLOG_RENDER_COMPLETE } from "@/store/mutation-types";
export default {
  name: "blogView",
  created() {
    this.getArticle();
  },
  watch: {
    $route: "getArticle",
  },
  mounted() {
    this.ContentToFixed();
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.ContentToFixedWrapper, false);
  },
  beforeRouteEnter(to, from, next) {
    //路由到博客文章页面之前，应将文章的渲染完成状态置为 false
    next((vm) => {
      // 当 beforeRouteEnter 钩子执行前，组件实例尚未创建
      // vm 就是当前组件的实例，可以在 next 方法中把 vm 当做 this用
      vm.$store.commit(SET_IS_BLOG_RENDER_COMPLETE, false);
    });
  },
  beforeRouteLeave(to, from, next) {
    // 从文章页面路由到其它页面时，销毁当前组件的同时，要销毁tocbot实例
    // 否则tocbot一直在监听页面滚动事件，而文章页面的锚点已经不存在了，会报"Uncaught TypeError: Cannot read property 'className' of null"
    tocbot.destroy();
    next();
  },
  beforeRouteUpdate(to, from, next) {
    // 一般有两种情况会触发这个钩子
    // ①当前文章页面跳转到其它文章页面
    // ②点击目录跳转锚点时，路由hash值会改变，导致当前页面会重新加载，这种情况是不希望出现的
    // 在路由 beforeRouteUpdate 中判断路径是否改变
    // 如果跳转到其它页面，to.path!==from.path 就放行 next()
    // 如果是跳转锚点，path不会改变，hash会改变，to.path===from.path, to.hash!==from.path 不放行路由跳转，就能让锚点正常跳转
    if (to.path !== from.path) {
      //只要路由路径有改变，且停留在当前Blog组件内，就把文章的渲染完成状态置为 false
      this.$store.commit(SET_IS_BLOG_RENDER_COMPLETE, false)
      next()
    }
  },
  components: {
    "markdown-it-vue-light": MarkdownItVueLight,
    CommmentItem,
    Tocbot,
    Time,
    Banner,
    "card-article": CardArticle,
    "markdown-editor": MarkdownEditor,
  },
  data() {
    return {
      visible: "false",
      article: {
        id: "",
        title: "",
        commentCounts: 0,
        viewCounts: 0,
        summary: "",
        author: {},
        tags: [],
        category: {},
        createDate: "",
        editor: {
          value: "",
          toolbarsFlag: false,
          subfield: false,
          defaultOpen: "preview",
        },
        titleimg: "",
      },
      comments: [],
      comment: {
        article: {},
        content: "",
      },
      default_avatar: "https://img.rebecana.top/image-20220411160751809.png",

      thisshow: "true",
    };
  },
  computed: {
    avatar() {
      let avatar = this.$store.state.avatar;
      if (avatar.length > 0) {
        return avatar;
      }
    },
  },
  methods: {
    thisShow() {
      this.thisshow = !this.thisshow;
    },
    editArticle() {
      this.$router.push({
        path: `/write/${this.article.id}`,
      });
    },
    getArticle() {
      let that = this;
      viewArticle(that.$route.params.id)
        .then((data) => {
          Object.assign(that.article, data.data);
          that.article.editor.value = data.data.body.content;
          that.article.titleimg = data.data.titleImg;
          that.getCommentsByArticle();
          this.$nextTick(() => {
            //将文章渲染完成状态置为 true
            this.$store.commit(SET_IS_BLOG_RENDER_COMPLETE, true);
          });
        })
        .catch((error) => {
          if (error !== "error") {
          }
        });
    },
    publishComment() {
      let that = this;
      if (!that.comment.content) {
        return;
      }
      that.comment.article.id = that.article.id;
      let parms = {
        articleId: that.article.id,
        content: that.comment.content,
      };
      publishComment(parms, this.$store.state.token)
        .then((data) => {
          if (data.success) {
            that.$message({
              type: "success",
              message: "评论成功",
              showClose: true,
            });
            that.comment.content = "";
            that.comments.unshift(data.data);
            that.commentCountsIncrement();
            that.getCommentsByArticle();
          } else {
            that.$message({
              type: "error",
              message: data.msg,
              showClose: true,
            });
          }
        })
        .catch((error) => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "评论失败",
              showClose: true,
            });
          }
        });
    },
    tagOrCategory(type, id) {
      this.$router.push({
        path: `/${type}/${id}`
      })
    },
    getCommentsByArticle() {
      let that = this;
      getCommentsByArticle(that.article.id)
        .then((data) => {
          if (data.success) {
            that.comments = data.data;
          } else {
            that.$message({
              type: "error",
              message: "评论加载失败",
              showClose: true,
            });
          }
        })
        .catch((error) => {
          if (error !== "error") {
            that.$message({
              type: "error",
              message: "评论加载失败",
              showClose: true,
            });
          }
        });
    },

    totop() {
      this.$refs.myScrollbar.wrap.scrollTop = 0;
    },
    commentCountsIncrement() {
      this.article.commentCounts += 1;
    },
    ContentToFixed() {
      let _self = this;
      let toolbar = document.querySelector(
        ".ui.segments.m-toc.toc-wrapper.m-box"
      );
      let scrollbarEl = this.$refs.myScrollbar.wrap;
      scrollbarEl.onscroll = function () {
        if (scrollbarEl.scrollTop > 900) {
          toolbar.classList.add("me-write-toolbar-fixed");
          _self.visible = true;
        } else {
          toolbar.classList.remove("me-write-toolbar-fixed");
          _self.visible = false;
        }
      };
    },
  },
};
</script>

<style scoped>
.me-title-picture {
		width: 100%;
    display:block;
		height: 100%;
		border-radius: 10px 10px 0px 0px;
}
.me-write-toolbar-fixed {
  position: fixed !important;
  width: 290px !important;
  top: 60px;
}
/*全局滚动条样式*/
.title {
  width: 100%;
  height: 200px;
}
.md-body {
  text-align: left;
}
.markdown {
  width: 95%;
  margin-left: 2%;
}
.titleitem {
  padding-top: 30px;
  text-align: center;
  font-size: 35px;
  font-weight: 800;
}
.titleinfo {
  font-size: 15px;
  text-align: center;
}
.but {
  display: inline-block;
  margin-left: calc(50% - 100px);
}
.pulse {
  color: #542673;
  font-family: "Helvetica Neue", Helvetica, "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  transition: 0.25s;
  background: #ebe8ed !important;
  border-radius: 5px;
  border: 2px solid;
  line-height: 1;
  padding: 0.5em 1em;
}
.pulse:hover,
.pulse:focus {
  border-color: #542673;
  color: #000;
  cursor: pointer;
  animation: pulse 1s;
  box-shadow: 0 0 0 2em transparent;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 #542673;
  }
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
  background: #ebe8ed;
  margin-left: 2%;
  width: 97%;
  border-radius: 30px;
}
.me-view-picture {
  margin: 10px 0px 0px 20%;
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 50%;
  vertical-align: middle;
}

.me-view-comment {
  margin-top: 60px;
}
.me-view-tag {
  margin-top: 10px;
  margin-left: 15px;
}
.me-view-tag:last-child {
  padding-bottom: 20px ;
}
.me-view-comment-title {
  font-weight: 600;
  margin-top: 15px;
  margin-left: 2%;
  width: 97%;
  background: #ebe8ed;
  border-bottom: 10px solid #f0f0f0;
  border-radius: 20px;
  padding-bottom: 20px;
}

.me-view-comment-write {
  background: #ebe8ed;
  margin-left: 2%;
  width: 97%;
  border-radius: 20px;
  margin-top: -30px;
  padding: 10px 0px;
}

.commentcount {
  font-size: 16px;
}

.me-view-comment-text {
  font-size: 16px;
  border-radius: 5px;
  width: 99%;
  margin-left: -1.5%;
  margin-top: 5px;
}
.me-button {
  color: #fff;
  margin: 10px 5px 2px -10px;
  border-radius: 10px;
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
