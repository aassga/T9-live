<template>
  <div id="app" v-if="device === 'mobile'">
    <router-view v-if="!isScreenMask"></router-view>
    <div class="screen__mask" v-if="isScreenMask">
      <div class="screenMobile" v-if="isScreenMobile">
        <img :src="mobileRotIconSrc" alt="" />
        <div class="screenMobile__text" v-html="examine()"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { onLogout } from "@/utils/system";
export default {
  name: "App",
  data() {
    return {
      device: "",
      isScreenMask: false,
      isScreenMobile: false,
      mobileRotIconSrc: require("./assets/static/MobileRotIcon.png"),
    };
  },
  created() {
    this.initRouter();
    this.renderResize();
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
    examine() {
      const str = this.$t("ScreenLandscapeTip");
      return str.replace("↓", "<br/>");
    },
    renderResize() {
      const width = document.documentElement.clientWidth;
      const height = document.documentElement.clientHeight;
      if (width > height) {
        this.isScreenMask = true;
        this.isScreenMobile = true;
      }
    },
    initRouter() {
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push({ path: "/Loading" });
      }
    },
    isMobileDevice() {
      const mobileDevice = [
        "Android",
        "webOS",
        "iPhone",
        "iPad",
        "iPod",
        "BlackBerry",
        "Windows Phone",
      ];
      let isMobileDevice = mobileDevice.some((e) =>
        navigator.userAgent.match(e)
      );
      this.device = isMobileDevice ? "mobile" : "pc";
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
    onSubmit() {
      onLogout();
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
.screen {
  &__mask {
    width: 100%;
    height: 100%;
    background-color: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .screenMobile {
      img {
        height: 140px;
      }
      &__text {
        font-size: 20px;
        text-align: center;
        margin-top: 20px;
      }
    }
  }
}
</style>
