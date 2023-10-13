<template>
  <div class="lobby__header">
    <div class="lobby__header--left">
      <div class="message__box">
        <div class="message__box--content">
          <span>{{ memberInfo.name }}</span>
        </div>
        <div class="message__box--edit"></div>
      </div>
      <div class="message__box">
        <div class="message__box--content">
          <div class="money">
            <img :src="momeySrc" alt="" />
          </div>
          <span class="yellow">${{ memberInfo.momey }}</span>
        </div>
        <div class="message__box--loading" @click="loading()"></div>
      </div>
    </div>
    <div class="lobby__header--right">
      <div class="message__icon">
        <div
          v-for="(item, index) in icon"
          :key="index"
          class="message__icon--img"
          :class="[{ display__none: volumeStyle(item.key) }, item.key]"
          @click="checkIcon(item)"
        >
          <img :src="item.img" alt="" />
        </div>
      </div>
      <div class="message__box">
        <div class="message__box--content--money">
          <div class="message__box--redlimit"></div>
          <span class="yellow"
            >${{ memberInfo.startMoney }} - ${{ memberInfo.endMoney }}</span
          >
        </div>
      </div>
    </div>

    <audio
      ref="audioPlayer"
      :src="audioPlayer"
      type="audio/mp3"
      loop="ture"
    ></audio>
    <audio
      ref="audioClickPlayer"
      :src="audioClickPlayer"
      type="audio/mp3"
    ></audio>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "LobbyHeader",
  data() {
    return {
      momeySrc: require("./../../../assets/static/lobby/header/Money.png"),
      speakerSrc: require("./../../../assets/static/lobby/advertise/Speaker.png"),
      audioPlayer: require("./../../../assets/static/audio/BGM.mp3"),
      audioClickPlayer: require("./../../../assets/static/audio/ClickBtn.mp3"),
      icon: [
        {
          key: "mainMenu",
          img: require("./../../../assets/static/lobby/header/MainMenu.png"),
        },
        {
          key: "home",
          img: require("./../../../assets/static/lobby/header/Home.png"),
        },
        {
          key: "volumeOn",
          img: require("./../../../assets/static/lobby/header/VolumeOn.png"),
        },
        {
          key: "volumeOff",
          img: require("./../../../assets/static/lobby/header/VolumeOff.png"),
        },
        {
          key: "signOut",
          img: require("./../../../assets/static/lobby/header/SignOut.png"),
        },
      ],
      memberInfo: {
        name: "",
        momey: "",
        startMoney: "",
        endMoney: "",
      },
      isVolume: false,
    };
  },
  computed: {
    ...mapState({
      playerInfo: (state) => state.ws.playerInfo,
    }),
  },
  watch: {
    playerInfo(val) {
      this.initInfo();
    },
  },
  created() {
    this.initInfo();
  },
  methods: {
    initInfo() {
      const playerInfo = this.playerInfo;
      this.memberInfo.name = playerInfo.NickName;
      this.memberInfo.momey = this.formatPrice(playerInfo.Balance);
      this.memberInfo.startMoney = this.formatPrice(playerInfo.MiniBetLimit);
      this.memberInfo.endMoney = this.formatPrice(playerInfo.MaxBetLimit);
    },
    volumeStyle(data) {
      if (["volumeOn", "volumeOff"].includes(data)) {
        return data === "volumeOff" ? this.isVolume : !this.isVolume;
      }
    },
    checkIcon(icon) {
      const key = icon.key;
      switch (key) {
        case "mainMenu":
          break;
        case "home":
          this.$router.push({ path: "/Lobby" });
          break;
        case "volumeOn":
          this.isVolume = false;
          this.$refs.audioPlayer.pause();
          break;
        case "volumeOff":
          this.isVolume = true;
          this.$refs.audioPlayer.play();
          break;
        case "signOut":
          this.$emit("logout");
          break;
      }
      this.volumeStyle(icon.key);
      this.$refs.audioClickPlayer.play();
    },
    loading() {
      this.$refs.audioClickPlayer.play();
    },
    formatPrice(price) {
      return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>
<style lang="scss" scoped>
.display {
  &__none {
    display: none !important;
  }
}
.yellow {
  color: #ffd65a;
  font-size: 14px;
}
.lobby {
  &__header {
    width: 95%;
    padding: 15px 0 0 0;
    display: flex;
    justify-content: space-around;
    &--left,
    &--right {
      width: 48%;
    }
    &--marquee {
    width: 100%;
    height: 30px;
    background: url("./../../../assets/static/lobby/advertise/Announcement_BG.png")
      no-repeat;
    background-size: 100%;
    display: flex;
    align-items: center;
    img {
      height: 15px;
      padding-left: 10px;
    }
  }
  }
  .message {
    &__icon {
      width: 100%;
      height: 25px;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      &--img {
        width: 30px;
        display: flex;
        align-items: center;
      }
      .mainMenu {
        img {
          height: 20px;
        }
      }
      .home,
      .volumeOn,
      .volumeOff,
      .signOut {
        img {
          height: 25px;
        }
      }
    }
    &__box {
      width: 100%;
      height: 25px;
      background: url("./../../../assets/static/lobby/header/FrameBG.png")
        no-repeat;
      background-size: contain;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      &--content {
        width: 150px;
        padding-left: 15px;
        font-size: 9px;
        display: flex;
        align-items: center;
        &--money {
          width: 100%;
          padding-left: 15px;
          display: flex;
          align-items: center;
        }
        .money {
          width: 15px;
          height: 15px;
          background: url("./../../../assets/static/lobby/header/MoneyBG.png")
            no-repeat;
          background-size: cover;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 5px;
          img {
            height: 10px;
          }
        }
      }
      &--redlimit {
        width: 13px;
        height: 10px;
        background: url("./../../../assets/static/lobby/header/RedLimit.png")
          no-repeat;
        background-size: cover;
        margin-right: 5px;
      }
      &--edit {
        width: 15px;
        height: 15px;
        background: url("./../../../assets/static/lobby/header/Pen.png")
          no-repeat;
        background-size: cover;
      }
      &--loading {
        width: 15px;
        height: 15px;
        background: url("./../../../assets/static/lobby/header/Reset.png")
          no-repeat;
        background-size: cover;
      }
    }
  }
}
</style>