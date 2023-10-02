<template>
  <div class="room__road">
    <div class="room__road--bg">
      <div class="road__header">
        <div class="road__header--title">
          <img :src="fireSrc" alt="" />
          {{ $t("TopGames") }}
        </div>
        <img
          class="road__header--more"
          :src="moreSrc"
          alt=""
        />
      </div>
      <!-- <div class="road__content">
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
      </div> -->
      <div class="road__content">
        <swiper
          class="swiper"
          :options="swiperOption"
          ref="mySwiper"
        >
          <swiper-slide v-for="(item, index) in tableList.slice(0, 3)" :key="index">
            <div
              class="road__content--game"
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
          </swiper-slide>
        </swiper>

      </div>
    </div>
    <div class="room__road--bg">
      <div class="road__header">
        <div class="road__header--title">
          <img :src="starSrc" alt="" />
          {{ $t("GoodRoad") }}
        </div>
        <img
          class="road__header--more"
          :src="moreSrc"
          alt=""
        />
      </div>
      <!-- <div class="road__content">
        
        <div
          class="road__content--game"
          v-for="(item, index) in tableList.slice(3, 6)"
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
      </div> -->
      <div class="road__content">
        <swiper
          class="swiper"
          :options="swiperOption"
          ref="mySwiper"
        >
          <swiper-slide v-for="(item, index) in tableList.slice(3, 6)" :key="index">
            <div
              class="road__content--game"
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
          </swiper-slide>
        </swiper>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "LobbyRoad",
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween:0, //间距
      },
      fireSrc:require("./../../../assets/static/lobby/room/Fire.png"),
      starSrc:require("./../../../assets/static/lobby/room/Star.png"),
      moreSrc:require("./../../../assets/static/lobby/room/More.png"),
    };
  },
  computed: {
    ...mapState({
      tableList: (state) => state.ws.tableList,
    }),
  },
  mounted() {
  },
  methods: {

  },
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
      background: url("./../../../assets/static/lobby/room/Frame_0.png") no-repeat;
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
    display: flex;
    justify-content: center;
    &--game {
      width: 95%;
      height: 68px;
      background: url("./../../../assets/static/lobby/room/RoadMap_BG.png")
        no-repeat;
      background-size: 100% 100%;
      margin: 0 1px;
      .game {
        &__bg {
          width: 100%;
          height: 45px;
          background: url("./../../../assets/static/lobby/room/Road_WBG.png")
            no-repeat;
          background-size: 100% 100%;
          padding: 2px 3px 3px 4px;
        }
        &__frame {
          width: 100%;
          height: 42px;
          background: url("./../../../assets/static/lobby/room/Mini_Frame.png")
            no-repeat;
          background-size: 100% 100%;
          &--box {
            border: 0.5px solid #b3b3b3;
            float: left;
            font-size: 10px;
            width: 8.3px;
            height: 6.9px;
            line-height: 6.8px;
          }
        }
      }
    }
  }
}
</style>