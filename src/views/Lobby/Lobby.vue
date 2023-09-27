<template>
  <div class="lobby">
    <div class="lobby__box">
      <lobby-header />
      <lobby-advertise />
      <div class="lobby__room">
        <lobby-road />
        <div class="lobby__category">
          <lobby-category />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LobbyHeader from "./components/LobbyHeader.vue";
import LobbyAdvertise from "./components/LobbyAdvertise.vue";
import LobbyRoad from "./components/LobbyRoad.vue";
import LobbyCategory from "./components/LobbyCategory.vue";

import Socket from "@/utils/socket";

import { getSocketList } from "@/utils/socketUrl";
import { mapState,mapMutations } from "vuex";
export default {
  name: "Lobby",
  data() {
    return {};
  },
  components: {
    LobbyHeader,
    LobbyAdvertise,
    LobbyRoad,
    LobbyCategory,
  },
  created() {
    Socket.$on("message", this.handleGetMessage);
  },
  mounted() {
    this.initSocket()

  },
  beforeDestroy() {
    Socket.$off("message", this.handleGetMessage);
  },
  computed: {
    ...mapState({
      gameList: state => state.ws.gameList,
      playerInfo: state => state.ws.gameList
    }),
  },
  methods: {
    ...mapMutations({
      setPlayerInfo:"ws/setPlayerInfo",
    }),
    initSocket(){
      const socketUrlList = JSON.parse(localStorage.getItem('socketUrlListL'))
      if(socketUrlList.length === 0){
        getSocketList()
      }
      Socket.initWebSocket()
    },
    handleGetMessage(msg) {
      // 一些全局的動作可以放在這裡
      const msgType = JSON.parse(msg).OpCode
      switch (msgType) {
        case "LoginGame":
          this.setPlayerInfo(JSON.parse(msg).PlayerInfo);
          let enterTable = {
              OpCode: "EnterTable",
              Data: {
                EnterTableInLobby: "true",
                GameType: this.gameList[0].GameType,
                TableId: this.gameList[0].TableList[0].TableId,
              },
              Token: localStorage.getItem('token'),
            };
            Socket.sendWebSocket(enterTable);
          break;
          case "EnterTable":
            let balanceInfo = {
              OpCode: "BalanceInfo",
              Data: {
                AgentId: this.playerInfo.AgentId,
                MemberName: this.playerInfo.MemberName,
              },
              Token: localStorage.getItem('token'),
            };
            Socket.sendWebSocket(balanceInfo);
            break;
      }
      
    },
    
  },
};
</script>
<style lang="scss" scoped>
.lobby {
  width: 100%;
  height: 100%;
  background-color: #000;
  display: flex;
  align-items: center;
  &__box {
    width: 100%;
    height: 100%;
    background: url("./../../../static/lobby/HallBaseMap.png") no-repeat;
    background-size: 95% 88%;
    background-position: top;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__room {
    width: 95%;
    height: 100%;
    background: url("./../../../static/lobby/room/BGMask.png") no-repeat;
    padding: 5px;
    background-position-y: bottom;
  }
}
</style>