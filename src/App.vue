<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      device:"",
    }
  },
  created() {
    this.init()
    this.getUserAgent();
    this.getSerialNumber()
  },
  methods: {
    init() {
      const token = localStorage.getItem('token')
      if(!token){
        this.$router.push({ path: "/Loading" });
      }
    },
    getUserAgent() {
      if (
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i) ||
        navigator.userAgent.match(/Macintosh/i)
      ) {
        this.device = "mobile";
      } else {
        this.device = "pc";
      }
      localStorage.setItem("device", this.device);
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


<style lang="scss">
#app {
  max-width: 100%;
  height: 100%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", "Regular", Arial, sans-serif;
}
</style>
