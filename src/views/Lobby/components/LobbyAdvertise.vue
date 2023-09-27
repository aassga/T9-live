<template>
  <div class="advertise">
    <div class="advertise__marquee">
      <img src="./../../../../static/lobby/advertise/Speaker.png" alt="" />
    </div>
    <div class="advertise__swiper">
      <swiper
        class="swiper"
        :options="swiperOption"
        @slideChange="onSlideChange"
        ref="mySwiper"
      >
        <swiper-slide
          ><img
            src="https://t9cali.leopardcat.live/banner/stage/1_5.jpg"
            alt=""
        /></swiper-slide>
        <swiper-slide
          ><img
            src="https://t9cali.leopardcat.live/banner/stage/1_5.jpg"
            alt=""
        /></swiper-slide>
        <swiper-slide
          ><img
            src="https://t9cali.leopardcat.live/banner/stage/1_5.jpg"
            alt=""
        /></swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "LobbyAdvertise",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
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

  methods: {
    onSlideChange() {
  
    },
  },
};
</script>
<style lang="scss" scoped>
.advertise {
  width: 95%;
  padding: 0 5px;
  &__marquee {
    width: 100%;
    height: 30px;
    background: url("./../../../../static/lobby/advertise/Announcement_BG.png")
      no-repeat;
    background-size: 100%;
    display: flex;
    align-items: center;
    img {
      height: 15px;
      padding-left: 10px;
    }
  }
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