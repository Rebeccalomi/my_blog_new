<template>
  <div>
    <div class="message-banner">
      <!-- 弹幕输入框 -->
      <div class="message-container">
        <h1 class="message-title">留言板</h1>
        <div class="animate__animated animate__fadeInUp message-input-wrapper">
          <input v-if="user.nickname==''"
              style="color: #1b1c1d; width: 20%"
              v-model="messageNickname"
              @click="show = true"
              @keyup.enter="addToList"
              placeholder="昵称"
          />
          <input
              style="color: #1b1c1d;"
              v-model="msg"
              @click="show = true"
              @keyup.enter="addToList"
              placeholder="说点什么吧"
          />
          <el-button
              round
              type="info"
              class="ml-3 animate__animated animate__backInRight"
              @click="addToList"
              v-show="show"
          >
            发送
          </el-button>
        </div>
      </div>
      <!-- 弹幕列表 -->
      <div class="barrage-container">
        <vue-baberrage :barrageList="barrageList" :loop = "true">
          <template v-slot:default="slotProps">
            <span class="barrage-items">
              <img
                  :src="slotProps.item.avatar"
                  width="30"
                  height="30"
                  style="border-radius:50%"
              />
              <span class="ml-2">{{ slotProps.item.nickname }} :</span>
              <span class="ml-2">{{ slotProps.item.msg }}</span>
            </span>
          </template>
        </vue-baberrage>
      </div>
    </div>
  </div>
</template>

<script>
import {getAllMessage,sendMessage} from "@/api/msgfriend";
export default {
  name:"MessageBoard",
  data() {
    return {
      show: false,
      messageNickname: "",
      msg: "",
      barrageList: [],
      avatar: '',
      user:{}
    }
  },
  mounted(){
    this.listMessage();
  },
  created() {
      this.user.avatar = this.$store.state.avatar;
      this.user.nickname = this.$store.state.name;
      this.messageNickname=this.user.nickname;
  },
  methods: {
    addToList() {
      const _this = this;
      if (this.messageNickname.trim() == ""){
        this.$message.error("昵称不能为空")
        return false;
      }
      if (this.msg.trim() == ""){
        this.$message.error("留言不能为空")
        return false;
      }
      if (this.user.nickname != ''){
        this.avatar = this.user.avatar
        this.messageNickname=this.user.nickname
      }else {
        this.avatar = "https://img.rebecana.top/image-20220411160751809.png"
      }

      var message = {
          nickname: this.messageNickname,
          avatar: this.avatar,
          msg: this.msg,
          time: Math.floor(Math.random() * 10 + 3)
      };
      this.barrageList.push(message);
      this.msg = "";

      sendMessage(message).then(res => {
        if (res.success) {
          this.$message.success("发送成功")
        }
      });
    },
    listMessage() {
      getAllMessage().then(res => {
        if (res.success) {
          this.barrageList=res.data
        }
      });
    }
  },
};
</script>

<style scoped>
.message-banner {
  position: absolute;
  left:300px;
  width:calc(100% - 300px);
  right: 0;
  height: 100vh;
  animation: header-effect 1s;
}
.message-title {
  font-family: "ZCOOLKuaiLe-Regular";
  font-weight:1;
  font-size:60px;
  color: #eee;
  animation: title-scale 1s;
  background-image: -webkit-linear-gradient(
    left,
    #fdc5f5,
    #f7aef8 10%,
    #b388eb 20%,
    #8093f1 30%,
    #72ddf7 40%,
    #fdc5f5 50%,
    #f7aef8 60%,
    #b388eb 70%,
    #8093f1 80%,
    #72ddf7 90%,
    #fdc5f5 100%
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
.message-container {
  position: absolute;
  width: 360px;
  top: 35%;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 5;
  margin: 0 auto;
  color: #fff;
}
.message-input-wrapper {
  display: flex;
  justify-content: center;
  height: 2.5rem;
  margin-top: 2rem;
}
.message-input-wrapper input {
  outline: none;
  width: 70%;
  border-radius: 20px;
  height: 100%;
  padding: 0 1.25rem;
  color: #eee;
  border: #fff 1px solid;
}
.message-input-wrapper input::-webkit-input-placeholder {
  color: #eeee;
}
.message-input-wrapper button {
  outline: none;
  border-radius: 20px;
  height: 100%;
  padding: 0 1.25rem;
  border: #fff 1px solid;
}
.barrage-container {
  position: absolute;
  top: 50px;
  left: 0%;
  right: 0;
  bottom: 0;
  height: calc(100% -50px);
  width: 100%;
}
.barrage-items {
  background: rgb(0, 0, 0, 0.7);
  border-radius: 100px;
  color: #fff;
  padding: 5px 10px 5px 5px;
  align-items: center;
  display: flex;
}
.ml-3{
  margin-left: 12px!important;
}

.ml-2{
  margin-left: 8px!important;
}
.ps{
    height:100vh;
}
</style>
