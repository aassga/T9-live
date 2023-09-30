<template>
  <div class="lobby">
    <div class="lobby__box">
      <lobby-header @logout="logout" />
      <lobby-advertise />
      <div class="lobby__room">
        <router-view></router-view>
      </div>
    </div>
    <div class="lobby__mask" v-show="lobbyMaskShow">
      <img
        v-if="lobbyLoding"
        src="./../../../static/lobby/Circle01.png"
        alt=""
      />
      <msg-box
        v-if="!lobbyLoding"
        :msgText="$t('Msg_Logout')"
        :okButtom="true"
        :noButtom="true"
        @onSubmit="onSubmit"
        @cancel="cancel"
      />
    </div>
  </div>
</template>

<script>
import LobbyHeader from "./components/LobbyHeader.vue";
import LobbyAdvertise from "./components/LobbyAdvertise.vue";
import LobbyRoad from "./components/LobbyRoad.vue";
import LobbyCategory from "./components/LobbyCategory.vue";
import MsgBox from "@/components/MsgBox.vue";

import Socket from "@/utils/socket";

import { getSocketList } from "@/utils/socketUrl";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Lobby",
  data() {
    return {
      lobbyMaskShow: true,
      lobbyLoding: true,
    };
  },
  components: {
    LobbyHeader,
    LobbyAdvertise,
    LobbyRoad,
    LobbyCategory,
    MsgBox,
  },
  created() {
    Socket.$on("message", this.handleGetMessage);
  },
  mounted() {
    this.initSocket();
  },
  beforeDestroy() {
    Socket.$off("message", this.handleGetMessage);
  },
  computed: {
    ...mapState({
      gameList: (state) => state.ws.gameList,
      playerInfo: (state) => state.ws.gameList,
    }),
  },
  methods: {
    ...mapMutations({
      setPlayerInfo: "ws/setPlayerInfo",
      setTableList: "ws/setTableList",
    }),
    initSocket() {
      const socketUrlList = JSON.parse(localStorage.getItem("socketUrlListL"));
      if (socketUrlList.length === 0) {
        getSocketList();
        setTimeout(() => {
          Socket.initWebSocket();
        }, 2000);
      } else {
        Socket.initWebSocket();
      }
    },
    handleGetMessage(msg) {
      // 一些全局的動作可以放在這裡
      const msgType = JSON.parse(msg).OpCode;
      switch (msgType) {
        case "LoginGame":
          let enterTable = {
            OpCode: "EnterTable",
            Data: {
              EnterTableInLobby: "true",
              GameType: this.gameList[0].GameType,
              TableId: this.gameList[0].TableList[0].TableId,
            },
            Token: localStorage.getItem("token"),
          };
          Socket.sendWebSocket(enterTable);
          this.setPlayerInfo(JSON.parse(msg).PlayerInfo);
          this.lobbyMaskShow = false;
          this.lobbyLoding = false;
          break;
        case "EnterTable":
          let balanceInfo = {
            OpCode: "BalanceInfo",
            Data: {
              AgentId: this.playerInfo.AgentId,
              MemberName: this.playerInfo.MemberName,
            },
            Token: localStorage.getItem("token"),
          };
          Socket.sendWebSocket(balanceInfo);
          this.setTableList(JSON.parse(msg).TableList);
          break;
      }
    },
    logout() {
      this.lobbyMaskShow = true;
    },
    onSubmit() {
      localStorage.removeItem("token");
      localStorage.removeItem("account");
      localStorage.removeItem("password");
      localStorage.removeItem("socketUrlListL");
      localStorage.removeItem("vuex-along");
      Socket.closeWebSocket();
      window.location.reload(); // 于 Electron 应用时,会被停用
    },
    cancel() {
      this.lobbyMaskShow = false;
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
    // height: 100%;
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
  &__mask {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 3;
    img {
      height: 40px;
      animation: rotate-taichi 1s ease-in infinite;
    }
  }
}

@keyframes rotate-taichi {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-720deg);
  }
}
</style>