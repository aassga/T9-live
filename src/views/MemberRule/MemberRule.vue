<template>
  <div id="iframeParent">
    <div class="mask__border">
      <div id="GamePrecautionsDiv">
        <iframe
          frameborder="0"
          noresize="noresize"
          id="GamePrecautionsIframe"
          :src="gameRuleUrl"
        ></iframe>
      </div>
    </div>
    <div class="submit" @click="onSubmit()">
      <div class="submit__text">
        {{ $t("ConfirmThePrecautions") }}
      </div>
    </div>
    <div class="checkbox">
      <input type="checkbox" id="inputId" v-model="remember" />
      <label for="inputId"></label>
      <span class="checkbox__text">{{ $t("DoNotShowAgain") }}</span>
    </div>
    <audio ref="audioClickPlayer" :src="audioClickPlayer" type="audio/mp3"></audio>

  </div>
</template>
<script>
import screenfull from 'screenfull'
export default {
  name: "MemberRule",
  data() {
    return {
      remember: "",
      gameRuleUrl: "",
      audioClickPlayer:require("./../../assets/static/audio/ClickBtn.mp3"),
    };
  },
  mounted() {
    this.initOpenGamePrecation();
  },
  methods: {
    openFullScreen() {
       // 如果不允许进入全屏，发出不允许提示
       if (!screenfull.isEnabled) {
        this.$message("您的浏览器不能全屏");
        return false;
      }
      screenfull.toggle();
      // this.$message.success("全屏啦");
    },
    initOpenGamePrecation() {
      const language = localStorage.getItem("language");
      const languageList = {
        CN: "cn",
        TW: "tw",
        EN: "en",
        JP: "jp",
        TH: "th",
      };
      const nowLanguage = languageList[language];
      const gameRuleRouter = localStorage.getItem("gameRuleRouter");
      this.gameRuleUrl = `${process.env.VUE_APP_URL}${gameRuleRouter}?language=${nowLanguage}`;
    },
    onSubmit() {
      const today = this.$root.formatTime(new Date());
      const account = localStorage.getItem("account");
      if (this.remember) {
        const GamePrecautionsNumber = "GamePrecautions_" + account;
        localStorage.setItem(GamePrecautionsNumber, today);
      }
      // this.openFullScreen()
      this.$refs.audioClickPlayer.play();
      setTimeout(() => {
        this.$router.push({ path: "/Lobby" });
      }, 500);
    },
  },
};
</script>
<style lang="scss" scoped>
#iframeParent {
  width: 100%;
  height: 100%;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 30px;
}
#GamePrecautionsDiv {
  width: 100%;
  height: 60vh;
  z-index: 3;
  visibility: visible;
}
.mask {
  &__border {
    width: 100%;
    height: 60vh;
    background: url("./../../assets/static/btn/CN/Frame_BG.png") no-repeat;
    background-size: 100% 100%;
  }
}
.submit {
  display: inline-block;
  position: relative;
  width: 75%;
  height: 75px;
  background: url("./../../assets/static/btn/CN/Button_BG.png") no-repeat;
  background-size: 100%;
  background-position: center;
  &__text {
    position: absolute;
    width: 100%;
    height: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
  }
}
.checkbox {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 120px;
  input {
    display: none;
  }
  label {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 5px;
    border: 1px solid #979797;
    position: relative;
    cursor: pointer;
  }
  label::before {
    display: inline-block;
    content: " ";
    width: 12px;
    border: 2px solid #fbdc8f;
    height: 4px;
    border-top: none;
    border-right: none;
    transform: rotate(-45deg);
    top: 5px;
    left: 3px;
    position: absolute;
    opacity: 0;
  }
  input:checked + label::before {
    opacity: 1;
    transform: all 0.5s;
  }
  &__text {
    font-size: 13px;
  }
}
</style>