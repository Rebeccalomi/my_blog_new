<template>
  <el-header>
    <el-row :gutter="20">
      <el-col :span="18" class="search">
        <el-autocomplete
          id="search"
          v-model="search"
          :fetch-suggestions="querySearchAsync"
          prefix-icon="el-icon-search"
          placeholder="请输入内容"
          @select="handleSelect"
        >
        </el-autocomplete>
      </el-col>
      <el-col :span="6">
        <el-menu :router="true" menu-trigger="click" mode="horizontal">
          <template v-if="!user.login">
            <el-menu-item index="/login">
              <el-button class="iconfont ali-icon-denglu"></el-button>
              {{ user.nickname }}
            </el-menu-item>
          </template>
          <template v-else>
            <el-submenu index>
              <template slot="title">
                <img class="me-header-picture" :src="user.avatar" />
              </template>
              <el-menu-item index="/updatepassword" style="color:black;"
                ><i class="el-icon-user"></i>{{ user.nickname }}</el-menu-item
              >
              <el-menu-item index="/write" v-show="user.id==='1'" 
                ><i class="el-icon-edit"></i>写文章</el-menu-item
              >
              <el-menu-item index @click="logout"
                ><i class="el-icon-back"></i>退出</el-menu-item
              >
            </el-submenu>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
import { searchArticle } from "@/api/article";
export default {
  name: "BaseHeader",
  props: {},
  data() {
    return {
      search: "",
      articles: []
    };
  },
  computed: {
    user() {
      let login = this.$store.state.account.length != 0;
      let avatar = this.$store.state.avatar;
      let nickname = this.$store.state.name;
      let id = this.$store.state.id;
      return {
        login,
        avatar,
        nickname,
        id
      };
    }
  },
  methods: {
    logout() {
      let that = this;
      this.$store
        .dispatch("logout")
        .then(() => {
          this.$router.push({ path: "/" });
        })
        .catch(error => {
          if (error !== "error") {
            that.$message({ message: error, type: "error", showClose: true });
          }
        });
    },
    querySearchAsync(queryString, cb) {
      searchArticle(this.search).then(res => {
        if (res.success) {
          var results = [];
          for (const item of res.data) {
            results.push({
              id: item.id,
              value: item.title
            });
          }
          cb(results);
        }
      });
    },
    handleSelect(item) {
      this.$router.push({ path: "/view/" + item.id });
    }
  }
};
</script>

<style scoped>
.me-title {
  margin-top: 10px;
  font-size: 24px;
}

.me-header-left {
  margin-top: 10px;
}

.me-title img {
  max-height: 2.4rem;
  max-width: 100%;
}

.me-header-picture {
  width: 45px;
  height: 45px;
  border: 1px solid #ddd;
  border-radius: 50%;
  vertical-align: middle;
}

.el-header {
  background-color: #495057;
  border-radius: 0px 0px 20px 20px;
  position: absolute;
  min-width: 100%;
  z-index: 1024;
  left: 0%;
  box-shadow: 0 2px 3px hsla(0, 0%, 7%, 0.1), 0 0 0 1px hsla(0, 0%, 7%, 0.1);
}
.el-autocomplete,
.el-input {
  background: #495057;
  width: 80%;
}

.el-button {
  background: rgb(103, 97, 104, 0);
  border: none;
}
.el-button:hover {
  background: rgb(3, 19, 33, 0.0) !important;
}
.el-menu.el-menu--horizontal {
  border: none;
}
</style>
<style>
.el-submenu__title:focus,
.el-submenu__title:hover {
  outline: 0 !important;
  background: rgb(3, 19, 33, 0.3) !important;
}
.el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
  border-bottom: none;
}
.el-menu-item {
  background-color: #495057 !important;
  color: #fff !important;
}
.el-autocomplete-suggestion.el-popper.is-loading {
  border: none;
}
.el-menu-item:hover {
  background-color: rgb(3, 19, 33, 0.3) !important;
}
.el-autocomplete-suggestion__wrap.el-scrollbar__wrap.el-scrollbar__wrap--hidden-default {
  background-color: #495057 !important;
  color:#fff !important;
}
.el-autocomplete-suggestion:hover {
  background-color: rgb(3, 19, 33, 0.3) !important;
}
.el-autocomplete-suggestion li{
  color:#fff !important;
}
.el-autocomplete-suggestion li:hover {
  background-color: rgb(3, 19, 33, 0.3) !important;
  color:#fff !important;
}
.popper__arrow {
  border-bottom-color: #495057 !important;
}
.popper__arrow::after {
  border-bottom-color: #495057 !important;
}
.el-input__inner {
  background-color: rgb(3, 19, 33, 0.3) !important;
  color: #fff !important;
  border: none;
}
.el-button:hover,
.el-button:active,
.el-menu,
.el-menu:hover {
  background: #495057 !important;
  border: none;
}
.el-scrollbar{
  background: #495057 !important;
  border:none;
}
#el-autocomplete-6238{
  color:white;
}
</style>