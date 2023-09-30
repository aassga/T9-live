<template>
  <div>
    <lobby-road />
    <div class="lobby__category">
      <lobby-category />
    </div>
  </div>
</template>

<script>
import LobbyRoad from "./components/LobbyRoad.vue";
import LobbyCategory from "./components/LobbyCategory.vue";
export default {
  name: "LobbyRoom",
  components: {
    LobbyRoad,
    LobbyCategory,
  },
};
</script>
<style lang="scss" scoped>
</style>