<template>
  <div class="lobby">
    <div class="lobby__box">
      <LobbyHeader @logout="logoutMaskShow" />
      <LobbyAdvertise />
      <div class="lobby__room">
        <router-view></router-view>
      </div>
    </div>
    <div class="lobby__mask" v-show="lobbyMaskShow">
      <img
        v-if="lobbyLoading"
        class="lobby__mask--loadingImg"
        :src="loadingSrc"
        alt=""
      />
      <div v-if="systemShow" class="system__bg">
        <img :src="funnelSrc" alt="">
        <div class="screenMobile__text">{{ $t('SystemMaintenance') }}</div>
      </div>
      <MessageBox
        v-show="messageBoxShow"
        :msgText="messageText"
        :okButtom="true"
        :noButtom="logoutShow"
        @onSubmit="onSubmit"
        @cancel="cancel"
      />
    </div>
  </div>
</template>

<script>
import LobbyHeader from "./components/LobbyHeader.vue";
import LobbyAdvertise from "./components/LobbyAdvertise.vue";
import MessageBox from "@/components/MsgBox.vue";

import Socket from "@/utils/socket";

import { logout } from "@/utils/system";
import { getSocketList } from "@/utils/socketUrl";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Lobby",
  data() {
    return {
      messageText:"",
      lobbyMaskShow: true,
      lobbyLoading: true,
      messageBoxShow:false,
      systemShow:false,
      logoutShow:false,
      loadingSrc:require("./../../assets/static/lobby/Circle01.png"),
      funnelSrc:require("./../../assets/static/system/Funnel.png"),
    };
  },
  components: {
    LobbyHeader,
    LobbyAdvertise,
    MessageBox,
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
      playerInfo: (state) => state.ws.playerInfo,
      tableList: (state) => state.ws.tableList,
    }),
  },
  methods: {
    ...mapMutations({
      SET_PLAYER_INFO: "ws/SET_PLAYER_INFO",
      SET_TABLE_LIST:"ws/SET_TABLE_LIST",
    }),
    handleClick(e){
      console.log(e)
    },
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
          this.lobbyLoading = false;
          this.lobbyMaskShow = false;
          this.decideGameStatus()
          this.SET_PLAYER_INFO(JSON.parse(msg).PlayerInfo);
          break;
        case "EnterTable":
          const playerInfo = this.playerInfo
          let balanceInfo = {
            OpCode: "BalanceInfo",
            Data: {
              AgentId: String(playerInfo.AgentId),
              MemberName: playerInfo.MemberName,
            },
            Token: localStorage.getItem("token"),
          };
          Socket.sendWebSocket(balanceInfo);
          break;
        case "DisConnected":
          const timeout = 3000
          this.logoutShow = false;
          this.systemShow = false;
          this.lobbyMaskShow = true;
          this.messageBoxShow = true;
          this.messageText = this.$t('Msg_357')
          setTimeout(() => {
            Socket.closeWebSocket();
            logout()   
          }, timeout);
          break
        case "CloseTable":
          const TableId = JSON.parse(msg).TableId
          const newTable = this.tableList.filter((id) => id.TableId !== TableId)
          this.SET_TABLE_LIST(newTable)
        break
      }
    },
    decideGameStatus(){
      const tableLength = this.tableList.length
      const gameList = this.gameList
      if(tableLength > 0){
        let EnterTable = {
          OpCode: "EnterTable",
          Data: {
            EnterTableInLobby: "true",
            GameType: String(gameList[0].GameType),
            TableId: gameList[0].TableList[0].TableId,
          },
          Token: localStorage.getItem("token"),
        };
        Socket.sendWebSocket(EnterTable);
      }else{
        this.systemDisconnected()
      }
    },
    systemDisconnected(){
      const gameList = this.gameList
      this.lobbyMaskShow = true;
      this.logoutShow = false;
      this.systemShow = true;
      this.messageText = this.$t('Msg_Disconnected')
      let leaveTable = {
        OpCode:  "LeaveTable",
        Data: {
          GameType: String(gameList[0].GameType),
        },
        Token: localStorage.getItem("token"),
      };
      Socket.sendWebSocket(leaveTable);
      Socket.closeWebSocket();
      setTimeout(() => {
        this.messageBoxShow = true;
      }, 1500);
    },
    logoutMaskShow() {
      this.systemShow = false;
      this.logoutShow = true;
      this.lobbyMaskShow = true;
      this.messageBoxShow = true;
      this.messageText = this.$t('Msg_Logout')
    },
    onSubmit() {
      logout()
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
    background: url("./../../assets/static/lobby/HallBaseMap.png") no-repeat;
    background-size: 95% 88%;
    background-position: top;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__room {
    width: 95%;
    height: 100%;
    background: url("./../../assets/static/lobby/room/BGMask.png") no-repeat;
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
    &--loadingImg{
      height: 40px;
      animation: rotate-taichi 1s ease-in infinite;
    }
    .system{
      &__bg{
        width: 100%;
        height: 100%;
        background: url("./../../assets/static/system/System_BG.png") no-repeat;
        background-size: contain;
        background-position: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        img{
          height: 40px;
        }
      }
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