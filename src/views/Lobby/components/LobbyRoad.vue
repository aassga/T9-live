<template>
  <div class="room__road">
    <div class="room__road--bg">
      <div class="road__header">
        <div class="road__header--title">
          <img src="./../../../../static/lobby/room/Fire.png" alt="">
          {{ $t('TopGames') }}
        </div>
        <img class="road__header--more" src="./../../../../static/lobby/room/More.png" alt="">
      </div>
      <div class="road__content">
        <div class="road__content--game"></div>
        <div class="road__content--game"></div>
        <div class="road__content--game"></div>

      </div>
      
    </div>
    <div class="room__road--bg">
      <div class="road__header">
        <div class="road__header--title">
          <img src="./../../../../static/lobby/room/Star.png" alt="">
          {{ $t('GoodRoad') }}
        </div>
        <img class="road__header--more" src="./../../../../static/lobby/room/More.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LobbyRoad",

  data() {
    return {};
  },

  methods: {},
};
</script>
<style lang="scss" scoped>
.room{
  &__road{
    &--bg{
      width: 100%;
      height: 110px;
      background: url("./../../../../static/lobby/room/Frame_0.png") no-repeat;
      background-size: 100% 100%;
      margin-bottom: 4px;
    }
  }
}
.road{
  &__header{
    display: flex;
    justify-content: center;
    align-items: center;
    padding:10px 0;
    &--title{
      display: flex;
      margin: 0 auto;
      align-items: center;
      font-size: 10px;
      img{
        height: 15px;
        padding: 0 5px;
      }
    }
    &--more{
      position: absolute;
      right: 15px;
      height: 10px;

    }
  }
  &__content{
    width: 100%;
    padding: 0 5px;
    display: flex;
    justify-content: space-around;
    &--game{
      width: 32%;
      height: 68px;
      background: url("./../../../../static/lobby/room/RoadMap_BG.png") no-repeat;
      background-size: 100% 100%;
    }
  }
 
}
</style>