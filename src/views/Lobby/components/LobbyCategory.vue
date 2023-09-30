<template>
  <div class="category">
    <div class="category__box">
      <div
        v-for="(item, index) in gameCategoryTop"
        :key="index"
        class="category__bg"
        :class="item.key"
      >
        <div class="category__bg--box">
          <span>{{ item.name }}</span> 
        </div>
      </div>
    </div>
    <div class="category__box">
      <div
        v-for="(item, index) in gameCategoryBottom"
        :key="index"
        class="category__bg"
        :class="item.key"
      >
        <div class="category__bg--box">
          <span>{{ item.name }}</span> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LobbyCategory",

  data() {
    return {
      gameCategoryTop: [
        {
          name: this.$t("ClassicBaccarat"),
          key: "ClassicBaccarat",
        },
        {
          name: this.$t("MultiTable"),
          key: "MultiTable",
        },
      ],
      gameCategoryBottom: [
        {
          name: this.$t("Blackjack"),
          key: "Blackjack",
        },
        {
          name: this.$t("NiuNiu"),
          key: "NiuNiu",
        },
      ],
    };
  },

  methods: {},
};
</script>
<style lang="scss" scoped>
.category {
  width: 100%;
  &__box {
    display: flex;
    justify-content: space-between;
  }
  &__bg {
    width: 49%;
    height: 100px;
    display: inline-block;
    margin-bottom: 1px;
    span {
      font-size: 11px;
      position: relative;
      top: 55px;
    }
    &--box{
      width: 54%;
      height: 100%;
      text-align: center;
    }
  }
  .ClassicBaccarat {
    background: url("./../../../../static/lobby/category/ClassicBaccarat.png")
      no-repeat;
    background-size: 100%;
  }
  .MultiTable {
    background: url("./../../../../static/lobby/category/MultiTableBetting.png")
      no-repeat;
    background-size: 100%;
  }
  .Blackjack {
    background: url("./../../../../static/lobby/category/Blackjack.png")
      no-repeat;
    background-size: 100%;
  }
  .NiuNiu {
    background: url("./../../../../static/lobby/category/NiuNiu.png") no-repeat;
    background-size: 100%;
  }
}
</style>