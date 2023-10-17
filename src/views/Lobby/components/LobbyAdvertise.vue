<template>
  <div class="advertise">
    <div class="advertise__swiper">
      <swiper class="swiper" :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(item, index) in bannerList" :key="index"
          ><img :src="item.ImgPath" alt="" @click="goBannerDetail(item)"
        /></swiper-slide>
      </swiper>
    </div>
    <div class="advertise__customer" v-show="isCustomerShow">
      <IframePage
        :gameRuleUrl="gameRuleUrl"
        :isShowRemember="isShowRemember"
        :iframeDivId="iframeDivId"
        :iframeId="iframeId"
        @close="closeIframe()"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import IframePage from "@/components/IframePage.vue";

export default {
  name: "LobbyAdvertise",
  data() {
    return {
      gameRuleUrl: "",
      iframeDivId: "BannerDiv",
      iframeId: "BannerIframe",
      isShowRemember: false,
      isCustomerShow:false,
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
  components: {
    IframePage,
  },
  methods: {
    goBannerDetail(item) {
      this.isCustomerShow = true
      this.gameRuleUrl = `${process.env.VUE_APP_URL}${item.ActPath}`;
    },
    closeIframe(){
      this.isCustomerShow = false
    },
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
  &__customer {
    max-width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
  }
}
</style>