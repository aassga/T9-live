<template>
  <div id="app" v-if="device === 'mobile'"> 
    <router-view v-if="!screenMask"></router-view>
    <div class="screen__mask" v-if="screenMask">
      <img src="./../static/MobileRotIcon.png" alt="" />
      <div class="screen__mask--text" v-html="examine()"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      device: "",
      screenMask: false,
    };
  },
  created() {
    this.initRouter();
    this.renderResize()
    this.isMobileDevice();
    this.getSerialNumber();
  },
  mounted() {
    window.addEventListener("resize", this.renderResize, false);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.renderResize, false);
  },
  methods: {
    examine(){
      const str = this.$t("ScreenLandscapeTip");
      return str.replace('↓', '<br/>')
    },
    renderResize() {
      const width = document.documentElement.clientWidth;
      const height = document.documentElement.clientHeight;
      this.screenMask = width > height ;
    },
    initRouter() {
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push({ path: "/Loading" });
      }
    },
    isMobileDevice() {
      const mobileDevice = ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone']
      let isMobileDevice = mobileDevice.some(e => navigator.userAgent.match(e))
      this.device = isMobileDevice ? "mobile" : "pc"
      localStorage.setItem("device", this.device);
    },
    getSerialNumber() {
      const serialNumber = localStorage.getItem("serialNumber");
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
        localStorage.setItem("serialNumber", randomSerial);
      }
    },
  },
};
</script>


<style lang="scss">
#app {
  max-width: 100%;
  height: 100%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", "Regular", Arial, sans-serif;
}
.screen{
  &__mask{
    width: 100%;
    height: 100%;
    background-color: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img{
      height: 140px;
    }
    &--text{
      font-size: 20px;
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>
