<template>
  <div class="lobby">
    <div class="lobby__box">
      <lobby-header @logout="logoutMaskShow" />
      <div class="lobby__box--marquee">
        <div class="marquee">
          <img :src="speakerSrc" alt="" />
          <div class="marquee__text">
            <marquee>{{ marqueeText }}</marquee>
          </div>
        </div>
      </div>
      <div class="lobby__box--content">
        <router-view></router-view>
      </div>
    </div>
    <div class="lobby__mask" v-show="isLobbyMaskShow">
      <img
        v-if="isLobbyLoadingShow"
        class="lobby__mask--loadingImg"
        :src="loadingSrc"
        alt=""
      />
      <div v-if="isSystemShow" class="system__bg">
        <img :src="funnelSrc" alt="" />
        <div class="screenMobile__text">{{ $t("SystemMaintenance") }}</div>
      </div>

      <message-box
        v-show="isMessageBoxShow"
        :message-text="messageText"
        :ok-buttom="true"
        :no-buttom="isLogoutShow"
        @onSubmit="onSubmit"
        @cancel="cancel"
      />
    </div>
  </div>
</template>

<script>
import _ from "lodash";

import LobbyHeader from "./components/LobbyHeader.vue";
import MessageBox from "@/components/MessageBox.vue";

import Socket from "@/utils/socket";

import { onLogout } from "@/utils/system";
import { getSocketList } from "@/utils/socketEvent";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Lobby",
  data() {
    return {
      messageText: "",
      marqueeText: "",
      isLobbyMaskShow: true,
      isLobbyLoadingShow: true,
      isMessageBoxShow: false,
      isSystemShow: false,
      isLogoutShow: false,
      loadingSrc: require("./../../assets/static/lobby/Circle01.png"),
      funnelSrc: require("./../../assets/static/system/Funnel.png"),
      speakerSrc: require("./../../assets/static/lobby/advertise/Speaker.png"),
    };
  },
  components: {
    LobbyHeader,
    MessageBox,
  },
  created() {
    this.initSocket();
    Socket.$on("message", this.handleGetMessage);
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
      SET_TABLE_LIST: "ws/SET_TABLE_LIST",
    }),
    initSocket() {
      const socketUrlList = JSON.parse(localStorage.getItem("socketUrlListL"));
      let timer = 0;
      if (socketUrlList.length === 0) {
        getSocketList();
        timer = 2000;
      }
      setTimeout(() => {
        Socket.initWebSocket();
      }, timer);
    },
    handleGetMessage(msg) {
      // 一些全局的動作可以放在這裡
      const OpCode = JSON.parse(msg).OpCode;
      switch (OpCode) {
        case "LoginGame":
          this.isLobbyLoadingShow = false;
          this.isLobbyMaskShow = false;
          this.decideGameStatus();
          this.SET_PLAYER_INFO(JSON.parse(msg).PlayerInfo);
          break;
        case "EnterTable":
          let balanceInfo = {
            OpCode: "BalanceInfo",
            Data: {
              AgentId: String(this.playerInfo.AgentId),
              MemberName: this.playerInfo.MemberName,
            },
            Token: localStorage.getItem("token"),
          };
          Socket.sendWebSocket(balanceInfo);
          this.SET_TABLE_LIST(JSON.parse(msg).TableList);
          break;
        case "DisConnected":
          const timeout = 3000;
          this.isLogoutShow = false;
          this.isSystemShow = false;
          this.isLobbyMaskShow = true;
          this.isMessageBoxShow = true;
          this.messageText = this.$t("Msg_357");
          setTimeout(() => {
            Socket.closeWebSocket();
            onLogout();
          }, timeout);
          break;
        case "CloseTable":
          const tableId = JSON.parse(msg).TableId;
          const newTable = _.cloneDeep(this.tableList);
          newTable.filter((id) => id.TableId !== tableId);
          this.SET_TABLE_LIST(newTable);
          break;
        case "UpdateMemberInfo":
          const newMemberInfo = JSON.parse(msg);
          let newPlayerInfo = this.playerInfo;
          newPlayerInfo.NickName = newMemberInfo.NickName;
          newPlayerInfo.CustomizeChips =
            newMemberInfo.CustomizeChips.toString();
          this.SET_PLAYER_INFO(newPlayerInfo);
          break;
        case "SyncSC":
          const syncMsg = JSON.parse(msg);
          this.tableList.forEach((res) => {
            if (res.TableId === syncMsg.TableId) {
              res.SC = syncMsg.SC;
            }
          });
          this.SET_TABLE_LIST(this.tableList);
          break;
      }
    },
    decideGameStatus() {
      const tableLength = this.tableList.length;
      const gameList = this.gameList;
      if (tableLength > 0) {
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
      } else {
        this.systemDisconnected();
      }
    },
    systemDisconnected() {
      this.isSystemShow = true;
      this.isLogoutShow = false;
      this.isLobbyMaskShow = true;
      this.messageText = this.$t("Msg_Disconnected");
      const GameType = this.gameList[0].GameType;
      let leaveTable = {
        OpCode: "LeaveTable",
        Data: {
          GameType: String(GameType),
        },
        Token: localStorage.getItem("token"),
      };
      Socket.sendWebSocket(leaveTable);
      Socket.closeWebSocket();
      setTimeout(() => {
        this.isMessageBoxShow = true;
      }, 1500);
    },
    logoutMaskShow() {
      this.isSystemShow = false;
      this.isLogoutShow = true;
      this.isLobbyMaskShow = true;
      this.isMessageBoxShow = true;
      this.messageText = this.$t("Msg_Logout");
    },
    onSubmit() {
      onLogout();
    },
    cancel() {
      this.isLobbyMaskShow = false;
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
    background: url("./../../assets/static/lobby/HallBaseMap.png") no-repeat;
    background-size: 100% 88%;
    background-position: top;
    display: flex;
    flex-direction: column;
    align-items: center;
    &--marquee {
      width: 95%;
      padding: 0 5px;
      .marquee {
        width: 100%;
        height: 30px;
        background: url("./../../assets/static/lobby/advertise/Announcement_BG.png")
          no-repeat;
        background-size: 100%;
        display: flex;
        align-items: center;
        img {
          height: 15px;
          padding-left: 10px;
        }
        &__text {
          width: 100%;
          display: flex;
          align-items: center;
          margin-left: 5px;
        }
      }
    }
    &--content {
      width: 100%;
      height: 560px;
      background: url("./../../assets/static/lobby/room/BGMask.png") no-repeat;
      padding: 0 5px 5px 5px;
      margin-top: 5px;
      background-position-y: bottom;
      overflow: auto;
    }
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
    &--loadingImg {
      height: 40px;
      animation: rotate-taichi 1s ease-in infinite;
    }
    .system {
      &__bg {
        width: 100%;
        height: 100%;
        background: url("./../../assets/static/system/System_BG.png") no-repeat;
        background-size: contain;
        background-position: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        img {
          height: 40px;
          animation: opacity 2.5s ease-in infinite;
        }
        .screenMobile__text {
          margin: 20px 0;
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
@keyframes opacity {
  0% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
}
</style>