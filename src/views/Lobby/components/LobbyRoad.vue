<template>
  <div class="game__road">
    <div class="game__road--bg">
      <road-header
        :header-text="$t('TopGames')"
        :header-icon="fireSrc"
        @goGameList="goGameList"
      />
      <road-content :data="newRoadData" />
    </div>
    <div class="game__road--bg">
      <road-header
        :header-text="$t('GoodRoad')"
        :header-icon="starSrc"
        @goGameList="goGameList"
      />
      <road-content :data="isGoodRoadData" />
    </div>
  </div>
</template>

<script>
import RoadHeader from "@/components/RoadHeader.vue";
import RoadContent from "@/components/RoadContent.vue";

import { getRoadArray, GoodRoadRecommendedOrder } from "@/utils/roadMap";
import { mapState } from "vuex";

export default {
  name: "LobbyRoad",
  data() {
    return {
      fireSrc: require("./../../../assets/static/lobby/room/Fire.png"),
      starSrc: require("./../../../assets/static/lobby/room/Star.png"),
      newRoadData: [],
      isGoodRoadData: [],
      newArray: [],
    };
  },
  components: {
    RoadHeader,
    RoadContent,
  },
  computed: {
    ...mapState({
      tableList: (state) => state.ws.tableList,
    }),
  },
  watch: {
    tableList: {
      handler(newVal, oldVal) {
        this.initRoadMap();
        this.isGoodRoad();
      },
      deep: true,
    },
  },
  created() {
    this.initRoadMap();
    this.isGoodRoad();
  },
  methods: {
    initRoadMap() {
      this.newRoadData = [];
      this.newArray = this._.cloneDeep(this.tableList); //cloneDeep深拷貝 防更改原本
      this.newArray.forEach((element) => {
        const stingData = element.SC.toString();
        element.roadArray = getRoadArray(stingData);
        element.isGoodRoad = GoodRoadRecommendedOrder(stingData);
      });
      this.newRoadData = this.newArray.slice(0, 3);
    },
    isGoodRoad() {
      this.isGoodRoadData = [];
      this.newArray.reverse().sort((a, b) => {
        return b.isGoodRoad - a.isGoodRoad;
      });
      this.isGoodRoadData = this.newArray.slice(0, 3);
    },
    goGameList() {
      this.$router.push({ path: "/Lobby/LobbyGameList" });
    },
  },
};
</script>
<style lang="scss" scoped>
.game {
  &__road {
    &--bg {
      width: 100%;
      height: 110px;
      background: url("./../../../assets/static/lobby/room/Frame_0.png")
        no-repeat;
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
    padding: 6px 0;
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
}
</style>