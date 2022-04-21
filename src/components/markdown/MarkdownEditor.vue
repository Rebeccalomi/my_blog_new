<!--
 * @Author: your name
 * @Date: 2022-03-23 14:11:42
 * @LastEditTime: 2022-04-19 03:12:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /my_blog_new/src/components/markdown/MarkdownEditor.vue
-->
<template>
  <mavon-editor
    class="me-editor"
    ref="markdown"
    v-model="editor.value"
    :ishljs="true"
    @imgAdd="imgAdd"
    v-bind="editor"
    :external-link="externalLink"
  >
  </mavon-editor>
</template>


<script>
import { mavonEditor } from "mavon-editor";
import 'mavon-editor/dist/css/index.css'
import 'mavon-editor/dist/markdown/github-markdown.min.css'
import { upload } from "@/api/upload";
export default {
  name: "MarkdownEditor",
  props: {
    editor: Object,
  },
  data() {
    return {
      externalLink: {
        markdown_css: false,
        hljs_js: () => "/static/markdown/dist//highlightjs/highlight.min.js",
        hljs_css: (css) => "/static/markdown/dist//highlightjs/styles/" + css + ".min.css",
        hljs_lang: (lang) => "/static/markdown/dist//highlightjs/languages/" + lang + ".min.js",
        katex_css: () => "/static/markdown/dist//katex/katex.min.css",
        katex_js: () => "/static/markdown/dist//katex/katex.min.js",
      },
    };
  },
  mounted() {
    this.$set(this.editor, "ref", this.$refs.markdown);
    console.log(this.editor);
  },
  created() {},
  methods: {
    imgAdd(pos, $file) {
      let that = this;
      let formdata = new FormData();
      formdata.append("image", $file);
      upload(formdata)
        .then((data) => {
          // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
          if (data.success) {
            that.$refs.markdown.$img2Url(pos, data.data);
          } else {
            that.$message({
              message: data.msg,
              type: "error",
              showClose: true,
            });
          }
        })
        .catch((err) => {
          that.$message({ message: err, type: "error", showClose: true });
        });
    },
  },
  components: {
    mavonEditor,
  },
};
</script>
<style scoped>
.me-editor {
  z-index: 6 !important;
}

.v-note-wrapper.fullscreen {
  top: 60px !important;
}
</style>
