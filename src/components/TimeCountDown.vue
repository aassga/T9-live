<template>
  <div :id="gameTableId" class="circle">
    <div class="circle__line"></div>
    <div class="circle__second">{{count}}</div>
  </div>
</template>

<script>
export default {
  name: "TimeCountDown",
  props: {
    countDown: {
      type: Number,
    },
    gameTableId:{
      type: Number,
    }
  },
  data() {
    return {
      count: 60,
    };
  },
  created() {
    this.count = this.countDown
    this.timeCountDown() 
  },
  mounted() {
    this.initTime()
  },
  methods: {
    initTime(){
      document.getElementById(this.gameTableId).style.setProperty('--time', `${this.countDown + 2}s`);
    },
    // 倒數功能
    timeCountDown() {
      let time = null;
      time = setInterval(() => {
        if (this.count > 0) {
          this.count = this.count - 1;
        } else {
          clearInterval(time);
          this.count =  this.count;
          this.$emit("handleTimer",false,this.count)
        }
      }, 1000);
    },
  },
};
</script>
<style lang="scss" scoped>
$time: var(--time);
.circle {
  width: 24px;
  height: 24px;
  &__line {
    // top: 100px;
    // left: 100px;
    margin-left: 12px;
    position: absolute;
    width: 12px;
    height: 24px;
    overflow: hidden;
    border-radius: 0 50px 50px 0;
    -webkit-animation: size $time linear;
    &::before,
    &::after {
      content: "";
      box-sizing: border-box;
      position: absolute;
      top: 0;
      right: 0;
      width: 24px;
      height: 12px;
      border-style: solid;
      border-color: #2ee201;
      border-width: 3px 3px 0;
      border-radius: 50px 50px 0 0;
      transform-origin: 12px 12px;
    }
    &::before {
      opacity: 0;
      z-index: 2;
      transform: rotate(90deg);
      -webkit-animation: hide $time linear;
    }
    &::after {
      z-index: 1;
      transform: rotate(-90deg);
      -webkit-animation: circles $time linear;
    }
  }
  &__second {
    width: 100%;
    height: 100%;
    font-size: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
@keyframes circles {
  0% {
    transform: rotate(270deg);
  }
  79%{
    border-color: #2ee201;
  }
  80%{
    border-color: #F00;
  }
  100% {
    transform: rotate(-90deg);
  }
}
@keyframes hide {
  0% {
    opacity: 1;
  }

  49.99% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
}
@keyframes size {
  0% {
    margin-left: 0px;
    width: 24px;
    border-radius: 0 50px 50px 0;
  }

  49.99% {
    margin-left: 0px;
    width: 24px;
    border-radius: 0 50px 50px 0;
  }

  50% {
    margin-left: 12px;
    width: 12px;
    border-radius: 0;
  }

  100% {
    margin-left: 12px;
    width: 12px;
    border-radius: 0;
  }
}
</style>