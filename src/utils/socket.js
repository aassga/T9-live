import Vue from "vue";
import { getSocketUrl, getSocketList } from "@/utils/socketUrl";

var socket = null;
const emitter = new Vue({
  methods: {
    sendWebSocket(message) {
      if (!!socket && socket.readyState === 1) socket.send(JSON.stringify(message));
    },
    closeWebSocket() {
      console.log('[ws]manual close websocket');
      socket.close();
    },
    // 初始化 websocket 
    initWebSocket() {
      const wsUrl = getSocketUrl()//動態環境
      socket = new WebSocket(wsUrl);
      socket.onopen = () => this.socketOnopen();
      socket.onmessage = (msg) => this.socketOnmessage(msg);
      socket.onerror = (err) => this.socketOnerror(err)
      socket.onclose = (e) => this.socketOnclose(e);
    },
    socketOnopen() {
      const gameList = JSON.parse(localStorage.getItem('vuex-along')).root.ws.gameList
      const playerInfo = JSON.parse(localStorage.getItem('vuex-along')).root.ws.playerInfo
      const GetBroadCast = playerInfo.GetBroadCast ? '1':'0'
      let socketData = {
        OpCode: "LoginGame",
        Data: {
          AccountType: String(playerInfo.AccountType),
          AgentId: String(playerInfo.AgentId),
          GameType: String(gameList[0].GameType),
          GetBroadCast: GetBroadCast,
          MemberName: localStorage.getItem('account'),
          Password: localStorage.getItem('password'),
        },
        Token: localStorage.getItem('token'),
      };
      socket.send(JSON.stringify(socketData));
    },
    socketOnmessage(msg) {
      emitter.$emit("message", msg.data);
    },
    socketOnerror(err) {
      emitter.$emit("error", err);
    },
    socketOnclose(e) {
      console.log("<--【连线斷開】------自動重新連線-->",e);
      const socketUrlList = JSON.parse(localStorage.getItem('socketUrlListL'))
      if (socketUrlList.length === 0) {
        getSocketList()
      }
      setTimeout(() => emitter.initWebSocket(), 5000);
    }
  }
});
// emitter.connect();
export default emitter;