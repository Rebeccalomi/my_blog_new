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
      <el-main  style="overflow:hidden">
          <div class="friend">
            <h1>友链</h1>
            <el-divider></el-divider>
              <h2>如果想交换链接的话在下方提供</h2>
              <ul class="cul-list checkmark-heavy list-green" style="margin-left:10px">
                    <li>博客url</li>
                    <li>你的id昵称</li>
                    <li>你的头像</li>
                    <li>你的座右铭(好土的叫法)</li>
              </ul>
              <h2>期待与你相见！</h2>
            <div class="friends-segment">
              <a
                target="_blank"
                :href="item.url"
                class="card"
                :style="randomRGB()"
                v-for="(item, index) in friendList"
                :key="index"
              >
                <div class="image">
                  <img :src="item.avatar" />
                </div>
                <div class="content">
                  <div class="header">{{ item.nickname }}</div>
                  <div class="description">{{ item.title }}</div>
                </div>
              </a>
            </div>
          </div>
          <div class="me-view-comment">
          <div class="me-view-comment-write">
                <el-row :gutter="20">
                  <el-col :span="2">
                    <a class="">
                      <img class="me-view-picture" :src="avatar" v-if="avatar"></img>
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
              <commment-item v-for="(c,index) in comments" :comment="c" :articleId="0" :index="index"
                :rootCommentCounts="comments.length" @commentCountsIncrement="commentCountsIncrement"
                :key="c.id">
              </commment-item>
            </div>
            <banner></banner>
      </el-main>
      <el-aside>
        <Time> </Time>
        <card-article></card-article>
      </el-aside>
    </el-container>
      <el-button type="primary" v-show="visible" class="iconfont ali-icon-feiji" id="feiji"  @click="totop"></el-button>
  </el-scrollbar>

</template>

<script>
import { getCommentsByArticle, publishComment } from "@/api/comment";
import Time from "../components/Aside/Time.vue";
import CardArticle from "../components/Aside/CardArticle.vue";
import { getAllFriend } from "@/api/msgfriend";
import CommmentItem from "@/components/Comment/CommentItem";
import Banner from "../components/Aside/Banner.vue";
export default {
  name: "Friend",
  components: {
    Time,
    CommmentItem,
    Banner,
    'card-article': CardArticle,
  },
  computed: {
			avatar() {
				let avatar = this.$store.state.avatar
				if (avatar.length > 0) {
					return avatar
				}
				return "https://img.rebecana.top/image-20220411160751809.png"
			}
	},
  data() {
    return {
      friendList: [],
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
      comments: [],
      comment: {
        article: {},
        content: "",
      },
      visible: false
    };
  },
  mounted() {
    this.handleScroll()
  },
  created() {
    this.getFriendList();
    this.getCommentsByArticle();
  },
  methods: {
    getFriendList() {
      getAllFriend().then((res) => {
        if (res.success) {
          this.friendList = res.data;
        }
      });
    },
    getCommentsByArticle() {
      let that = this;
      getCommentsByArticle(0)
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
    publishComment() {
      let that = this;
      if (!that.comment.content) {
        return;
      }
      that.comment.article.id = 0;
      let parms = {
        articleId: 0,
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
    },
    commentCountsIncrement() {
      this.article.commentCounts += 1;
    },
    randomRGB() {
      const index = Math.floor(Math.random() * this.bgColor.length);
      return { backgroundColor: this.bgColor[index] };
    },
    handleScroll() {
          let _self = this
          let scrollbarEl = this.$refs.myScrollbar.wrap
          scrollbarEl.onscroll = function() {
            if(scrollbarEl.scrollTop > 200) {
              _self.visible = true
            } else {
              _self.visible = false
            }
          }
    },
    totop() {
      this.$refs.myScrollbar.wrap.scrollTop = 0
    }
  },
};
</script>

<style scoped>
/*全局滚动条样式*/
.el-container{
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
  background: #EBE8ED;
  margin-left:2%;
  width: 97%;  
  border-radius: 30px;
}
h1 {
  padding-top: 20px;
  font-size: 40px !important;
  font-family: "ZCOOLKuaiLe-Regular" !important;
  margin-left: 30px !important;
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
}
@keyframes masked-animation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}
h2 {
  font-family:"Helvetica Neue",'XinHuaKaiTi-1';
  margin: 20px 0px 10px 20px;
}
h3 {
  font-size: 20px;
}

/* Global List Classes */
.cul-list > li {
  list-style-type: none !important;
}

/* Custom UL */
ul[class*="mark"] {
  margin-left: 0;
  padding-left: 0;
}
ul[class*="mark"] > li {
  margin-left: 23px;
}
[class*="mark"] .ordfix {
  margin-left: 40px;
}

[class~="checkmark-heavy"] > li::before,
li[class~="checkmark-heavy"]::before {
  content: "\2714\20";
}
.list-green > li::before {
  color: rgba(0, 127, 0, 1);
}
li.list-green::before {
  color: rgba(0, 128, 0, 1);
}

.friends-segment {
  min-height: 300px;
  padding: 5px 0px 25px 35px;
  text-align: left;
}
.image {
  width: 70px;
  margin: 16px auto 0px;
}
.image img {
  width: 100%;
  height: auto;
  border-radius: 100% !important;
}
.card {
  display: inline-block;
  width: 253px;
  margin: 12px 14px;
  text-align: center;
  border-radius: 5px;
  text-decoration-line: none;
}
.card .content .header {
  font-size: 16px !important;
}
.card .content {
  padding: 10px 2px;
}
.card .content .header {
  margin: -3px 0px 0px;
}
.card .content .description {
  font-size: 12px !important;
  margin: 5px 0px 9px;
}
.card .content * {
  color: #fff !important;
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

.me-view-comment-title {
  font-weight: 600;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 20px;
}

.me-view-comment-write {
  background: #EBE8ED;
  margin-left:2%;
  width: 97%;  
  border-radius: 20px;
  margin-top: -30px;
  padding: 10px 0px;
}

.me-view-comment-text {
  font-size: 16px;
  border-radius: 5px;
  width:99%;
  margin-left: -1.5%;
  margin-top: 5px;
}
.me-button {
  color: #fff;
  margin: 10px 5px 2px -10px;
  border-radius: 10px;
}
#feiji{
      position: absolute;
      left: calc(100% - 280px);
      top: 80%;
      text-align: center;
      background:none !important;
      border:none !important;
}
</style>
<style>
.el-scrollbar {
  overflow-x: hidden !important;
}
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}

</style>