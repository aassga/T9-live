<template>
  <div class="game">
    <div class="game__header">
      <span class="yellow"
        >{{ $t("__classicBaccarat") }}{{ gameList.TableId }}</span
      >
      <div class="game__header--time small__size">
        <lobby-time-count-down v-if="isCountDownShow" :gameTableId="gameList.TableId" :countDown="countDownTime" @handleTimer="handleTimer"/>
      </div>
    </div>
    <div class="game__content">
      <div class="game__content--road">
        <div v-for="index in 270" :key="index" class="road__frame--box"></div>
      </div>
      <div class="game__content--images">
        <img :src="gameList.DealerPhotoUrl" alt="" />
        <div class="images__name">{{ gameList.DealerName }}</div>
      </div>
    </div>
    <div class="game__bottom">
      <div class="game__bottom--left">
        <div class="Player">
          <span class="small__size">{{ $t("BetArea_Player") }}</span>
          <div class="status__ball status__red--border"></div>
          <div class="status__ball status__blue--bg"></div>
          <div class="status__line status__red--bg"></div>
        </div>
        <div class="Banker">
          <span class="small__size">{{ $t("BetArea_Banker") }}</span>
          <div class="status__ball status__blue--border"></div>
          <div class="status__ball status__red--bg"></div>
          <div class="status__line status__blue--bg"></div>
        </div>
        <div class="game__round small__size">#{{ gameList.GameRound }}</div>
        <div class="game__count">
          <div class="game__bottom--ball blue">
            <span class="small__size">{{ $t("BetArea_Player") }}</span>
          </div>
          <span class="small__size">12</span>
        </div>
        <div class="game__count">
          <div class="game__bottom--ball red">
            <span class="small__size">{{ $t("BetArea_Banker") }}</span>
          </div>
          <span class="small__size">12</span>
        </div>
        <div class="game__count">
          <div class="game__bottom--ball green">
            <span class="small__size">{{ $t("BetArea_Tie") }}</span>
          </div>
          <span class="small__size">12</span>
        </div>
        <div class="game__count">
          <div class="game__bottom--ball gray__Player--Pair"></div>
          <span class="small__size">12</span>
        </div>
        <div class="game__count">
          <div class="game__bottom--ball gray__Banker--Pair"></div>
          <span class="small__size">12</span>
        </div>
        
      </div>
      <div class="game__bottom--right">
        <div class="game__bottom--btn">
          <span class="small__size">{{ $t("JoinIn") }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LobbyTimeCountDown from "./LobbyTimeCountDown.vue";

import Socket from "@/utils/socket";
export default {
  name: "LobbyGame",
  props: {
    gameList: {
      type: Object,
    },
  },
  data() {
    return {
      countDownTime:0,
      isCountDownShow:false
    };
  },
  watch:{
    countDownTime(num){
      this.isCountDownShow = num > 0
    }
  },
  components: {
    LobbyTimeCountDown,
  },
  created() {
    Socket.$on("message", this.handleGetMessage);
  },
  beforeDestroy() {
    Socket.$off("message", this.handleGetMessage);
  },
  methods: {
    handleTimer(boolen,num){
      this.isCountDownShow = boolen
      this.countDownTime = num
    },
    handleGetMessage(msg){
      const msgType = JSON.parse(msg).OpCode;
      switch (msgType) {
        case "StartGame":
          const gameTableId = this.gameList.TableId
          const socketTableId = JSON.parse(msg).TableId
          if(gameTableId === socketTableId){
            const startTime = new Date(JSON.parse(msg).StartTime);
            const endBetTime = new Date(JSON.parse(msg).EndBetTime);
            const difference = endBetTime.getTime()- startTime.getTime();
            this.countDownTime = difference / 1000
          }
          break
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.yellow {
  color: #ffd997;
  font-size: 10px;
  margin-left: 10px;
}
.small__size {
  transform: scale(0.8);
}

.game {
  width: 100%;
  height: 160px;
  background: url("./../../../assets/static/lobby/game/RoomBG.png") no-repeat;
  background-size: 100% 100%;
  &__header {
    width: 100%;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &--time {
      position: absolute;
      right: 4px;
      top: 3px;
    }
  }
  &__content {
    width: 100%;
    display: flex;
    &--road {
      width: 75%;
      height: 100px;
      background: url("./../../../assets/static/lobby/game/RoadMap_W.png")
        no-repeat;
      background-size: 98% 100%;
      padding: 7px;
    }
    &--images {
      height: 100px;
      display: flex;
      justify-content: center;
      img {
        height: 100%;
        border-radius: 10px;
      }
    }
    .road {
      &__frame {
        &--box {
          border: 1px solid #b3b3b3;
          float: left;
          font-size: 10px;
          width: 3.6%;
          height: 8.5px;
          line-height: 8.5px;
        }
      }
    }
    .images {
      &__name {
        width: 80%;
        height: 17px;
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.7);
        position: absolute;
        bottom: 5px;
        font-size: 10px;
        text-align: center;
      }
    }
  }
  &__bottom {
    width: 100%;
    display: flex;
    align-items: center;
    &--left {
      display: flex;
      align-items: center;
      font-size: 10px;
      width: 75%;
      height: 35px;
      .Player,
      .Banker {
        width: 45px;
        line-height: 13px;
        display: flex;
        align-items: center;
        margin: 0 3px;
        padding: 0 4px;
      }
      .Player {
        background: url("./../../../assets/static/lobby/game/Prediction_Player_BG.png")
          no-repeat;
        background-size: 100%;
      }
      .Banker {
        background: url("./../../../assets/static/lobby/game/Prediction_Banker_BG.png")
          no-repeat;
        background-size: 100%;
      }
      .blue {
        background: url("./../../../assets/static/lobby/game/Player.png")
          no-repeat;
        background-size: 100%;
      }
      .red {
        background: url("./../../../assets/static/lobby/game/Banker.png")
          no-repeat;
        background-size: 100%;
      }
      .green {
        background: url("./../../../assets/static/lobby/game/Tir.png") no-repeat;
        background-size: 100%;
      }
      .gray__Player--Pair {
        background: url("./../../../assets/static/lobby/game/Player_Pair_BG.png")
          no-repeat;
        background-size: 100%;
        &::after {
          display: block;
          content: "";
          width: 55%;
          height: 55%;
          background: url("./../../../assets/static/lobby/game/Player_Pair_Point.png")
            no-repeat;
          background-size: 100%;
          position: absolute;
          left: 7px;
          top: 7px;
        }
      }
      .gray__Banker--Pair {
        background: url("./../../../assets/static/lobby/game/Banker_Pair_BG.png")
          no-repeat;
        background-size: 100%;
        &::after {
          display: block;
          content: "";
          width: 55%;
          height: 55%;
          background: url("./../../../assets/static/lobby/game/Banker_Pair.png")
            no-repeat;
          background-size: 100%;
          position: absolute;
          left: 7px;
          top: -2px;
        }
      }
    }
    &--right {
      width: 25%;
    }

    &--ball {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin: 0 0 0 3px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .status {
      &__ball {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        margin: 0 2px;
      }
      &__line {
        width: 10px;
        height: 1px;
        transform: rotate(-45deg);
      }
      &__red {
        background-color: #f00;
        &--border {
          border: 1px solid #f00;
        }
        &--bg {
          background-color: #f00;
        }
      }
      &__blue {
        &--border {
          border: 1px solid #00f;
        }
        &--bg {
          background-color: #00f;
        }
      }
    }
    &--btn {
      width: 90%;
      height: 25px;
      background: url("./../../../assets/static/lobby/game/ButtonRed.png")
        no-repeat;
      background-size: 100%;
      font-size: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  &__round {
    margin: 0 0 0 5px;
  }
  &__count {
    display: flex;
    align-items: center;
    margin-right: 3px;
  }
}
</style>