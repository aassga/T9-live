<template>
  <div class="hello_page">
    <img
      src="./../../../static/loadig/LoadingIcon.gif"
      alt=""
      v-show="loading"
    />
    <div class="hello_page--bg" v-show="!loading">
      <img src="./../../../static/loadig/bg.jpg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'helloPage"',
  data() {
    return {
      loading: true,
      SerialNumber: "",
    };
  },
  mounted() {
    this.lodingShow();
    this.GetSerialNumber()
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
    GetSerialNumber() {
      if (!this.SerialNumber) {
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
        this.SerialNumber = randomSerial;
      }
      return this.SerialNumber;
    },
  },
};
</script>
<style lang="scss" scoped>
.hello {
  &_page {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &--bg {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        margin-top: 5rem;
      }
    }
  }
}
</style>