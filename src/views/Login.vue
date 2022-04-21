<template>
  <div class="me-login-box me-login-box-radius">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="登录" name="first">
        <div id="login">
          <h1>rebecana_world - 登录</h1>

          <el-form ref="userForm" :model="userForm" :rules="rules">
            <el-form-item prop="account">
              <el-input
                placeholder="用户名"
                v-model="userForm.account"
              ></el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                placeholder="密码"
                type="password"
                v-model="userForm.password"
              ></el-input>
            </el-form-item>

            <el-form-item size="small" class="me-login-button">
              <el-button
                type="primary"
                @click.native.prevent="login('userForm')"
                class="btn"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>

      <el-tab-pane label="注册" name="second">
        <div id="register">
          <h1>rebecana_world 注册</h1>
          <el-form ref="RegistForm" :model="RegistForm" :rules="rules">
            <el-form-item prop="avatar">
              <el-upload
                class="avatar-uploader"
                action="string"
                :http-request="uploadImage1"
                :show-file-list="true"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <span class="change">点击可以修改头像</span>
              </el-upload>
            </el-form-item>

            <el-form-item prop="account">
              <el-input
                placeholder="用户名"
                v-model="RegistForm.account"
              ></el-input>
            </el-form-item>

            <el-form-item prop="nickname">
              <el-input
                placeholder="昵称"
                v-model="RegistForm.nickname"
              ></el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                placeholder="密码"
                type="password"
                v-model="RegistForm.password"
              ></el-input>
            </el-form-item>

            <el-form-item size="small" class="me-login-button">
              <el-button
                type="primary"
                @click.native.prevent="register('RegistForm')"
                class="btn"
                >注册</el-button
              >
            </el-form-item>
          </el-form>
        </div></el-tab-pane
      >
    </el-tabs>
  </div>
</template>

<script>
import { register,login } from "@/api/login";
import { uploadimage } from "@/api/upload";
export default {
  name: "Login",
  data() {
    return {
      activeName: "first",
      loginBg:
        "url(https://download.unsplash.com/photo-1428976365951-b70e0fa5c551)",
      userForm: {
        account: "",
        password: "",
      },
      imageUrl: '',
      RegistForm: {
        account: '',
        nickname: '',
        password: '',
        avatar: ''
      },
      rules: {
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { max: 10, message: "不能大于10个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { max: 15, message: "不能大于15个字符", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    // 添加背景图片
    document.body.style.backgroundSize = "100%";
    document.body.style.backgroundImage = this.loginBg;
  },
  methods: {
    handleClick(tab, event) {
    },
    login(formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.$store
            .dispatch("login", that.userForm)
            .then(() => {
              that.$router.go(-1);
            })
            .catch((error) => {
              if (error !== "error") {
                that.$message({
                  message: error,
                  type: "error",
                  showClose: true,
                });
              }
            });
        } else {
          return false;
        }
      });
    },
    uploadImage1(param) {
      const formData = new FormData();
      formData.append("file", param.file);
      uploadimage(formData)
        .then((response) => {
          console.log("上传图片成功");
          this.RegistForm.avatar = response.data;
          this.imageUrl = this.RegistForm.avatar;
          this.$message.success(this.RegistForm.avatar);
        })
        .catch((response) => {
          console.log("图片上传失败");
        });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        if (!isPNG) {
          this.$message.error("上传头像图片只能是 JPG 或 png 格式!");
        }
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return (isJPG || isPNG) && isLt2M;
    },
    register(formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.$store
            .dispatch("register", that.RegistForm)
            .then(() => {
              that.$message({
                message: "注册成功 快写文章吧",
                type: "success",
                showClose: true,
              });
              that.$router.push({ path: "/" });
            })
            .catch((error) => {
              if (error !== "error") {
                that.$message({
                  message: error,
                  type: "error",
                  showClose: true,
                });
              }
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
h1{
  color: #F1D9FF;
}
.change {
  color: azure;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 18px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}

#login {
  min-width: 100%;
  min-height: 100%;
}

.btn {
  width: 100%;
  background-color: blueviolet;
  border-radius: 10px;
  border-color: rgba(123, 113, 126, 0.7);
}
.btn:hover {
  width: 100%;
  background-color: #b014d1;
  border-radius: 10px;
  border-color: rgba(123, 113, 126, 1);
}

.me-login-box {
  position: absolute;
  width: 400px;
  margin-top: 100px;
  margin-left: -180px;
  left: 45%;
  padding: 30px;
}

.me-login-box-radius {
  background-color: rgba(123, 113, 126, 0.7);
  border-radius: 10px;
  box-shadow: 0px 0px 1px 1px rgba(161, 159, 159, 0.1);
}

.me-login-box h1 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  vertical-align: middle;
}

.me-login-design {
  text-align: center;
  font-family: "Open Sans", sans-serif;
  font-size: 18px;
}

.me-login-design-color {
  color: #5fb878 !important;
}

.me-login-button {
  text-align: center;
}

.me-login-button button {
  width: 100%;
}

</style>
