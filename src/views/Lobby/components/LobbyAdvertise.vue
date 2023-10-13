<template>
  <div class="advertise">
    <div class="advertise__swiper">
      <swiper
        class="swiper"
        :options="swiperOption"
        @slideChange="onSlideChange"
        ref="mySwiper"
      >
        <swiper-slide v-for="(item, index) in bannerList" :key="index"
          ><img :src="item.ImgPath" alt=""
        /></swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "LobbyAdvertise",
  data() {
    return {
      speakerSrc: require("./../../../assets/static/lobby/advertise/Speaker.png"),
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: true,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
    };
  },
  computed: {
    ...mapState({
      bannerList: (state) => state.ws.bannerList,
    }),
  },
  methods: {
    onSlideChange() {},
  },
};
</script>
<style lang="scss" scoped>
.advertise {
  &__swiper {
    margin-top: 5px;
    .swiper {
      .swiper-slide {
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>