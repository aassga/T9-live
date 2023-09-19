<template>
  <div class="loading_page">
    <img
      src="./../../../static/loading/LoadingIcon.gif"
      alt=""
      v-show="loading"
    />
    <div class="loading_page--bg" v-show="!loading">
      <img src="./../../../static/loading/bg.jpg" alt="" />
      <div class="loading_bar">
        <div class="loading_bar--ball"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    this.lodingShow();
    this.getSerialNumber()
  },
  methods: {
    lodingShow() {
      setTimeout(() => {
        this.loading = false;
        setTimeout(() => {
          if (localStorage.getItem("token")) {
          } else {
            this.$router.push({ path: "/login" });
          }
        }, 1000);
      }, 1000);
    },
    getSerialNumber() {
      let serialNumber = localStorage.getItem('serialNumber')
      if (!serialNumber) {
        var chars =
            "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
          serialLength = 10,
          randomSerial = "",
          i,
          randomNumber;

        for (i = 0; i < serialLength; i = i + 1) {
          randomNumber = Math.floor(Math.random() * chars.length);
          randomSerial += chars.substring(randomNumber, randomNumber + 1);
        }
        localStorage.setItem('serialNumber',randomSerial)
      }

    },
  },
};
</script>
<style lang="scss" scoped>
.loading {
  &_page {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000;
    &--bg {
      width: 100%;
      height: 100%;
      text-align: center;
      img {
        width: 98%;
        margin-top: 1rem;
      }
    }
  }
  &_bar{
    display: inline-block;
    position: relative;
    width: 350px;
    height: 50px;
    background: url('./../../../static/loading/Loading_atlas0.png') no-repeat;
    background-size: 30rem;
    top: -12rem;
    &--ball{
      width: 16px;
      height: 14px;
      display: inline-block;
      position: absolute;
      background: url('./../../../static/loading/Loading_atlas0.png') no-repeat;
      background-size: 30rem;
      background-position: -376px -39px;
      top: -2px;
      left: 51px;
      transform: rotate(89deg);
      animation-name: animation; /*動畫名稱(自訂)*/
      animation-duration: 2s; /*一次完整動畫時間為4秒*/
      animation-iteration-count: infinite; /*播放次數為無限次*/

    }
  }
}
@keyframes animation {
  0%   {left: 50px;}
  100% {left: 300px;}
}
</style>