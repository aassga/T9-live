<template>
  <div class="content__box">
    <lobby-advertise />
    <lobby-road />
    <lobby-category />
  </div>
</template>

<script>
import LobbyRoad from "./LobbyRoad.vue";
import LobbyCategory from "./LobbyCategory.vue";
import LobbyAdvertise from "./LobbyAdvertise.vue";
export default {
  name: "LobbyRoom",
  components: {
    LobbyRoad,
    LobbyCategory,
    LobbyAdvertise,
  },
};
</script>
<style lang="scss" scoped>
</style>