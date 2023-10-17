<template>
  <div class="game__list">
    <lobby-game
      v-show="!isGameListShow"
      v-for="(item, index) in tableList"
      :key="index"
      :game-list="item"
    />
    <div class="game__no" v-show="isGameListShow">
      <img class="game__no--list" :src="stayTunedSrc" alt="" />
    </div>
  </div>
</template>

<script>
import LobbyGame from "./components/LobbyGame.vue";

import { mapState } from "vuex";
export default {
  name: "LobbyGameList",
  data() {
    return {
      stayTunedSrc: require("./../../assets/static/lobby/StayTuned.png"),
      isGameListShow: false,
    };
  },
  components: {
    LobbyGame,
  },
  computed: {
    ...mapState({
      tableList: (state) => state.ws.tableList,
    }),
  },
  created() {
    this.showGameList();
  },
  methods: {
    showGameList() {
      const categoryList = ["Blackjack", "NiuNiu"];
      const category = this.$route.query.category;
      this.isGameListShow = categoryList.includes(category);
    },
  },
};
</script>
<style lang="scss" scoped>
.game {
  &__list {
    width: 100%;
    height: 100%;
  }
  &__no {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &--list {
      height: 150px;
    }
  }
}
</style>