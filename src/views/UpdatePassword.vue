<template>
  <div id="register" v-title data-title="rebecana_world - 注册">
    <div class="me-login-box me-login-box-radius">
      <h1>rebecana_world 个人资料</h1>

      <el-form ref="userForm" :model="userForm" :rules="rules" readonly: true>
        
        <el-form-item prop="avatar">
          <el-upload
            class="avatar-uploader"
            action="string"
            :http-request="uploadImage1"
            :show-file-list="true"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <span class="change">点击可以修改头像</span>
          </el-upload>
   
        </el-form-item>

        <el-form-item prop="account">
          <el-input placeholder="用户名" v-model="userForm.account" readonly></el-input>
        </el-form-item>

        <el-form-item prop="nickname">
          <el-input placeholder="昵称" v-model="userForm.nickname"></el-input>
        </el-form-item>

        <el-form-item prop="password" v-if="black">
          <el-input placeholder="输入原密码" type="password" v-model="userForm.password"></el-input>
        </el-form-item>

        <el-form-item prop="passwordnew" v-if="black">
          <el-input placeholder="输入新密码" type="password" v-model="userForm.passwordnew"></el-input>
        </el-form-item>

        <el-form-item prop="passwordnew1" v-if="black">
          <el-input placeholder="请再次输入密码" type="password" v-model="userForm.passwordnew1"></el-input>
        </el-form-item>

        <el-form-item size="small" class="me-login-button" v-if="!black">
          <el-button type="primary" @click="ChangePassword" class="btn">修改密码</el-button>
        </el-form-item>

                <el-form-item size="small" class="me-login-button" v-if="black">
          <el-button type="primary" @click="ChangePassword" class="btn">取消修改</el-button>
        </el-form-item>


        <el-form-item size="small" class="me-login-button">
          <el-button type="primary" @click.native.prevent="updatepassword('userForm')" class="btn">修改信息</el-button>
        </el-form-item>

      </el-form>



    </div>
  </div>
</template>

<script>
  import {update} from '@/api/login'
  import {uploadimage} from '@/api/upload'
  export default {
    name: 'UpdatePassword',
    data() {
      let checkPwd2=(rule,value,callback)=>{
            if(value.trim().length=== ''){
              callback(new Error("请确认密码不能为空"));
            }else if(value !=this.userForm.passwordnew){
              callback(new Error("2次密码不一致"));
            }else{
              callback();
            }
      }
      return {
        loginBg:"url(https://download.unsplash.com/photo-1428976365951-b70e0fa5c551)",
        black:false,
        imageUrl: '',
        userForm: {
          account: '',
          nickname: '',
          password: '',
          passwordnew: '',
          passwordnew1: '',
          avatar: ''
        },
        rules: {
          account: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {max: 10, message: '不能大于10个字符', trigger: 'blur'}
          ],
          nickname: [
            {required: true, message: '请输入昵称', trigger: 'blur'},
            {max: 10, message: '不能大于10个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {max: 15, message: '不能大于15个字符', trigger: 'blur'}
          ],
          passwordnew: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {max: 15, message: '不能大于15个字符', trigger: 'blur'}
          ],
          passwordnew1: [
            {required: true,validator:checkPwd2,trigger:"blur"}
          ]
        }
      };
    },
    mounted() {
        this.userForm.account = this.$store.state.account
        this.userForm.avatar = this.$store.state.avatar
        this.userForm.nickname = this.$store.state.name
        this.userForm.id=this.$store.state.id
        this.imageUrl=this.userForm.avatar
        document.body.style.backgroundSize = "100%";
        document.body.style.backgroundImage = this.loginBg;
    },
    methods: {
      ChangePassword(){
          this.black=!this.black;
      },
      uploadImage1(param){
        const formData = new FormData()
        formData.append('file', param.file)
        uploadimage(formData).then(response => {
          console.log('上传图片成功')
          this.userForm.avatar = response.data
          this.imageUrl = this.userForm.avatar;
          this.$message.success(this.userForm.avatar)
        }).catch(response => {
          console.log('图片上传失败')
        })
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          if(!isPNG){
            this.$message.error('上传头像图片只能是 JPG 或 png 格式!');
          }
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return (isJPG || isPNG) && isLt2M;
      },
      updatepassword(formName) {
        let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let userForm1={
              account: that.userForm.account,
              nickname: that.userForm.nickname,
              password: that.userForm.password,
              passwordnew: that.userForm.passwordnew,
              avatar: that.userForm.avatar
            };
            that.$store.dispatch('update',userForm1).then(() => {
              that.$message({message: '修改成功,返回登陆', type: 'success', showClose: true});
              that.$router.push({path: '/'})
            }).catch((error) => {
              if (error !== 'error') {
                that.$message({message: error, type: 'error', showClose: true});
              }
            })
          } else {
            return false;
          }
        });

      }

    }
  }
</script>

<style scoped>
    h1{
      color: #F1D9FF;
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
    .change {
      display: inline;
      margin-top: 20px;
      margin-left: 30px;
      color: azure;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      float: left;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #d9d9d9;
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
      float: left;
    }


  #login {
    min-width: 100%;
    min-height: 100%;
  }
  .change {
    color: azure;
  }
  .me-login-box {
    position: absolute;
    width: 400px;
    margin-top: 40px;
    margin-left: -180px;
    left: 50%;
    padding: 30px;
  }

  .me-login-box-radius {
    border-radius: 10px;
    background-color: rgba(123, 113, 126, 0.7);
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
    font-family: 'Open Sans', sans-serif;
    font-size: 18px;
  }

  .me-login-design-color {
    color: #5FB878 !important;
  }

  .me-login-button {
    text-align: center;
  }

  .me-login-button button {
    width: 100%;
  }

</style>
<style>
  .el-input__inner{
    background-color:rgba(123, 113, 126, 0.7) !important;
    border: none;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus { 
    -webkit-box-shadow: 0 0 0 1000px rgb(3, 19, 33,0.3) inset !important; 
    /* -webkit-text-fill-color: #fff; */
    -webkit-transition-delay: 99999s; 
    -webkit-transition: color  99999s ease-out, background-color  99999s ease-out;
}
</style>