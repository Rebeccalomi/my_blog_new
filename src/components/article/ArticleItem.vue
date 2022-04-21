<template>
  <div class="ui padded attached segment m-padded-tb-large m-margin-bottom-big m-box" id="title">
    <div class="ui large red right corner label" v-if="weight==1">
      <i class="arrow alternate circle up icon"></i>
    </div>
    <div class="ui middle aligned mobile reversed stackable">
      <div class="ui grid m-margin-lr">
					<div class="row m-padded-tb-small">
						<h2 class="ui header m-center m-scaleup">
							<a @click="view(id)" class="m-black">{{ title }}</a>
						</h2>
					</div>
          <!--文章简要信息-->
          <div class="row m-padded-tb-small">
            <div class="ui horizontal link list m-center">
              <div class="item m-datetime">
                <span>创建时间：{{createDate }}</span>
              </div>
              <div class="item m-datetime">
                <span v-if="updateDate">最后更新时间：{{updateDate }}</span>
              </div>
              <div class="item m-views">
                <i class="small eye icon"></i><span>{{ viewCounts}}</span>
              </div>
              <div class="item m-common-black">
                <i class="small pencil alternate icon"></i><span>{{commentCounts}}</span>
              </div>
            </div>

          </div>
          <!--分类-->
          <router-link :to="`/category/${category.id}`" class="ui purple large ribbon label">
						<i class="small folder open icon" style="margin-left:20px;"></i><span class="m-text-500">{{ category.categoryName }}</span>
					</router-link>
            <img class="me-title-picture" :src="titleImg"></img>
          <!--文章Markdown描述-->
          <div class="typo m-padded-tb-small line-numbers match-braces rainbow-braces" v-html="summary"></div>
          <!--阅读全文按钮-->
          <div class="row m-padded-tb-small m-margin-top">
            <a  @click="view(id)" class="color-btn">阅读全文</a>
          </div>
           <!--横线-->
					<div class="ui section divider m-margin-lr-no"></div>
					<!--标签-->
					<div class="row m-padded-tb-no">
						<div class="column m-padding-left-no">
              <router-link :to="`/tag/${tag.id}`" class="ui purple tag label m-text-500 m-margin-small"  v-for="(tag,index) in tags" :key="index">{{ tag.tagName }}</router-link>
						</div>
					</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { formatTime } from "../../utils/time";

  export default {
    name: 'ArticleItem',
    props: {
      id: String,
      weight: Number,
      title: String,
      commentCounts: Number,
      viewCounts: Number,
      summary: String,
      tags: Array,
      createDate: String,
      updateDate: String,
      titleImg: String,
      category: Object
    },
    data() {
      return {}
    },
    methods: {
      view(id) {
        this.$router.push({path: `/view/${id}`})
      }
    }
  }
</script>

<style scoped>
#title{
  background: #ebe8ed !important;
}
  .me-title-picture{
    margin:20px 0px;
    width:100%;
    height:100%;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
  }
</style>
