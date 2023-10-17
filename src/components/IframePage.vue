<template>
  <div id="iframeParent">
    <div class="iframe__box">
      <div :id="iframeDivId">
        <iframe
          frameborder="0"
          noresize="noresize"
          :id="iframeId"
          :src="gameRuleUrl"
        ></iframe>
      </div>
    </div>
    <div class="iframe__submit" @click="onSubmit()">
      <div class="iframe__submit--text">
        {{ initSubmitText() }}
      </div>
    </div>
    <div class="iframe__checkbox" v-if="isShowRemember">
      <input type="checkbox" id="inputId" v-model="remember" />
      <label for="inputId"></label>
      <span class="iframe__checkbox--text">{{ $t("DoNotShowAgain") }}</span>
    </div>
    <audio
      ref="audioClickPlayer"
      :src="audioClickPlayer"
      type="audio/mp3"
    ></audio>
  </div>
</template>
<script>
import screenfull from "screenfull";
export default {
  name: "IframePage",
  data() {
    return {
      remember: "",
      audioClickPlayer: require("./../assets/static/audio/ClickBtn.mp3"),
    };
  },
  props: {
    iframeDivId: {
      type: String,
    },
    iframeId: {
      type: String,
    },
    gameRuleUrl: {
      type: String,
    },
    isShowRemember: {
      type: Boolean,
    },
  },
  mounted() {},
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
    initSubmitText() {
      if (this.isShowRemember) {
        return this.$t("ConfirmThePrecautions");
      } else {
        return this.$t("Confirm");
      }
    },
    onSubmit() {
      if (this.isShowRemember) {
        const today = this.$root.formatTime(new Date());
        const account = localStorage.getItem("account");
        if (this.remember) {
          const GamePrecautionsNumber = "GamePrecautions_" + account;
          localStorage.setItem(GamePrecautionsNumber, today);
        }
        // this.openFullScreen()
        setTimeout(() => {
          this.$router.push({ path: "/Lobby" });
        }, 500);
      } else {
        this.$emit("close");
      }
      this.$refs.audioClickPlayer.play();
    },
  },
};
</script>
<style lang="scss" scoped>
#iframeParent {
  width: 100%;
  height: 100%;
  background-color: #000000d1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
}
#GamePrecautionsDiv,
#BannerDiv {
  width: 100%;
  height: 100%;
  z-index: 3;
  visibility: visible;
}

.iframe {
  &__box {
    width: 100%;
    height: 70vh;
    // background: url("./../assets/static/btn/CN/Frame_BG.png") no-repeat;
    // background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #4c453d;
    border-radius: 8px;
    overflow: hidden;
  }
  &__submit {
    display: inline-block;
    position: relative;
    width: 75%;
    height: 75px;
    background: url("./../assets/static/btn/CN/Button_BG.png") no-repeat;
    background-size: 100%;
    background-position: center;
    &--text {
      position: absolute;
      width: 100%;
      height: 75px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 17px;
    }
  }
  &__checkbox {
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
    &--text {
      font-size: 13px;
    }
  }
}
</style>