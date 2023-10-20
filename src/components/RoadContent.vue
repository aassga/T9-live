<template>
  <div class="road__content">
    <swiper class="swiper" :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(item, index) in data" :key="index">
        <div class="road__content--game">
          <div class="yellow small__size">
            {{ $t("__classicBaccarat") }}{{ item.TableId }}
          </div>
          <div class="game__bg">
            <div
              class="game__frame"
              v-for="(hor, horIndex) in item.roadArray"
              :key="horIndex"
            >
              <div
                v-for="(item, lineIndex) in tidyMapData(hor)"
                :key="lineIndex"
                class="game__frame--box"
              >
                <div class="road__map--img" v-if="item">
                  <img
                    v-for="index in 3"
                    v-show="iconShow(item, index)"
                    :key="index"
                    :src="drawIcon(item, index)"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "RoadContent",
  props: {
    data: {
      type: Array,
    },
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 0, //间距
        wrapperClass: ["swiper-wrapper", "xs-wrapper"],
      },
    };
  },
  methods: {
    tidyMapData(data) {
      const count = 13;
      const limitData = data.slice(0, 13);
      let oldData = new Array(count - limitData.length).fill("");
      let newData = [...limitData, ...oldData];
      return newData;
    },
    drawIcon(item, index) {
      const firstNumber = index - 1;
      const endNumber = this.iconNumber(item, index);
      return require(`./../assets/static/roadMap/P${firstNumber}_BigRoad_${endNumber}.png`);
    },
    iconNumber(item, index) {
      return item.split("_")[index - 1];
    },
    iconShow(item, index) {
      return this.iconNumber(item, index) !== "0";
    },
  },
};
</script>
<style lang="scss" scoped>
.yellow {
  color: #ffd997;
  font-size: 10px;
  padding: 2px 0;
  position: relative;
  left: -5px;
}
.road {
  &__content {
    width: 100%;
    // display: flex;
    // justify-content: center;

    &--game {
      width: 98%;
      height: 85px;
      background: url("./../assets/static/lobby/room/RoadMap_BG.png") no-repeat;
      background-size: 100% 25%;
      margin: 0 1px;
      .game {
        &__bg {
          width: 100%;
          height: 72%;
          background: url("./../assets/static/lobby/room/Road_WBG.png")
            no-repeat;
          background-size: 100% 100%;
          padding: 1px;
        }
        &__frame {
          width: 100%;
          &--box {
            border: 0.5px solid #b3b3b3;
            background: #ffffff;
            float: left;
            width: 7.6%;
            height: 9.7px;
          }
        }
      }
    }
  }
  &__map {
    &--img {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 10px;
        position: absolute;
      }
    }
  }
}
</style>