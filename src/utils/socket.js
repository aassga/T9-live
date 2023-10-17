import Vue from "vue";
import { getSocketUrl, getSocketList } from "@/utils/socketEvent";

var socket = null;
var isManualClose = false; // 手动关闭 WS 连线
var retryCount = 0; // 记录 retry 次数
const emitter = new Vue({
  methods: {
    sendWebSocket(message) {
      if (!!socket && socket.readyState === 1) socket.send(JSON.stringify(message));
    },
    closeWebSocket() {
      console.log('[ws]manual close websocket');
      socket.close();
      isManualClose = true;
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
      retryCount = 0;
      const playerInfo = JSON.parse(localStorage.getItem('vuex-along')).root.ws.playerInfo
      const GetBroadCast = playerInfo.GetBroadCast ? '1' : '0'
      let socketData = {
        OpCode: "LoginGame",
        Data: {
          AccountType: '1',
          AgentId: String(localStorage.getItem('agentId')),
          GameType: String(localStorage.getItem('gameType')),
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
      if (isManualClose) return
      if (retryCount > 5) return
      retryCount++;
      console.log("<--【连线斷開】------自動重新連線-->", e);
      const socketUrlList = JSON.parse(localStorage.getItem('socketUrlListL'))
      if (socketUrlList.length === 0) {
        getSocketList()
      }
      setTimeout(() => emitter.initWebSocket(), 5000);
    }
  }
});
export default emitter;