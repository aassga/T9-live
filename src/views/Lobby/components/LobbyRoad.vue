<template>
  <div class="room__road">
    <div class="room__road--bg">
      <div class="road__header">
        <div class="road__header--title">
          <img src="./../../../../static/lobby/room/Fire.png" alt="" />
          {{ $t("TopGames") }}
        </div>
        <img
          class="road__header--more"
          src="./../../../../static/lobby/room/More.png"
          alt=""
        />
      </div>
      <div class="road__content">
        <div
          class="road__content--game"
          v-for="(item, index) in tableList.slice(0, 3)"
          :key="index"
        >
          <span class="yellow"
            >{{ $t("__classicBaccarat") }}{{ item.TableId }}</span
          >
          <div class="game__bg">
            <div class="game__frame">
              <div v-for="index in 78" :key="index" class="game__frame--box">
                0
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="room__road--bg">
      <div class="road__header">
        <div class="road__header--title">
          <img src="./../../../../static/lobby/room/Star.png" alt="" />
          {{ $t("GoodRoad") }}
        </div>
        <img
          class="road__header--more"
          src="./../../../../static/lobby/room/More.png"
          alt=""
        />
      </div>
      <div class="road__content">
        
        <div
          class="road__content--game"
          v-for="(item, index) in tableList.slice(0, 3)"
          :key="index"
        >
          <span class="yellow"
            >{{ $t("__classicBaccarat") }}{{ item.TableId }}</span
          >
          <div class="game__bg">
            <div class="game__frame">
              <div v-for="index in 78" :key="index" class="game__frame--box">
                0
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "LobbyRoad",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tableList: (state) => state.ws.tableList,
    }),
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.yellow {
  color: #ffd997;
  font-size: 10px;
  margin-left: 10px;
}
.room {
  &__road {
    &--bg {
      width: 100%;
      height: 110px;
      background: url("./../../../../static/lobby/room/Frame_0.png") no-repeat;
      background-size: 100% 100%;
      margin-bottom: 4px;
    }
  }
}
.road {
  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    &--title {
      display: flex;
      margin: 0 auto;
      align-items: center;
      font-size: 10px;
      img {
        height: 15px;
        padding: 0 5px;
      }
    }
    &--more {
      position: absolute;
      right: 15px;
      height: 10px;
    }
  }
  &__content {
    width: 100%;
    padding: 0 5px;
    display: flex;
    justify-content: space-around;
    &--game {
      width: 32%;
      height: 68px;
      background: url("./../../../../static/lobby/room/RoadMap_BG.png")
        no-repeat;
      background-size: 100% 100%;
      .game {
        &__bg {
          width: 100%;
          height: 45px;
          background: url("./../../../../static/lobby/room/Road_WBG.png")
            no-repeat;
          background-size: 100% 100%;
          padding: 2px 3px 3px 4px;
        }
        &__frame {
          width: 100%;
          height: 42px;
          background: url("./../../../../static/lobby/room/Mini_Frame.png")
            no-repeat;
          background-size: 100% 100%;
          &--box {
            border: 0.5px solid #b3b3b3;
            float: left;
            font-size: 10px;
            width: 8px;
            height: 6.8px;
            line-height: 6.8px;
          }
        }
      }
    }
  }
}
</style>