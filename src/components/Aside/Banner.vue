<template>
  <div class="banner">
      </br></br></br>
    <span class="test">When life is full of scars, to give up or move on?</span>
  </div>
</template>

<script>
export default {
  name: "Banner",
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
.banner {
  margin-top: 15px;
  margin-left:2%;
  height: 200px;
  width: 97%;
  border-radius: 20px;
  background-image: url(https://img.rebecana.top/wallhaven-39l7m3.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.test {
  display: flex;
  justify-content: center;
  align-items: center;
  color: aliceblue;
  font-family: "BeauRivage-Regular";
  font-weight: 500;
  font-size: 40px;
  letter-spacing: 2px;
}
</style>
