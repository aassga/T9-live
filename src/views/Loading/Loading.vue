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
import { login } from "@/api/index";
export default {
  name: 'Loading',
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    this.initLodingShow();
  },
  methods: {
    initLodingShow() {
      const token = localStorage.getItem("token");
      setTimeout(() => {
        this.loading = false;
        setTimeout(() => {
          if (token) {
            this.getLogin()
          } else {
            this.$router.push({ path: "/login" });
          }
        }, 1000);
      }, 1000);
    },
    getLogin() {
      const device = localStorage.getItem("device");
      const token = localStorage.getItem("token");
      let parmas = {
        Device: device === "mobile" ? '1' : '0',
        Token:token,
      };
      login(parmas).then((res) => {
        if(res.Error === 0){
          const token = res.Data.Token
          localStorage.setItem('token',token)
          this.$router.push({ path: "/MemberRule" });
        }else{
          this.$router.push({ path: "/login" });
        }
      });
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
    height: 20px;
    background: url('./../../../static/loading/LoadingLine.png') no-repeat;
    background-size: contain;
    top: -12rem;
    &--ball{
      width: 20px;
      height: 20px;
      display: inline-block;
      position: absolute;
      background: url('./../../../static/loading/LoadingPoint.png') no-repeat;
      background-size: cover;
      top: -5px;
      left: 51px;
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