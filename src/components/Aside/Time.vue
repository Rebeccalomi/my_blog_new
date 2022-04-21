<template>
  <div class="tac">
    <FlipClock></FlipClock>
    <Calendar
      v-on:choseDay="clickDay"
      v-on:changeMonth="changeDate"
      v-on:isToday="clickToday"
    ></Calendar>
  </div>
</template>

<script>
import { getMe } from "@/api/article";
import FlipClock from '../Flipper/FlipClock.vue'
import Calendar from 'vue-calendar-component';
export default {
  name: "Time",
  components: {
    FlipClock,Calendar
  },
  data() {
    return {
    }
  },
  methods: {
    clickDay(data) {
      console.log(data); //选中某天
    },
    changeDate(data) {
      console.log(data); //左右点击切换月份
    },
    clickToday(data) {
      console.log(data); // 跳到了本月
    },
}
}
</script>

<style>
.tac{
    margin-top: 20px;
    padding-left: 10px;
    width: 290px;
}

.wh_content_all{
    background-image:url('https://img.rebecana.top/94abc2c9-17c7-4f1d-922c-4bd8c2441b68.jpg') !important;
    background-size:100% 100%;
    border-radius:10px;
}
/*今天*/
.wh_content_item .wh_isToday[data-v-2ebcbc83]{
    background-color:rgb(139, 175, 241);
}
/*日历点击*/
.wh_content_item .wh_chose_day[data-v-2ebcbc83]{
     background-color:transparent; 
}
/*日历划过*/
.wh_item_date[data-v-2ebcbc83]:hover{
    background-color:rgb(111, 223, 223);
    border-radius: 100%;
}
</style>