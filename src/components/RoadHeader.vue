<template>
  <div class="road__header">
    <div class="road__header--title">
      <img :src="headerIcon" alt="" />
      {{ headerText }}
    </div>
    <img
      class="road__header--more"
      :src="moreSrc"
      alt=""
      @click="clickMore()"
    />
  </div>
</template>

<script>
export default {
  name: "RoadHeader",
  props: {
    headerText: {
      type: String,
    },
    headerIcon:{
      type: String,
    }
  },
  data() {
    return {
      moreSrc: require("./../assets/static/lobby/room/More.png"),

    };
  },
  methods: {
    clickMore() {
      this.$emit('goGameList')
    },
  },
};
</script>
<style lang="scss" scoped>
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